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
	LayerGroup: {
		idLayerGroup: string
		nameLayerGroup: string
	}
	layerSourceWMS?: {
		name: string
	}
	noLegend?: number
	legendStyle?: string
}

export type MapModeType = 'measure' | 'edit' | undefined

export type LeftMapSidebarType = 'map-data' | 'home-screen'
export type RightMapSidebarType = 'layer-switcher' | 'symbol-list'
