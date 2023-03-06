import { useEffect, useMemo, useState } from 'react'
import { Skeleton, Stack } from '@mui/material'

import { RequestStatus, useAppDispatch, useAppSelector } from 'shared/model'
import { browserApi, convertersLib } from 'shared/lib'

import { selectApi } from 'shared/api'
import type { ISelectRecord, ISelectUserField } from 'shared/api/select'

import { userSelectors } from 'entities/user'

import { mapActions, mapSelectors } from 'widgets/map'
import type { IMapInfoRowData } from 'widgets/map/api'

import { RecordData } from '../record-data'

export const SelectData: React.FC<{
	dataRow: IMapInfoRowData
	idx: number
	isExpanded: boolean
}> = ({ dataRow, idx, isExpanded }) => {
	const dispatch = useAppDispatch()
	const geomsOnMap = useAppSelector(mapSelectors.selectInfoMapGeoms)
	const userInfo = useAppSelector(userSelectors.selectUserInfo)

	const { selectInfo, id, geom, layerInfo, sys } = dataRow

	const [userFields, setUserFields] = useState<ISelectUserField[]>([])
	const [recordList, setRecordList] = useState<ISelectRecord[]>([])

	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [status, setStatus] = useState<RequestStatus>(undefined)

	useEffect(() => {
		;(async () => {
			await getSelectData()
		})()
	}, [dataRow])

	useEffect(() => {
		if (idx !== 0) {
			return
		}

		handleGeomOnMapClick()
	}, [idx, dataRow])

	const geomOnMap = useMemo(() => {
		return (
			!!geomsOnMap &&
			!!geomsOnMap.find(
				(i) =>
					i.sys === dataRow.sys &&
					i.idSelect === dataRow.selectInfo.selectID &&
					i.idLayer === dataRow.layerInfo.layerID
			)
		)
	}, [geomsOnMap, dataRow])

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
		dispatch(
			mapActions.setInfoMapGeoms([
				{
					geom: geom,
					idSelect: selectInfo.selectID,
					idLayer: layerInfo.layerID,
					sys: sys,
				},
			])
		)
	}

	const handleSharedClick = async () => {
		const url = new URL(window.location.host)
		userInfo?.nameUser &&
			url.searchParams.append('username1', userInfo.nameUser)
		url.searchParams.append('idLayer', String(layerInfo.layerID))
		url.searchParams.append('idSelect', String(selectInfo.selectID))
		url.searchParams.append('sys', String(sys))

		try {
			await browserApi.copyToClipboard(url.href)
		} catch (e) {
			console.log(e)
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
					handleSharedClick={handleSharedClick}
					geomOnMap={geomOnMap}
					isExpanded={isExpanded && recordList.length === 1}
				/>
			))}
		</Stack>
	)
}
