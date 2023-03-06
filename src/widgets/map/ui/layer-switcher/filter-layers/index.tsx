import { BaseInput } from 'shared/ui'
import { theme } from 'shared/theme'
import { INPUT_BORDER_RADIUS } from 'shared/config'
import { useTranslate } from 'shared/i18n'

interface IFilterLayersProps {
	query: string
	setQuery: (val: string) => void
}
export const FilterLayers: React.FC<IFilterLayersProps> = ({
	query,
	setQuery,
}) => {
	const { translate } = useTranslate()

	return (
		<BaseInput
			value={query}
			onChange={(evt) => setQuery(evt.target.value)}
			placeholder={translate('Filter layers')}
			sx={{
				bgcolor: theme.palette.grey['200'],
				borderRadius: `${INPUT_BORDER_RADIUS}px`,
				padding: '1px 15px',
				width: 'calc(100% - 30px)',
				height: '50px',
			}}
		/>
	)
}
