import axios from 'axios'

import { BASE_URL } from './config'
import { parsersLib } from '../lib'

export const axiosInstance = axios.create({
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Origin': '*',
	},
	baseURL: BASE_URL,
	transformResponse: [
		function (data) {
			try {
				return parsersLib.xmlToJson(data)
			} catch (e) {
				throw e
			}
		},
	],
})
