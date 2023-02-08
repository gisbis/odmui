export const errorToString = (e: unknown) => {
	let _e = ''

	if (typeof e === 'string') {
		_e = e
	} else if (e instanceof Error) {
		_e = e.message
	}

	return _e
}

export const responseErrorHandler = (response: any) => {
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
