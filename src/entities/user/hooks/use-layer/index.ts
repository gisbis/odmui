import { useAppSelector } from 'shared/model'
import { userSelectors } from 'entities/user'
import { useCallback } from 'react'

export const useLayer = () => {
	const layerList = useAppSelector(userSelectors.selectLayerList)

	const getLayerById = useCallback(
		(id: number) => {
			return layerList.find((i) => +i.id === +id)
		},
		[layerList]
	)

	return { getLayerById }
}
