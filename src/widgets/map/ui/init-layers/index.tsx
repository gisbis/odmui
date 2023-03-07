import { InitCommonBaseLayers } from './init-common-base-layers'
import { InitBaseLayers } from './init-base-layers'
import { InitOverlayLayers } from './init-overlay-layers'
import { ILayer } from 'shared/api/user'
import { useMemo } from 'react'
import { useAppSelector } from 'shared/model'
import { userSelectors } from 'entities/user'
import { mapLib } from 'widgets/map/index'

export const InitLayers: React.FC<{ userLayerList: ILayer[] }> = ({
	userLayerList,
}) => {
	const idLayerScheme = useAppSelector(userSelectors.getSettingById(21))

	const overlayLayerList = useMemo(() => {
		return mapLib
			.filterOverlayLayers(userLayerList)
			.filter((i) => String(i.id) !== idLayerScheme)
	}, [userLayerList, idLayerScheme])

	const baseLayerList = useMemo(() => {
		const list = mapLib.filterBaseLayers(userLayerList)

		if (idLayerScheme) {
			if (!list.find((i) => +i.id === +idLayerScheme)) {
				const schemeLayer = userLayerList.find((i) => +i.id === +idLayerScheme)
				schemeLayer && list.push(schemeLayer)
			}
		}

		return list
	}, [userLayerList, idLayerScheme])

	return (
		<>
			<InitCommonBaseLayers />
			<InitBaseLayers layerList={baseLayerList} />
			<InitOverlayLayers layerList={overlayLayerList} />
		</>
	)
}
