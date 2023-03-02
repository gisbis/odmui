import { Box, Chip } from '@mui/material'

import { useAppDispatch, useAppSelector } from 'shared/model'

import { mapSelectors, mapActions } from 'widgets/map'
import type { ICRFClassifierValue } from 'widgets/map'

export const CRFFilterResult = () => {
	const dispatch = useAppDispatch()

	const crfClassifierValues = useAppSelector(
		mapSelectors.selectCRFClassifierValues
	)

	const crfUserLayers = useAppSelector(mapSelectors.selectCRFUserLayerList)

	if (!crfClassifierValues.length) {
		return null
	}

	const handleDelete = (value: ICRFClassifierValue) => {
		dispatch(
			mapActions.setCRFClassifierValues(
				crfClassifierValues.filter((i) => i.key !== value.key)
			)
		)
	}

	const handleClear = () => {
		dispatch(mapActions.setCRFClassifierValues([]))
	}

	if (!crfClassifierValues.length || !crfUserLayers.length) {
		return null
	}

	return (
		<Box
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
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					columnGap: 0.5,
					rowGap: 0.5,
					mb: 1.5,
				}}
			>
				{crfClassifierValues.map((i) => (
					<Chip
						variant="filled"
						color="primary"
						key={i.key}
						label={i.value}
						onDelete={() => handleDelete(i)}
					/>
				))}
			</Box>

			<Chip
				label="clear all"
				variant="filled"
				color="error"
				key="crf-chip-delete"
				onClick={handleClear}
			/>
		</Box>
	)
}
