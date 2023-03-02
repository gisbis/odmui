export interface IMapInfoRowData {
	layerInfo: ILayerInfo
	selectInfo: ISelectInfo
	sys: number
	geom: string
	id: number
	color?: string
	metafield?: string
}

interface ILayerInfo {
	layerID: number
	layerName?: string
}

interface ISelectInfo {
	selectID: number
	selectName?: string
}

export type MapModeType = 'measure' | 'edit' | undefined

export type LeftSidebarContentType = 'map-data' | 'home-screen'
export type RightSidebarContentType = 'layer-switcher' | 'symbol-list'

export type MeasureModeType = 'LineString' | 'Polygon' | undefined
