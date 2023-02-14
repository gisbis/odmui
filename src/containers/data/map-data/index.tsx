import { PropsWithChildren } from 'react'

import { useFetchAsyncThunks } from 'shared/hooks'
import { BackdropSpinner } from 'shared/ui'
import { getLayerList } from 'entities/select'

export const MapData: React.FC<PropsWithChildren> = ({ children }) => {
	const { status, errorMsg } = useFetchAsyncThunks([getLayerList()])

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
