import { ILayer, MapModeType, OLCoordinate, OLMap } from 'shared/model'

export interface IMapState {
	map: OLMap | null
	layerList: ILayer[]
	activeLayerIdList: number[]
	currentZoom?: number
	currentCoords: OLCoordinate | null
	mapMode: MapModeType
	infoData: any
	error: string | null
	isLoading: boolean
	errorOnFetchInfoData: string | null
	isLoadingInfoData: boolean
	isOpenLeftSidebar: boolean
	isOpenRightSidebar: boolean
}
