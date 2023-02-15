import { useEffect, useRef } from 'react'

import { useAppDispatch } from 'shared/model'
import { getUserInfo } from 'entities/user'

export const ExtendSession = () => {
	const dispatch = useAppDispatch()
	const timer = useRef<NodeJS.Timer | null>(null)

	useEffect(() => {
		if (timer.current) {
			clearInterval(timer.current)
		}

		timer.current = setInterval(() => {
			dispatch(getUserInfo())
		}, 900000)

		return () => {
			timer.current && clearInterval(timer.current)
		}
	}, [])

	return null
}
