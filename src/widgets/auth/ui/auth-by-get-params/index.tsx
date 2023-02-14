import { PropsWithChildren, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { RequestStatus, useAppDispatch, useAppSelector } from 'shared/model'
import { convertersLib } from 'shared/lib'
import { BackdropSpinner } from 'shared/ui'

import { login } from 'features/auth/api'
import { getUserInfo, getUserProps } from 'entities/user'

export const AuthByUsername: React.FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useAppDispatch()
	const [searchParams] = useSearchParams()

	const username = searchParams.get('username')
	const sessId = useAppSelector((state) => state.user.sessId)

	const [status, setStatus] = useState<RequestStatus>(undefined)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)

	useEffect(() => {
		if (sessId || !username) {
			setStatus('success')
			return
		}

		setStatus('loading')

		login({ username })
			.then((response) => {
				if (response) {
					dispatch(getUserInfo())
						.unwrap()
						.then(({ user }) => {
							dispatch(getUserProps({ idUser: user.uid }))
								.unwrap()
								.then(() => {
									setStatus('success')
								})
						})
						.catch((e) => {
							throw e
						})
				}
			})
			.catch((e) => {
				setStatus('error')
				setErrorMsg(convertersLib.errorToString(e))
			})
	}, [sessId, username])

	if (status === undefined) {
		return null
	}

	if (status === 'loading') {
		return <BackdropSpinner open={true} />
	}

	if (status === 'error') {
		return <div>{errorMsg}</div>
	}

	return <>{children}</>
}
