import { useCallback, useState } from 'react'
import { Autocomplete, IconButton, Stack } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'

import type { IClassifierValue } from 'shared/api/classifier'
import type { ICRFClassifierValue } from 'widgets/map'

import { theme } from 'shared/theme'
import { classifierApi } from 'shared/api'
import { useAppDispatch, useAppSelector } from 'shared/model'
import { mapActions, mapSelectors } from 'widgets/map'

export const CRFFilterSearch = () => {
	const dispatch = useAppDispatch()

	const crfValues = useAppSelector(mapSelectors.selectCRFClassifierValues)
	const crfUserLayers = useAppSelector(mapSelectors.selectCRFUserLayerList)

	const [inputValue, setInputValue] = useState('')
	const [options, setOptions] = useState<any[]>([])

	const getOptions = useCallback(async () => {
		const promises: Promise<IClassifierValue[]>[] = []

		crfUserLayers.forEach((i) => {
			promises.push(
				classifierApi.fetchClassifierValues({
					classifier: i.classifierFilterRules.cfr.cfrCID,
					all: 1,
				})
			)
		})

		Promise.all(promises)
			.then((response) => {
				let allOptions: ICRFClassifierValue[] = []

				for (let i = 0; i < response.length; i++) {
					const options: ICRFClassifierValue[] = response[i].map((option) => ({
						nameGroup: crfUserLayers[i].classifierFilterRules.cfr.cfrName,
						idLayer: crfUserLayers[i].id,
						...option,
					}))
					allOptions = [...allOptions, ...options]
				}

				return allOptions
			})
			.then((response) => {
				setOptions(response)
			})
	}, [crfUserLayers])

	if (!crfUserLayers.length) {
		return null
	}

	return (
		<Stack direction="row" sx={{ width: '100%' }}>
			<Autocomplete
				id="map-data-filter-search"
				sx={{
					display: 'inline-block',
					flexGrow: 1,
					'& input': {
						'&:focus': {
							border: 'none',
							outlin: 'none',
						},
						height: '40px',
						lineHeight: '40px',
						border: 'none',
						outline: 'none',
						width: '100%',
						bgcolor: 'transparent',
						color: (theme) =>
							theme.palette.getContrastText(theme.palette.background.paper),
					},
				}}
				value={crfValues}
				inputValue={inputValue}
				options={options}
				isOptionEqualToValue={(option, value) =>
					option.key === value.key && option.value === value.value
				}
				groupBy={(option) => option.nameGroup}
				getOptionLabel={(option) => option.value}
				renderOption={(props, option, { inputValue }) => {
					const matches = match(option.value, inputValue, { insideWords: true })
					const parts = parse(option.value, matches)

					return (
						<li {...props}>
							<div>
								{parts.map((part, index) => (
									<span
										key={index}
										style={{
											color: part.highlight
												? theme.palette.warning.dark
												: 'inherit',
										}}
									>
										{part.text}
									</span>
								))}
							</div>
						</li>
					)
				}}
				renderTags={() => null}
				renderInput={(params) => (
					<div ref={params.InputProps.ref}>
						<input {...params.inputProps} placeholder="filter data..." />
					</div>
				)}
				multiple
				disableCloseOnSelect={true}
				disableClearable={true}
				onOpen={getOptions}
				onChange={(_, value) => {
					dispatch(mapActions.setCRFClassifierValues(value))
				}}
				onInputChange={(event, value, reason) => {
					if (event && event.type === 'blur') {
						setInputValue('')
					} else if (reason !== 'reset') {
						setInputValue(value)
					}
				}}
			/>

			{!!inputValue && (
				<IconButton>
					<CloseIcon />
				</IconButton>
			)}
		</Stack>
	)
}
