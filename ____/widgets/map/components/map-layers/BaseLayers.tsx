import { TileLayer } from 'entities/map/components/tile-layer/TileLayer'
import { TileSource } from 'shared/model'
import { OSM, XYZ } from 'ol/source'

interface ITileLayerProps {
	source: TileSource
	properties?: { [x: string]: any }
	zIndex: number
	visible: boolean
}

const commonBaseLayers: ITileLayerProps[] = [
	{
		properties: { title: 'OSM', type: 'base' },
		source: new OSM(),
		visible: true,
		zIndex: 0,
	},
	{
		properties: { title: 'google', type: 'base' },
		source: new XYZ({
			crossOrigin: 'anonymous',
			url: 'https://mts0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
		}),
		visible: false,
		zIndex: 0,
	},
	{
		properties: { title: 'yandex', type: 'base' },
		source: new XYZ({
			crossOrigin: 'anonymous',
			url: 'https://sat01.maps.yandex.net/tiles?l=sat&v=3.249.0&x={x}&y={y}&z={z}&lang=tr_TR',
		}),
		visible: false,
		zIndex: 0,
	},
]

export const BaseLayers = () => {
	const baseLayers = [...commonBaseLayers]

	return (
		<>
			{baseLayers.map((lyr, index) => (
				<TileLayer key={index} {...lyr} />
			))}
		</>
	)
}
