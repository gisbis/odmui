import { parsersLib } from 'shared/lib'
import { mapLib } from 'widgets/map'

const GeomTypes = {
	Point: 'gml:Point',
	MultiPoint: 'gml:MultiPoint',
	LineString: 'gml:LineString',
	MultiLineString: 'gml:MultiLineString',
	Polygon: 'gml:Polygon',
	MultiSurface: 'gml:MultiSurface',
}

type GeomTypeKeysType = keyof typeof GeomTypes

export const getFeaturesFromGeom = (geomStr: string) => {
	try {
		const parsedGeom = parsersLib.xmlToJson(geomStr) as Record<string, any>

		if (parsedGeom === null) {
			throw new Error('Failed parse geom')
		}

		const geomTypeKey = (Object.keys(GeomTypes) as GeomTypeKeysType[]).find(
			(key) => parsedGeom[GeomTypes[key]]
		)

		let features = []

		switch (geomTypeKey) {
			case 'Point':
				features = getPoint(parsedGeom)
				break
			case 'MultiPoint':
				features = getMultiPoint(parsedGeom)
				break
			case 'LineString':
				features = getLine(parsedGeom)
				break
			case 'MultiLineString':
				features = getMultiLine(parsedGeom)
				break
			case 'Polygon':
				features = getPolygon(parsedGeom)
				break
			case 'MultiSurface':
				features = getMultiPolygon(parsedGeom)
				break
			default:
				return
		}

		console.log({ features })
		return features
	} catch (e) {
		console.log(e)
		return null
	}
}

export const getMultiPolygon = (parsedGeom: Record<string, any>) => {
	const features = [] as any[]

	try {
		const surfaceMember =
			parsedGeom?.['gml:MultiSurface']?.['gml:surfaceMember']

		if (!surfaceMember) {
			throw new Error('Invalid gml:surfaceMember')
		}

		if (Array.isArray(surfaceMember)) {
			surfaceMember.forEach((i) => {
				if (i?.['gml:Polygon']) {
					features.push(mapLib.polygonGeom.getFeature(i['gml:Polygon']))
				}
			})
		} else if (surfaceMember?.['gml:Polygon']) {
			features.push(mapLib.polygonGeom.getFeature(surfaceMember['gml:Polygon']))
		}
	} catch (e) {
		console.log(e)
	} finally {
		return features
	}
}

export const getPolygon = (parsedGeom: Record<string, any>) => {
	const features = [] as any[]

	try {
		if (!parsedGeom?.['gml:Polygon']) {
			throw new Error('Invalid gml:Polygon')
		}

		features.push(mapLib.polygonGeom.getFeature(parsedGeom['gml:Polygon']))
	} catch (e) {
		console.log(e)
	} finally {
		return features
	}
}

export const getMultiPoint = (parsedGeom: Record<string, any>) => {
	const features = [] as any[]

	try {
		const pointMember = parsedGeom?.['gml:MultiPoint']?.['gml:pointMember']

		if (!pointMember) {
			throw new Error('Invalid gml:pointMember')
		}

		if (Array.isArray(pointMember)) {
			pointMember.forEach((i) => {
				if (i?.['gml:Point']) {
					features.push(mapLib.pointGeom.getFeature(i['gml:Point']))
				}
			})
		} else if (pointMember?.['gml:Point']) {
			features.push(mapLib.pointGeom.getFeature(pointMember['gml:Point']))
		}
	} catch (e) {
		console.log(e)
	} finally {
		return features
	}
}

export const getPoint = (parsedGeom: Record<string, any>) => {
	const features = [] as any[]

	try {
		if (!parsedGeom?.['gml:Point']) {
			throw new Error('Invalid gml:Point')
		}

		features.push(mapLib.pointGeom.getFeature(parsedGeom['gml:Point']))
	} catch (e) {
		console.log(e)
	} finally {
		return features
	}
}

export const getMultiLine = (parsedGeom: Record<string, any>) => {
	const features = [] as any[]

	try {
		const lineStringMember =
			parsedGeom?.['gml:MultiLineString']?.['gml:lineStringMember']

		if (!lineStringMember) {
			throw new Error('Invalid gml:lineStringMember')
		}

		if (Array.isArray(lineStringMember)) {
			lineStringMember.forEach((i) => {
				if (i?.['gml:LineString']) {
					features.push(mapLib.lineGeom.getFeature(i['gml:LineString']))
				}
			})
		} else if (lineStringMember?.['gml:LineString']) {
			features.push(
				mapLib.lineGeom.getFeature(lineStringMember['gml:LineString'])
			)
		}
	} catch (e) {
		console.log(e)
	} finally {
		return features
	}
}

export const getLine = (parsedGeom: Record<string, any>) => {
	const features = [] as any[]

	try {
		if (!parsedGeom?.['gml:LineString']) {
			throw new Error('Invalid gml:LineString')
		}

		features.push(mapLib.lineGeom.getFeature(parsedGeom['gml:LineString']))
	} catch (e) {
		console.log(e)
	} finally {
		return features
	}
}
