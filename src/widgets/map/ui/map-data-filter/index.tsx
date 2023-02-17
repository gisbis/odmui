import { useState } from 'react'
import { Box } from '@mui/material'

import { FilterSearch } from './filter-search'
import { FilterResult } from './filter-result'

export const MapDataFilter = () => {
	const [value, setValue] = useState('')

	return (
		<Box sx={{ width: 250 }}>
			<FilterSearch value={value} setValue={setValue} />
			<FilterResult />
		</Box>
	)
}
