export const anyToArray = (value: any) => {
	if (value === undefined || value === null) {
		return []
	}

	if (value instanceof Array) {
		return [...value]
	}

	return [value]
}
