import { useEffect } from 'react'

import { useAppDispatch } from 'shared/model'

import { useMapContext, mapActions } from 'widgets/map'

export const OnMoveend = () => {
	const dispatch = useAppDispatch()
	const { map } = useMapContext()

	useEffect(() => {
		if (!map) {
			return
		}

		map.addEventListener('moveend', handleMoveend)

		return () => {
			map.removeEventListener('moveend', handleMoveend)
		}
	}, [map])

	const handleMoveend = () => {
		setCurrentZoom()
	}

	const setCurrentZoom = () => {
		if (!map) {
			return
		}

		const zoom = map.getView().getZoom()
		dispatch(mapActions.setCurrentZoom(zoom))
	}

	return null
}
