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

export type Map = import('ol').Map
export type Coordinate = import('ol/coordinate').Coordinate
export type TileSource = import('ol/source').Tile
export type Geometry = import('ol/geom').Geometry
export type FeatureLike = import('ol/Feature').FeatureLike
export type Draw = import('ol/interaction').Draw
export type MapBrowserEvent = import('ol').MapBrowserEvent<any>
export type BaseEvent = import('ol/events/Event').default

export type MapModeType = 'view' | 'measure'
