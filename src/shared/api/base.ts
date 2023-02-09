import axios from 'axios'
import { dataHelper } from 'shared/lib/helpers'

const BASE_URL = '/gisbis'

export const axiosInstance = axios.create({
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Origin': '*',
	},
	baseURL: BASE_URL,
	transformResponse: [
		function (data) {
			try {
				return dataHelper.xmlParser(data)
			} catch (e) {
				throw e
			}
		},
	],
})
