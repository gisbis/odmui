import { useEffect, useState } from 'react'

import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'

import {
	Autocomplete,
	Paper,
	PaperProps,
	Popper,
	PopperProps,
} from '@mui/material'

import { theme } from 'shared/theme'
import { BaseInput } from 'shared/ui'
import { selectApi } from 'shared/api'
import type { ISearchGlobalValue } from 'shared/api/select'
import { INPUT_BORDER_RADIUS } from 'shared/config'
import { useTranslate } from 'shared/i18n'

const CustomPopper = (props: PopperProps) => {
	return (
		<Popper
			sx={{
				left: '-20px!important',
				width: '358px!important',
			}}
			{...props}
		/>
	)
}

const CustomPaper = (props: PaperProps) => {
	return (
		<Paper
			sx={{
				borderTopLeftRadius: 0,
				borderTopRightRadius: 0,
			}}
			{...props}
		/>
	)
}

export const GsAutocomplete: React.FC<{
	handleSearchChange: (value: ISearchGlobalValue | null) => void
}> = ({ handleSearchChange }) => {
	const { translate } = useTranslate()
	const [open, setOpen] = useState(false)
	const [options, setOptions] = useState<ISearchGlobalValue[]>([])
	const [inputValue, setInputValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (!open) {
			setOptions([])
			return
		}

		setIsLoading(true)
		;(async () => {
			try {
				const response = await selectApi.searchGlobal({
					value: inputValue,
					onMap: 1,
				})

				setOptions(response)
			} catch (e) {
				setOptions([])
			} finally {
				setIsLoading(false)
			}
		})()
	}, [open, inputValue])

	return (
		<Autocomplete
			id="map-global-search"
			fullWidth
			options={options}
			inputValue={inputValue}
			groupBy={(option) => option.nameSelect}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			getOptionLabel={(option) => option.meta}
			loading={isLoading}
			renderTags={() => null}
			renderInput={(params) => (
				<div ref={params.InputProps.ref}>
					<BaseInput
						{...params.inputProps}
						placeholder={translate('Search')}
						sx={{
							height: '50px',
							bgcolor: 'transparent',
							borderRadius: INPUT_BORDER_RADIUS,
						}}
					/>
				</div>
			)}
			renderOption={(props, option, { inputValue }) => {
				const matches = match(option.meta, inputValue, { insideWords: true })
				const parts = parse(option.meta, matches)

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
			disableClearable={false}
			disablePortal={false}
			PopperComponent={CustomPopper}
			PaperComponent={CustomPaper}
			onOpen={() => {
				setOpen(true)
			}}
			onClose={() => {
				setOpen(false)
			}}
			onInputChange={(event, value, reason) => {
				if (event && event.type === 'blur') {
					setInputValue('')
				} else if (reason !== 'reset') {
					setInputValue(value)
				}
			}}
			onChange={(_, value) => {
				handleSearchChange(value)
			}}
		/>
	)
}
