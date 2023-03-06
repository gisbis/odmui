export const clearString = (s: string) => {
	if (typeof s !== 'string') {
		return ''
	}

	return s
		.trim()
		.replace(/\n/g, '<br>')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&laquo;/g, '«')
		.replace(/&raquo;/g, '»')
}
