import { PropsWithChildren, useEffect } from 'react'

import { useAppDispatch } from 'shared/model'
import { getLayerList } from 'entities/select'

export const MapData: React.FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getLayerList())
	}, [])

	return <>{children}</>
}
