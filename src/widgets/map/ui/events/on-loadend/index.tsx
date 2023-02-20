import { useEffect } from 'react'
import { useAppDispatch } from 'shared/model'

import { mapActions, useMapContext } from 'widgets/map'

export const OnLoadEnd = () => {
	const dispatch = useAppDispatch()
	const { map } = useMapContext()

	useEffect(() => {
		if (!map) {
			return
		}

		map.on('loadend', () => {
			dispatch(mapActions.setMapOnLoadEnd(true))
		})

		return () => {
			dispatch(mapActions.setMapOnLoadEnd(false))
		}
	}, [map])

	return null
}
