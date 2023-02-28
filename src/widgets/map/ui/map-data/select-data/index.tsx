import { useEffect, useState } from 'react'
import { Skeleton, Stack } from '@mui/material'

import { RequestStatus } from 'shared/model'
import { convertersLib, parsersLib } from 'shared/lib'

import { selectApi } from 'shared/api'
import type { ISelectRecord, ISelectUserField } from 'shared/api/select'

import type { IMapInfoRowData } from 'widgets/map/api'
import { mapLib, useMapContext } from 'widgets/map'

import { RecordData } from '../record-data'

import VectorLayer from 'ol/layer/Vector'
import { GeoJSON } from 'ol/format'
import { Fill, Stroke, Style } from 'ol/style'

const polygonStyle = new Style({
	stroke: new Stroke({
		color: 'blue',
		width: 3,
	}),
	fill: new Fill({
		color: 'rgba(0, 0, 255, 0.1)',
	}),
})

export const SelectData: React.FC<{ dataRow: IMapInfoRowData }> = ({
	dataRow,
}) => {
	const { map, dataInfoSource } = useMapContext()

	const { selectInfo, id, geom } = dataRow

	const [userFields, setUserFields] = useState<ISelectUserField[]>([])
	const [recordList, setRecordList] = useState<ISelectRecord[]>([])

	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [status, setStatus] = useState<RequestStatus>(undefined)

	useEffect(() => {
		;(async () => {
			await getSelectData()
		})()
	}, [dataRow])

	const getSelectData = async () => {
		setStatus('loading')
		setErrorMsg(null)

		try {
			const [recordData, userFieldsData] = await Promise.all([
				selectApi.fetchSelectSearchResult({
					Select: String(selectInfo.selectID),
					id: String(id),
				}),
				selectApi.fetchSelectUserFields({ idSelect: '' + selectInfo.selectID }),
			])

			setRecordList(recordData.searchResult)
			setUserFields(userFieldsData.userFields)

			setStatus('success')
		} catch (e) {
			setStatus('error')
			setErrorMsg(convertersLib.errorToString(e))
		}
	}

	const handleGeomOnMapClick = () => {
		dataInfoSource.clear()

		if (!map) {
			return
		}

		const layers = map.getAllLayers().filter((i) => {
			return i.get('type') === 'data-info-layer'
		})

		layers.forEach((layer) => {
			map.removeLayer(layer)
		})

		const geomLayer = new VectorLayer({
			source: dataInfoSource,
			style: polygonStyle,
			zIndex: 100,
			properties: {
				type: 'data-info-layer',
			},
		})

		map.addLayer(geomLayer)

		viewPolygon(geom)
	}

	const viewPolygon = (geom: string) => {
		try {
			const parsedGeom = parsersLib.xmlToJson(geom) as any

			console.log({ parsedGeom })

			if (parsedGeom === null) {
				return
			}

			const surfaceMember =
				parsedGeom?.['gml:MultiSurface']?.['gml:surfaceMember']

			if (!surfaceMember) {
				return
			}

			let features = []

			if (Array.isArray(surfaceMember)) {
				surfaceMember.forEach((i) => {
					features.push(mapLib.getPolygonFeature(i?.['gml:Polygon']))
				})
			} else {
				features.push(mapLib.getPolygonFeature(surfaceMember?.['gml:Polygon']))
			}

			const geojsonObject = {
				type: 'FeatureCollection',
				crs: {
					type: 'name',
					properties: {
						name: 'EPSG:3857',
					},
				},
				features,
			}

			dataInfoSource.addFeatures(new GeoJSON().readFeatures(geojsonObject))

			const polygon = dataInfoSource.getFeatures()[0]?.getGeometry()
			// @ts-ignore
			polygon && map?.getView().fit(polygon, { padding: [170, 50, 30, 150] })
		} catch (e) {
			console.log(e)
			throw e
		}
	}

	if (status === undefined) {
		return null
	}

	if (status === 'loading') {
		return <Skeleton variant="rectangular" height={60} />
	}

	if (status === 'error') {
		return <div>{errorMsg}</div>
	}

	return (
		<Stack spacing={1.5}>
			{recordList.map((record) => (
				<RecordData
					key={record.key}
					record={record}
					userFields={userFields}
					handleGeomOnMapClick={handleGeomOnMapClick}
				/>
			))}
		</Stack>
	)
}
