import { useCallback, useState } from 'react'
import { Autocomplete, AutocompleteRenderInputParams } from '@mui/material'

import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'

import type {
	IClassifierValue,
	IFetchClassifierValuesParams,
} from 'shared/api/classifier'

import { theme } from 'shared/theme'
import { classifierApi } from 'shared/api'
import { BaseInput } from 'shared/ui'
import { useAppDispatch, useAppSelector } from 'shared/model'
import { useTranslate } from 'shared/i18n'
import { ICRFClassifierValue, mapActions, mapSelectors } from 'widgets/map'
import { BREAKPOINTS, INPUT_BORDER_RADIUS } from 'shared/config'
import { useIsBreakpoint } from 'shared/hooks'

interface IFetchClassifierValuesData {
	nameGroup: string
	idLayer: number
	crfCID: number
	crfLF: string
	fn: Promise<IClassifierValue[]>
}

export const CRFFilterSearch = () => {
	const isMobile = useIsBreakpoint(BREAKPOINTS.mobile)
	const { translate } = useTranslate()
	const dispatch = useAppDispatch()

	const crfValues = useAppSelector(mapSelectors.selectCRFClassifierValues)
	const crfUserLayers = useAppSelector(mapSelectors.selectCRFUserLayerList)

	const [inputValue, setInputValue] = useState('')
	const [options, setOptions] = useState<ICRFClassifierValue[]>([])

	const getOptions = useCallback(async () => {
		const fetchData: IFetchClassifierValuesData[] = []

		for (let i = 0; i < crfUserLayers.length; i++) {
			const rules = crfUserLayers[i].classifierFilterRules

			rules.forEach((rule) => {
				const obj: IFetchClassifierValuesData = {
					nameGroup: crfUserLayers[i]?.LayerGroup?.nameLayerGroup || 'untitled',
					idLayer: crfUserLayers[i].id,
					crfCID: +rule.cfrCID,
					crfLF: rule.cfrLF,
					fn: fetchClassifierValues({
						classifier: rule.cfrCID,
						all: 1,
					}),
				}

				fetchData.push(obj)
			})
		}

		const promises: Promise<IClassifierValue[]>[] = fetchData.map((i) => i.fn)

		try {
			const response = await Promise.all(promises)

			const options: ICRFClassifierValue[] = response
				.map((values, idx) => {
					const data = fetchData[idx]

					return values.map((val) => ({
						crfLF: data.crfLF,
						crfCID: data.crfCID,
						idLayer: data.idLayer,
						nameGroup: data.nameGroup,
						...val,
					}))
				})
				.flat()

			setOptions(options)
		} catch (e) {
			console.log(e)
		}
	}, [crfUserLayers])

	const renderInput = useCallback(
		(params: AutocompleteRenderInputParams) => {
			if (isMobile) {
				return (
					<BaseInput
						{...params.inputProps}
						placeholder={translate('Filter')}
						sx={{
							bgcolor: theme.palette.grey['200'],
							borderRadius: INPUT_BORDER_RADIUS,
							padding: '1px 15px',
							width: 'calc(100% - 30px)',
							height: '50px',
						}}
					/>
				)
			} else {
				return (
					<BaseInput {...params.inputProps} placeholder={translate('Filter')} />
				)
			}
		},
		[isMobile]
	)

	const fetchClassifierValues = (params: IFetchClassifierValuesParams) => {
		return classifierApi.fetchClassifierValues(params)
	}

	if (!crfUserLayers.length) {
		return null
	}

	return (
		<Autocomplete
			id="map-data-filter-search"
			sx={{ flexGrow: 1 }}
			value={crfValues}
			inputValue={inputValue}
			options={options}
			isOptionEqualToValue={(option, value) => option.value === value.value}
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
				<div ref={params.InputProps.ref}>{renderInput(params)}</div>
			)}
			multiple
			disableCloseOnSelect={true}
			disableClearable={true}
			onOpen={async () => {
				dispatch(mapActions.setIsOpenCRFFilterList(true))
				await getOptions()
			}}
			onClose={() => {
				dispatch(mapActions.setIsOpenCRFFilterList(false))
			}}
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
			disablePortal={true}
		/>
	)
}
