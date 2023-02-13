export interface IAttachment {
	idDoc: string
	nameDoc: string
	hasPreview: number
	ext: string
	size: number
	isCad?: number
	isGeoRastr?: number
	isKml?: number
	isPhoto?: number
	isDxf?: string
	openDataAccess?: number
	idGroup?: string
	dxfCrs?: string
	nameGroup?: string
	pageCount?: number
}

export interface ISelect {
	id: string
	name: string
	canEdit: number
	canAdd: number
	canDel: number
	canAddDoc: number
	canEditDoc: number
	canDelDoc: number
	isRelated: number
	mapClasterable: number
	idListRelated: string
	idListChilds: string
	idLayer: string
	idSymbolType: string
	branchFieldId: string
	linkedWithGeometry: number
}

export interface ISelectGroup {
	idSelectGroup: string
	nameSelectGroup: string
	hasIconSelectGroup: number
	row: ISelect[]
}

export interface ISelectUserField {
	id: string
	name: string
	nameField: string
	idFieldType: string
	idGroup: string
	nameGroup: string
	isSystem?: number
	canEditSystem?: number
	idClassifierFieldType?: string
	isBranch?: number
	isDistrict?: number
	isCalculated?: number
}

export interface ISelectSearchField {
	id: string
	name: string
	idFieldType: string
	constraint: string
	defaultConstraint: string
	idGroup: string
	nameGroup: string
	idClassifierFieldType?: string
	isBranch?: number
}

export interface ISelectRecord {
	key: string
	metaName: string
	map: string
	color: string
	doclist: IAttachment[]
	hasOnMap: 0 | 1
	idSelect: string
	isRelated: 0 | 1
}

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
