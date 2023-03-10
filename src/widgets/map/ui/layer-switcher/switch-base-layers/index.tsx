import { useEffect, useState } from 'react'
import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material'

import { useTranslate } from 'shared/i18n'

import { useMapContext, mapLib } from 'widgets/map'

import { Layer } from 'ol/layer'
import { Source } from 'ol/source'
import LayerRenderer from 'ol/renderer/Layer'

interface ISwitchBaselLayerListProps {
	layerList: Layer<Source, LayerRenderer<any>>[]
}
export const SwitchBaseLayers: React.FC<ISwitchBaselLayerListProps> = ({
	layerList,
}) => {
	const { translate } = useTranslate()
	const { map } = useMapContext()

	const [value, setValue] = useState('')

	useEffect(() => {
		if (!map) {
			return
		}

		const baseLayers = mapLib.getMapBaseLayers({ map })
		const visibleLayer = baseLayers.find((i) => i.getVisible())
		const idVisibleLayer = visibleLayer?.get('idLayer') || ''

		setValue(idVisibleLayer)
	}, [map])

	useEffect(() => {
		setVisibleLayer(value)
	}, [value])

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setValue(evt.target.value)
	}

	const setVisibleLayer = (id: string) => {
		layerList.forEach((layer) => {
			layer.setVisible(
				String(layer.get('idLayer')).toLowerCase() === String(id).toLowerCase()
			)
		})
	}

	return !layerList.length ? (
		<Typography variant="body2">{translate('Empty layer list')}</Typography>
	) : (
		<FormControl>
			<RadioGroup
				aria-labelledby="switch-base-layer-radio-buttons-group-label"
				value={value}
				name="radio-buttons-group"
				onChange={handleChange}
			>
				{layerList.map((layer) => (
					<FormControlLabel
						key={layer.get('idLayer')}
						value={layer.get('idLayer')}
						control={<Radio size="small" color="primary" />}
						label={layer.get('title')}
					/>
				))}
			</RadioGroup>
		</FormControl>
	)
}
