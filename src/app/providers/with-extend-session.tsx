import { useEffect, useRef, useState } from 'react'
import { userApi } from 'shared/api'
import { useAppDispatch } from 'shared/model'
import { userActions } from 'entities/user'

export const withExtendSession =
	(Component: new () => React.Component) => () => {
		const dispatch = useAppDispatch()
		const [errorMsg, setErrorMsg] = useState<string | null>(null)

		const timer = useRef<NodeJS.Timer | null>(null)

		useEffect(() => {
			if (timer.current) {
				clearInterval(timer.current)
			}

			timer.current = setInterval(async () => {
				const { user } = await userApi.fetchUserInfo()

				if (!user || !user?.uid) {
					dispatch(userActions.setUser(null))
					dispatch(userActions.setSessId(null))
				}
			}, 900000)

			return () => {
				setErrorMsg(null)
				timer.current && clearInterval(timer.current)
			}
		}, [])

		if (errorMsg !== null) {
			return <div>Error: {errorMsg}</div>
		}

		return <Component />
	}
