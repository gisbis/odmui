export interface ILayer {
	id: number
	name: string
	zindex: number
	srvSystemId: number
	WMSName: string
	autoload: boolean
	canEdit: number
	canCreate: number
	canDelete: number
	minzoom: number
	maxzoom: number
	type: number
	tiled: number
	hideOnSatelliteView: number
	transparent: number
	wmsImageType: string
	timeScale: number
	defaultStyle: string
	customLegendStyle?: string
	geometryType: number
	hint?: string
	toBaseLayer?: string
	LayerGroup: ILayerGroup
	layerSourceWMS?: {
		name: string
	}
	noLegend?: number
	legendStyle?: string
}

export interface ILayerGroup {
	idLayerGroup: number
	nameLayerGroup: string
}

export type OLMap = import('ol').Map
export type OLCoordinate = import('ol/coordinate').Coordinate
export type OLTileSource = import('ol/source').Tile
export type OLGeometry = import('ol/geom').Geometry
export type OLFeatureLike = import('ol/Feature').FeatureLike
export type OLDraw = import('ol/interaction').Draw

export type MapModeType = 'view' | 'measure'
