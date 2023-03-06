import { useMapContext } from 'widgets/map/context'
import { useAppSelector } from 'shared/model'
import { mapSelectors } from 'widgets/map/model'
import { useEffect } from 'react'

export const ObserveSidebarState = () => {
	const { map } = useMapContext()
	const leftSidebarIsOpen = useAppSelector(mapSelectors.selectIsOpenLeftSidebar)
	const rightSidebarIsOpen = useAppSelector(
		mapSelectors.selectIsOpenRightSidebar
	)

	useEffect(() => {
		if (!map) {
			return
		}

		map.render()
	}, [map, leftSidebarIsOpen, rightSidebarIsOpen])

	return null
}
