import { useEffect, useState } from 'react'
import { Skeleton, Stack } from '@mui/material'

import { RequestStatus } from 'shared/model'
import { convertersLib } from 'shared/lib'

import { ISelectRecord, ISelectUserField, selectApi } from 'entities/select'

import { MapDataRecord } from '../map-data-record'
import { IMapInfoRowData } from '../../../model'

export const MapDataRow: React.FC<{ dataRow: IMapInfoRowData }> = ({
	dataRow,
}) => {
	const { selectInfo, id } = dataRow
	const [userFields, setUserFields] = useState<ISelectUserField[]>([])
	const [recordList, setRecordList] = useState<ISelectRecord[]>([])
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [status, setStatus] = useState<RequestStatus>(undefined)

	useEffect(() => {
		;(async () => {
			await getSelectData()
		})()
	}, [dataRow])

	const getSelectData = async () => {
		setStatus('loading')
		setErrorMsg(null)

		try {
			const [recordData, userFieldsData] = await Promise.all([
				selectApi.fetchSelectSearchResult({
					Select: String(selectInfo.selectID),
					id: String(id),
				}),
				selectApi.fetchSelectUserFields({ idSelect: '' + selectInfo.selectID }),
			])

			setRecordList(recordData.searchResult)
			setUserFields(userFieldsData.userFields)

			setStatus('success')
		} catch (e) {
			setStatus('error')
			setErrorMsg(convertersLib.errorToString(e))
		}
	}

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
		<Stack spacing={1.5}>
			{recordList.map((record) => (
				<MapDataRecord
					key={record.key}
					record={record}
					userFields={userFields}
				/>
			))}
		</Stack>
	)
}
