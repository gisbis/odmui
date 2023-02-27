export type RequestStatus = 'loading' | 'success' | 'error' | undefined

export interface IGroupedArrayPart {
	keyValue: any
	items: Record<string, any>[]
}
