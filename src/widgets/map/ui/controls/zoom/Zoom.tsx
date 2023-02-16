import { useCallback } from 'react'

import { MapIconButton } from 'shared/ui/buttons'

import { useMapContext } from 'widgets/map'

import { easeOut } from 'ol/easing'

interface IZoomProps {
	icon: JSX.Element
	delta: number
	duration?: number
}
export const Zoom: React.FC<IZoomProps> = ({ icon, duration = 250, delta }) => {
	const { map } = useMapContext()

	const handleClick = useCallback(() => {
		if (!map) {
			return
		}

		const view = map.getView()

		if (!view) {
			return
		}

		const currentZoom = view.getZoom()

		if (currentZoom === undefined) {
			return
		}

		const newZoom = view.getConstrainedZoom(currentZoom + delta)

		if (newZoom === undefined) {
			return
		}

		if (duration > 0) {
			if (view.getAnimating()) {
				view.cancelAnimations()
			}
			view.animate({
				zoom: newZoom,
				duration: duration,
				easing: easeOut,
			})
		} else {
			view.setZoom(newZoom)
		}
	}, [map, delta, duration])

	return <MapIconButton onClick={handleClick}>{icon}</MapIconButton>
}
