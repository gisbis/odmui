import { useEffect } from 'react'
import { useAppDispatch } from 'shared/model'
import { mapActions, mapApi } from 'widgets/map'
import { IMapInfoRowData } from 'widgets/map/api'

export const ObserveUriParams = () => {
	const dispatch = useAppDispatch()

	const params = new URLSearchParams(document.location.search)

	const idLayer = params.get('idLayer')
	const idSelect = params.get('idSelect')
	const sys = params.get('sys')

	useEffect(() => {
		if (!idSelect || !idLayer || !sys) {
			return
		}

		;(async () => {
			try {
				const response = await mapApi.fetchGeom({
					idLayer: +idLayer,
					syss: +sys,
				})

				const infoData: IMapInfoRowData = {
					sys: +sys,
					id: +sys,
					layerInfo: {
						layerID: +idLayer,
					},
					selectInfo: {
						selectID: +idSelect,
					},
					geom: response[0].geom,
				}

				dispatch(mapActions.setMapinfoData([infoData]))
				dispatch(mapActions.setLeftSidebarContentType('map-data'))
				dispatch(mapActions.setIsOpenLeftSidebar(true))
			} catch (e) {}
		})()
	}, [idLayer, idSelect, sys])

	return null
}
