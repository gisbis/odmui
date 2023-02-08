export interface IFetchMapInfoParams {
	layers: string
	lat: number
	lng: number
	zoom?: number
	year?: number
}

export interface IMapInfoRowData {
	layerInfo: IMapInfoLayerInfo
	selectInfo: IMapInfoSelectInfo
	sys: number
	geom: string
	id: number
	color?: string
	metafield: string
}

export interface IMapInfoLayerInfo {
	layerID: number
	layerName: string
}

export interface IMapInfoSelectInfo {
	selectID: number
	selectName: string
}
