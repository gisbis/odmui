import { BaseInput } from 'shared/ui'

interface IFilterLayersProps {
	query: string
	setQuery: (val: string) => void
}
export const FilterLayers: React.FC<IFilterLayersProps> = ({
	query,
	setQuery,
}) => {
	return (
		<BaseInput
			value={query}
			onChange={(evt) => setQuery(evt.target.value)}
			placeholder="Search..."
		/>
	)
}
