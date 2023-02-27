import { ICRFClassifierValue } from 'widgets/map/model'
import { groupLib } from 'shared/lib'

export interface IGroupedCrfData {
	idLayer: string
	items: any[]
}

export const groupCrfValues = (
	values: ICRFClassifierValue[]
): IGroupedCrfData[] => {
	const groupedData = [] as IGroupedCrfData[]

	const byIdLayerArr = groupLib.groupByKey('idLayer', values)

	byIdLayerArr.forEach((i) => {
		const { items, keyValue } = i
		const groupedByCID = groupLib.groupByKey('crfLF', items)

		groupedData.push({
			idLayer: keyValue,
			items: groupedByCID,
		})
	})

	return groupedData
}
