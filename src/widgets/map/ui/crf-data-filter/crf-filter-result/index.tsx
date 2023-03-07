import { useMemo } from 'react'
import { Box, Button, Chip, IconButton, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { useAppDispatch, useAppSelector } from 'shared/model'
import type { IGroupedArrayPart } from 'shared/model'
import { mapSelectors, mapActions } from 'widgets/map'
import type { ICRFClassifierValue } from 'widgets/map'

import { groupLib } from 'shared/lib'
import { useLayer } from 'entities/user'
import { useTranslate } from 'shared/i18n'

export const CRFFilterResult = () => {
	const { getLayerById } = useLayer()
	const { translate } = useTranslate()
	const dispatch = useAppDispatch()

	const crfClassifierValues = useAppSelector(
		mapSelectors.selectCRFClassifierValues
	)

	const crfUserLayers = useAppSelector(mapSelectors.selectCRFUserLayerList)

	const groupedCRFValues = useMemo(() => {
		return groupLib.groupByKey('idLayer', crfClassifierValues)
	}, [crfClassifierValues])

	if (!groupedCRFValues.length || !crfUserLayers.length) {
		return null
	}

	const handleDeleteValue = (value: Record<string, any>) => {
		dispatch(
			mapActions.setCRFClassifierValues(
				crfClassifierValues.filter((i) => i.key !== value.key)
			)
		)
	}

	const handleDeleteLayerValues = (idLayer: number) => {
		dispatch(
			mapActions.setCRFClassifierValues(
				crfClassifierValues.filter((i) => i.idLayer !== idLayer)
			)
		)
	}

	const renderGroup = (i: IGroupedArrayPart) => {
		return (
			<Box key={i.keyValue}>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					mb={0.5}
				>
					<Typography variant="body2" fontWeight={500}>
						{getLayerById(i.keyValue)?.name || translate('untitled')}
					</Typography>

					<IconButton
						color="error"
						size="small"
						onClick={() => handleDeleteLayerValues(i.keyValue)}
					>
						<CloseIcon fontSize="small" />
					</IconButton>
				</Stack>

				<Box
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						columnGap: 0.5,
						rowGap: 0.5,
						mb: 1.5,
					}}
				>
					{i.items.map((x) => (
						<Chip
							variant="filled"
							color="primary"
							key={x.key}
							label={x.value}
							onDelete={() => handleDeleteValue(x)}
						/>
					))}
				</Box>
			</Box>
		)
	}

	return (
		<Stack
			spacing={1}
			sx={{
				width: '100%',
				maxWidth: '276px',
				bgcolor: '#ffffff70',
				backdropFilter: 'blur(5px)',
				p: 1.5,
				borderRadius: '14px',
				boxShadow: '0 2px 6px 0 rgba(0,0,0,0.2)',
			}}
		>
			{groupedCRFValues.map((i) => renderGroup(i))}
		</Stack>
	)
}
