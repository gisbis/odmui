import { InitCommonBaseLayers } from './init-common-base-layers'
import { InitBaseLayers } from './init-base-layers'
import { InitOverlayLayers } from './init-overlay-layers'
import { ILayer } from 'shared/api/user'
import { useMemo } from 'react'

export const InitLayers: React.FC<{ userLayerList: ILayer[] }> = ({
	userLayerList,
}) => {
	const overlayLayerList = useMemo(() => {
		return userLayerList.filter((i) => i.type && +i.type !== 3)
	}, [userLayerList])

	const baseLayerList = useMemo(() => {
		return userLayerList.filter((i) => i.type && +i.type === 3)
	}, [userLayerList])

	return (
		<>
			<InitCommonBaseLayers />
			<InitBaseLayers layerList={baseLayerList} />
			<InitOverlayLayers layerList={overlayLayerList} />
		</>
	)
}
