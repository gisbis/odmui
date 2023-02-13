import { useEffect, useState } from 'react'

import { RequestStatus } from 'shared/model'
import { IMapInfoRow } from 'entities/map'
import { ISelectRecord, ISelectUserField, selectApi } from 'entities/select'

import { MapDataRecord } from './MapDataRecord'
import { convertersLib } from 'shared/lib'
import { Skeleton } from '@mui/lab'

interface IMapRowDataProps {
	data: IMapInfoRow
}
export const MapRowData: React.FC<IMapRowDataProps> = ({ data }) => {
	const { id, selectInfo } = data

	const [status, setStatus] = useState<RequestStatus>(undefined)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)

	const [selectUserFields, setSelectUserFields] = useState<ISelectUserField[]>(
		[]
	)
	const [selectRecordList, setSelectRecordList] = useState<ISelectRecord[]>([])

	useEffect(() => {
		setStatus('loading')

		Promise.all([
			selectApi.fetchSelectSearchResult({
				Select: String(selectInfo.selectID),
				id: String(id),
			}),
			selectApi.fetchSelectUserFields({
				idSelect: String(selectInfo.selectID),
			}),
		])
			.then(([searchResultData, userFieldsData]) => {
				setSelectUserFields(userFieldsData.userFields || [])
				setSelectRecordList(searchResultData.searchResult || [])

				setStatus('success')
			})
			.catch((e) => {
				setStatus('error')
				convertersLib.errorToString(e)
			})
	}, [])

	if (status === undefined) {
		return null
	}

	if (status === 'loading') {
		return <Skeleton variant="rectangular" height={60} />
	}

	if (status === 'error') {
		return <div>{errorMsg}</div>
	}

	return (
		<>
			{selectRecordList.map((record) => (
				<MapDataRecord
					key={record.key}
					record={record}
					fields={selectUserFields}
				/>
			))}
		</>
	)
}
