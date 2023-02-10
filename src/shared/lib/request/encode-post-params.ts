export const encodePostParams = (params: { [key: string]: any }) => {
	const encodeParams = new URLSearchParams()

	for (const key in params) {
		encodeParams.append(key, params[key])
	}

	return encodeParams
}
