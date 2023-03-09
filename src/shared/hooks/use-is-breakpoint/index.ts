import { useLayoutEffect, useState } from 'react'
import debounce from 'lodash/debounce'

export const useIsBreakpoint = (breakpoint: number): boolean => {
	const [isBreakpoint, setIsBreakpoint] = useState(false)

	useLayoutEffect(() => {
		const updateSize = (): void => {
			setIsBreakpoint(window.innerWidth <= breakpoint)
		}
		window.addEventListener('resize', debounce(updateSize, 250))

		updateSize()
		return (): void => window.removeEventListener('resize', updateSize)
	}, [])

	return isBreakpoint
}
