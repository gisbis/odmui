import { useEffect, useRef, useState } from 'react'
import { convertersLib } from 'shared/lib'
import { userApi } from 'shared/api'

export const withExtendSession =
	(Component: new () => React.Component) => () => {
		const [errorMsg, setErrorMsg] = useState<string | null>(null)

		const timer = useRef<NodeJS.Timer | null>(null)

		useEffect(() => {
			if (timer.current) {
				clearInterval(timer.current)
			}

			timer.current = setInterval(() => {
				userApi.fetchUserInfo().catch((e) => {
					setErrorMsg(convertersLib.errorToString(e))
				})
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
