import { TextField } from '@mui/material'

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
			label="Search"
			size="small"
		/>
	)
}
