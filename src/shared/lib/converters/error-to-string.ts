export const errorToString = (e: unknown) => {
	if (typeof e === 'string') {
		return e
	}
	if (e instanceof Error) {
		return e.message
	}

	if (typeof e === 'object' && e !== null) {
		if (e.hasOwnProperty('message')) {
			return (e as Record<string, any>).message
		}
	}

	return JSON.stringify(e)
}
