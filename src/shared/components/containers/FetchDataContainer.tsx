import { PropsWithChildren, useEffect } from 'react'

interface IFetchAppDataProps extends PropsWithChildren {
	fetchDataFn: () => Promise<any>
	error: string | null
	isLoading: boolean
}
export const FetchDataContainer: React.FC<IFetchAppDataProps> = ({
	children,
	isLoading,
	error,
	fetchDataFn,
}) => {
	useEffect(() => {
		fetchDataFn()
	}, [])

	return (
		<>
			{isLoading && <>Loading ...</>}
			{error && error}

			{children}
		</>
	)
}
