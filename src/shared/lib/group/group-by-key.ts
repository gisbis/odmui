import type { IGroupedArrayPart } from 'shared/model'

export const groupByKey = (key: string, arr: any[]): IGroupedArrayPart[] => {
	return arr.reduce((acc, value) => {
		const keyValue = value[key]

		let idx = acc.findIndex((i: IGroupedArrayPart) => i.keyValue === keyValue)

		if (idx === -1) {
			let newItem = {
				keyValue,
				items: [value],
			}

			acc.push(newItem)
		} else {
			acc[idx].items.push(value)
		}

		return acc
	}, [])
}
