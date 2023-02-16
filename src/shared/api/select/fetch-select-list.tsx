import { axiosInstance } from 'shared/api'
import { convertersLib, requestLib } from 'shared/lib'
import type { ISelect, ISelectGroup } from './types'

export const fetchSelectList = (): Promise<ISelectGroup[]> => {
	return axiosInstance
		.get('SelectUserList')
		.then((response) => response.data)
		.then((response) => response.SelectUserList)
		.then((response) => {
			requestLib.throwResponseError(response)

			const selectList = convertersLib.anyToArray(response?.SelectGroup)

			selectList.forEach((select) => {
				const row = convertersLib.anyToArray(select.row) as ISelect[]
				select.row = row
			})

			return selectList
		})
		.catch((e) => {
			throw e
		})
}
