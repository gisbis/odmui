import { XMLParser } from 'fast-xml-parser'

export const xmlToJson = (xml: string): XMLDocument | null => {
	const parser = new XMLParser()

	try {
		return parser.parse(xml)
	} catch (e) {
		return null
	}
}
