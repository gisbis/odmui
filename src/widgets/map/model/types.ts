export interface IMapInfoRowData {
	layerInfo: ILayerinfo
	selectInfo: ISelectInfo
	sys: number
	geom: string
	id: number
	color?: string
	metafield: string
}

interface ILayerinfo {
	layerID: number
	layerName: string
}

interface ISelectInfo {
	selectID: number
	selectName: string
}

export type MapModeType = 'measure' | 'edit' | undefined

export type LeftSidebarContentType = 'map-data' | 'home-screen'
export type RightSidebarContentType = 'layer-switcher' | 'symbol-list'
