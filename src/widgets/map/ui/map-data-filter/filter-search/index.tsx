import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface IFilterSearchProps {
	value: string
	setValue: (val: string) => void
}

export const FilterSearch: React.FC<IFilterSearchProps> = ({
	value,
	setValue,
}) => {
	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setValue(evt.target.value)
	}
	return (
		<TextField
			size="small"
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<SearchIcon />
					</InputAdornment>
				),
			}}
			value={value}
			fullWidth
			onChange={handleChange}
		/>
	)
}
