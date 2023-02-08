export const axiosEncodeParams = (params: {
	[key: string]: any
}): URLSearchParams => {
	const encodeParams = new URLSearchParams()

	for (const key in params) {
		encodeParams.append(key, params[key])
	}

	return encodeParams
}
