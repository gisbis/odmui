import { Navigate, useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { BackdropSpinner } from 'shared/ui'
import { useAppDispatch } from 'shared/model'
import type { RequestStatus } from 'shared/model'

import { convertersLib } from 'shared/lib'

import { userModel } from 'entities/user'

export const withSearchQuery = (Component: new () => React.Component) => () => {
	const dispatch = useAppDispatch()

	const [searchParams] = useSearchParams()

	const username = searchParams.get('username')
	const logout = searchParams.get('logout')

	console.log('with search params', { username, logout })

	const [status, setStatus] = useState<RequestStatus>(undefined)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)

	useEffect(() => {
		if (!username && !logout) {
			setStatus('success')
			return
		}

		const handleLogin = async (username: string) => {
			setStatus('loading')
			setErrorMsg(null)

			try {
				await dispatch(userModel.login({ username }))
					.unwrap()
					.catch((e) => {
						throw e
					})

				setStatus('success')
			} catch (e) {
				setStatus('error')
				setErrorMsg(convertersLib.errorToString(e))
			}
		}

		const handleLogout = async () => {
			setStatus('loading')
			setErrorMsg(null)

			try {
				await dispatch(userModel.logout())

				setStatus('success')
			} catch (e) {
				setStatus('error')
				setErrorMsg(convertersLib.errorToString(e))
			}
		}

		if (username) {
			handleLogin(username)
			return
		}

		if (logout) {
			handleLogout()
			return
		}
	}, [username, logout])

	if (status === undefined) {
		return null
	}

	if (status === 'loading') {
		return <BackdropSpinner />
	}

	if (status === 'error') {
		return <div>{errorMsg}</div>
	}

	return <Component />
}
