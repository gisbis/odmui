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
