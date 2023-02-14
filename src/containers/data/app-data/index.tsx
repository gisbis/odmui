import { PropsWithChildren } from 'react'

import { useFetchAsyncThunks } from 'shared/hooks'

import { getLocaleList } from 'shared/i18n'
import { getUserInfo } from 'entities/user'

import { BackdropSpinner } from 'shared/ui'

export const AppData: React.FC<PropsWithChildren> = ({ children }) => {
	const { status, errorMsg } = useFetchAsyncThunks([
		getLocaleList(),
		getUserInfo(),
	])

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
