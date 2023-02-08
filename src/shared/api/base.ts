import axios from 'axios'
import { dataHelper } from 'shared/lib'

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
				const json = dataHelper.xmlParser(data)
				return json
			} catch (e) {
				throw e
			}
		},
	],
})
