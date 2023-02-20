import {
	createTheme,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	ThemeProvider,
	Typography,
} from '@mui/material'

import { Layer } from 'ol/layer'
import { Source } from 'ol/source'
import LayerRenderer from 'ol/renderer/Layer'
import { useEffect, useState } from 'react'

const cmpTheme = createTheme({
	components: {
		MuiRadio: {
			styleOverrides: {
				root: {
					padding: '5px 10px',
				},
			},
		},
	},
})

const defaultValue = 'yandex'

interface ISwitchBaselLayerListProps {
	layerList: Layer<Source, LayerRenderer<any>>[]
}
export const SwitchBaseLayers: React.FC<ISwitchBaselLayerListProps> = ({
	layerList,
}) => {
	const [value, setValue] = useState(defaultValue)

	useEffect(() => {
		setVisibleLayer(value)
	}, [value])

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setValue(evt.target.value)
	}

	const setVisibleLayer = (id: string) => {
		layerList.forEach((layer) => {
			layer.setVisible(
				String(layer.get('id')).toLowerCase() === String(id).toLowerCase()
			)
		})
	}

	return !layerList.length ? (
		<Typography variant="body2">Empty layer list</Typography>
	) : (
		<ThemeProvider theme={cmpTheme}>
			<FormControl>
				<RadioGroup
					aria-labelledby="switch-base-layer-radio-buttons-group-label"
					value={value}
					name="radio-buttons-group"
					onChange={handleChange}
				>
					{layerList.map((layer) => (
						<FormControlLabel
							key={layer.get('id')}
							value={layer.get('id')}
							control={<Radio size="small" />}
							label={layer.get('title')}
						/>
					))}
				</RadioGroup>
			</FormControl>
		</ThemeProvider>
	)
}
