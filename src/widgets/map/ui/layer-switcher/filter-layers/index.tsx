import { InputAdornment, TextField, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface IFilterLayersProps {
	query: string
	setQuery: (val: string) => void
}
export const FilterLayers: React.FC<IFilterLayersProps> = ({
	query,
	setQuery,
}) => {
	return (
		<TextField
			value={query}
			onChange={(evt) => setQuery(evt.target.value)}
			fullWidth
			variant="outlined"
			placeholder="Search"
			size="small"
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton edge="end">
							<SearchIcon />
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	)
}
