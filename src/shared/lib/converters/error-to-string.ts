export const errorToString = (e: unknown) => {
	let _e = ''

	if (typeof e === 'string') {
		_e = e
	} else if (e instanceof Error) {
		_e = e.message
	}

	return _e
}
