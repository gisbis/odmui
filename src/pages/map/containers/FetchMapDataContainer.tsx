import { PropsWithChildren, useEffect } from 'react'
import { getLayerList } from 'entities/map/model'
import { FetchDataContainer } from 'shared/components/containers/FetchDataContainer'
import { useAppDispatch, useAppSelector } from 'shared/model'

export const FetchMapDataContainer: React.FC<PropsWithChildren> = ({
	children,
}) => {
	const dispatch = useAppDispatch()

	const isLoading = useAppSelector((state) => state.map.isLoading)
	const error = useAppSelector((state) => state.map.error)

	useEffect(() => {}, [])

	return (
		<FetchDataContainer
			fetchDataFn={() => dispatch(getLayerList())}
			error={error}
			isLoading={isLoading}
		>
			{children}
		</FetchDataContainer>
	)
}
