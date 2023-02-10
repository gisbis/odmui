import { useAppDispatch, useAppSelector } from 'shared/model'
import { PropsWithChildren, useEffect } from 'react'
import { getLayerList } from 'entities/map/model'

export const MapDataContainer: React.FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useAppDispatch()

	const status = useAppSelector((state) => state.map.status)
	const errorMsg = useAppSelector((state) => state.map.errorMsg)

	useEffect(() => {
		dispatch(getLayerList())
	}, [])

	if (status === undefined) {
		return null
	}

	if (status === 'loading') {
		return <div>Loading...</div>
	}

	if (status === 'error') {
		return <div>{errorMsg}</div>
	}

	return <>{children}</>
}
