import { useEffect } from 'react'
import { useAppDispatch } from 'shared/model'

import { useMapContext } from '../../../context'
import { mapActions } from '../../../model'

export const OnRenderComplete = () => {
	const dispatch = useAppDispatch()
	const { map } = useMapContext()

	useEffect(() => {
		if (!map) {
			return
		}

		map.on('rendercomplete', () => {
			dispatch(mapActions.setMapIsRendered(true))
		})

		return () => {
			dispatch(mapActions.setMapIsRendered(false))
		}
	}, [map])

	return null
}
