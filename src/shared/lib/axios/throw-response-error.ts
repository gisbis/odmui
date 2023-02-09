export const throwResponseError = (response: any) => {
	let _e = ''

	if (!response || !response.error) {
		return
	}

	if (!!response.error?.message) {
		_e = response.error.message
	} else {
		_e = JSON.stringify(response.error)
	}

	throw new Error(_e)
}
