import { useCallback, useMemo } from 'react'
import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'

import { theme } from 'shared/theme'
import { useAppDispatch, useAppSelector } from 'shared/model'

import { mapActions } from 'widgets/map'

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
				<Stack direction="row" alignItems="center" spacing={1.5}>
					<Typography
						variant="body1"
						fontSize={14}
						color={disabled ? theme.palette.text.disabled : 'inherit'}
					>
						{title}
					</Typography>

					{!!layer.get('classifierFilterRules') && (
						<FilterListIcon fontSize="small" color="disabled" />
					)}
				</Stack>
			}
			sx={{ my: '3.5px' }}
		/>
	)
}
