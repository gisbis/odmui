import { ILayer, MapModeType, Coordinate, Map } from 'shared/model'

export interface IMapState {
	map: Map | null
	layerList: ILayer[]
	activeLayerIdList: number[]
	currentZoom?: number
	currentCoords: Coordinate | null
	mapMode: MapModeType
	infoData: any
	error: string | null
	isLoading: boolean
	errorOnFetchInfoData: string | null
	isLoadingInfoData: boolean
	isOpenLeftSidebar: boolean
	isOpenRightSidebar: boolean
}
