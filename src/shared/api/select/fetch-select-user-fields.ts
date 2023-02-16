import { axiosInstance } from 'shared/api'
import { convertersLib, requestLib } from 'shared/lib'
import type { ISelectUserField } from './types'

export interface ISelectUserFieldsData {
	selectKey: string
	isRelated: number
	userFields: ISelectUserField[]
}

export const fetchSelectUserFields = (params: {
	idSelect: string
}): Promise<ISelectUserFieldsData> => {
	return axiosInstance
		.post(
			'SelectUserFieldList',
			requestLib.encodePostParams({ Select: params.idSelect })
		)
		.then((response) => response.data.SelectUserFieldList)
		.then((response) => {
			requestLib.throwResponseError(response)

			let userFields: ISelectUserField[] = []
			const groups = convertersLib.anyToArray(response?.group)

			groups.forEach((group) => {
				const idGroup = group.idGroup
				const nameGroup = group.nameGroup
				const fields = convertersLib.anyToArray(group.row)

				fields.forEach((field) => {
					field.idGroup = idGroup
					field.nameGroup = nameGroup
				})

				userFields = [...userFields, ...fields]
			})

			const responseData: ISelectUserFieldsData = {
				userFields,
				selectKey: response.idSelect,
				isRelated: Number(response.isRelated),
			}

			return responseData
		})
		.catch((e) => {
			throw e
		})
}
