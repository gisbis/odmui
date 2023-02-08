import { XMLParser } from 'fast-xml-parser'

export const valueToArray = (val: any) => {
	if (val === undefined || val === null) {
		return []
	}

	if (val instanceof Array) {
		return [...val]
	}

	return [val]
}

export const xmlParser = (xml: string): XMLDocument | null => {
	const parser = new XMLParser()

	try {
		return parser.parse(xml)
	} catch (e) {
		return null
	}
}
