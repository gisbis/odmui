import { useEffect, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import debounce from 'lodash/debounce'

import { BaseInput } from 'shared/ui'
import { theme } from 'shared/theme'
import { selectApi } from 'shared/api'
import { useTranslate } from 'shared/i18n'
import { INPUT_BORDER_RADIUS } from 'shared/config'
import { useAppDispatch, useAppSelector } from 'shared/model'
import type { ISearchGlobalValue } from 'shared/api/select'

import { mapSelectors, mapActions } from 'widgets/map/model'

import { ClearData } from '../../map-data'
import { GsLogo } from '../gs-logo'
import { parsersLib } from 'shared/lib'

export const MobileGlobalSearch = () => {
	const { translate } = useTranslate()
	const dispatch = useAppDispatch()
	const infoData = useAppSelector(mapSelectors.selectMapInfoData)
	const isOpenGlobalSearchList = useAppSelector(
		mapSelectors.selectIsOpenGlobalSearchList
	)

	const [options, setOptions] = useState<ISearchGlobalValue[]>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		dispatch(mapActions.setIsOpenGlobalSearchList(!!options.length))
	}, [options])

	const fetchData = async (value: string) => {
		setIsLoading(true)

		try {
			const response = await selectApi.searchGlobal({
				value,
				onMap: 1,
			})

			setOptions(response)
		} catch (e) {
			setOptions([])
		} finally {
			setIsLoading(false)
		}
	}

	const handleOnChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
		await fetchData(evt.target.value)
	}

	const handleOnFocus = async () => {
		await fetchData('')
	}

	const handleOnBlur = () => {
		dispatch(mapActions.setIsOpenGlobalSearchList(false))
	}

	return (
		<Box
			sx={{
				height: '100%',
				overflowY: 'hidden',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Box sx={{ px: 2 }}>
				<Stack
					direction="row"
					alignItems="center"
					spacing={1}
					sx={{
						backgroundColor: theme.palette.grey['200'],
						borderRadius: INPUT_BORDER_RADIUS,
						borderWidth: '1px',
						borderStyle: 'solid',
						borderColor: theme.palette.grey['200'],
						position: 'relative',
						px: 1,
						height: '52px',
					}}
				>
					<Box>
						<GsLogo />
					</Box>

					<BaseInput
						placeholder={translate('Search')}
						sx={{
							borderRadius: INPUT_BORDER_RADIUS,
							height: '50px',
							bgcolor: 'transparent',
						}}
						onFocus={handleOnFocus}
						onBlur={handleOnBlur}
						onChange={debounce(handleOnChange, 250)}
					/>

					{infoData !== null && <ClearData />}
				</Stack>
			</Box>

			{isOpenGlobalSearchList && (
				<Box sx={{ flexGrow: '1', overflowY: 'auto' }}>
					{isLoading ? (
						<>Loading...</>
					) : (
						options.map((i) => (
							<Box
								key={i.id}
								sx={{
									cursor: 'pointer',
									py: 1.5,
									px: 2,
									borderBottom: 1,
									borderColor: 'divider',
								}}
							>
								<Typography
									variant="body1"
									dangerouslySetInnerHTML={{
										__html: parsersLib.clearString(i.meta),
									}}
								/>
							</Box>
						))
					)}
				</Box>
			)}
		</Box>
	)
}
