import { useCallback, useMemo } from 'react'
import { Checkbox, FormControlLabel, Typography } from '@mui/material'

import { theme } from 'shared/theme'
import { useAppDispatch, useAppSelector } from 'shared/model'

import { mapActions } from '../../../../../model'

import { Layer } from 'ol/layer'
import { Source } from 'ol/source'
import LayerRenderer from 'ol/renderer/Layer'

interface ILayerSwitcherItemProps {
	layer: Layer<Source, LayerRenderer<any>>
}

export const LayerSwitcherItem: React.FC<ILayerSwitcherItemProps> = ({
	layer,
}) => {
	const dispatch = useAppDispatch()

	const currentZoom = useAppSelector((state) => state.map.currentZoom)
	const activeIdLayerList = useAppSelector(
		(state) => state.map.activeIdLayerList
	)

	const idLayer = layer.get('idLayer')
	const title = layer.get('title')
	const minzoom = layer.getMinZoom()
	const maxzoom = layer.getMaxZoom()

	const checked = useMemo(() => {
		return !!activeIdLayerList.find((i) => i === +idLayer)
	}, [idLayer, activeIdLayerList])

	const disabled = useMemo(() => {
		if (currentZoom === undefined) {
			return false
		}

		return currentZoom < minzoom || currentZoom > maxzoom
	}, [currentZoom, minzoom, maxzoom])

	const handleChange = useCallback(() => {
		if (checked) {
			dispatch(
				mapActions.setActiveIdLayerList(
					activeIdLayerList.filter((i) => +i !== +idLayer)
				)
			)
			return
		}

		dispatch(mapActions.setActiveIdLayerList([...activeIdLayerList, +idLayer]))
	}, [checked, activeIdLayerList, idLayer])

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
					{title}
				</Typography>
			}
			sx={{ my: '3.5px' }}
		/>
	)
}
