import { useCallback, useMemo } from 'react'
import { Checkbox, FormControlLabel, Typography } from '@mui/material'

import { theme } from 'shared/theme'
import { useAppDispatch, useAppSelector } from 'shared/model'
import { ILayer } from 'entities/select'

import { mapActions } from '../../../../../model'

interface ILayerSwitcherItemProps {
	layer: ILayer
}

export const LayerSwitcherItem: React.FC<ILayerSwitcherItemProps> = ({
	layer,
}) => {
	const dispatch = useAppDispatch()

	const currentZoom = useAppSelector((state) => state.map.currentZoom)
	const activeIdLayerList = useAppSelector(
		(state) => state.map.activeIdLayerList
	)

	const checked = useMemo(() => {
		return !!activeIdLayerList.find((i) => i === +layer.id)
	}, [layer, activeIdLayerList])

	const disabled = useMemo(() => {
		if (currentZoom === undefined) {
			return false
		}

		return currentZoom < layer.minzoom || currentZoom > layer.maxzoom
	}, [currentZoom, layer])

	const handleChange = useCallback(() => {
		if (checked) {
			dispatch(
				mapActions.setActiveIdLayerList(
					activeIdLayerList.filter((i) => +i !== layer.id)
				)
			)
			return
		}

		dispatch(mapActions.setActiveIdLayerList([...activeIdLayerList, +layer.id]))
	}, [checked, activeIdLayerList, layer])

	return (
		<FormControlLabel
			control={
				<Checkbox
					size="small"
					checked={checked}
					onChange={handleChange}
					disabled={disabled}
				/>
			}
			label={
				<Typography
					variant="body1"
					fontSize={14}
					color={disabled ? theme.palette.text.disabled : 'inherit'}
				>
					{layer.name}
				</Typography>
			}
			sx={{ my: '3.5px' }}
		/>
	)
}
