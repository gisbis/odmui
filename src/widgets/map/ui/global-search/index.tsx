import { Box, Stack } from '@mui/material'

import { useAppDispatch, useAppSelector } from 'shared/model'
import { theme } from 'shared/theme'
import type { ISearchGlobalValue } from 'shared/api/select'

import { mapActions, mapApi, mapSelectors } from 'widgets/map'
import type { IMapInfoRowData } from 'widgets/map/api'

import { GsAutocomplete } from './gs-autocomplete'
import { GsLogo } from './gs-logo'

import { ClearData } from '../map-data'

export const GlobalSearch = () => {
	const dispatch = useAppDispatch()
	const infoData = useAppSelector(mapSelectors.selectMapInfoData)
	const isOpenLeftSidebar = useAppSelector(mapSelectors.selectIsOpenLeftSidebar)

	const handleSearchChange = async (value: ISearchGlobalValue | null) => {
		if (!value) {
			return
		}

		try {
			const response = await mapApi.fetchGeom({
				idLayer: value.idLayer,
				syss: value.sys,
			})

			const infoData: IMapInfoRowData = {
				sys: value.sys,
				id: value.id,
				layerInfo: {
					layerID: value.idLayer,
				},
				selectInfo: {
					selectID: value.idSelect,
				},
				geom: response[0].geom,
				metafield: value.meta,
			}

			dispatch(mapActions.setMapinfoData([infoData]))
			dispatch(mapActions.setLeftSidebarContentType('map-data'))
			dispatch(mapActions.setIsOpenLeftSidebar(true))
		} catch (e) {}
	}

	return (
		<Stack
			direction="row"
			alignItems="center"
			spacing={1}
			sx={{
				borderRadius: '14px',
				backgroundColor: isOpenLeftSidebar
					? theme.palette.grey['200']
					: 'white',
				borderWidth: '1px',
				borderStyle: 'solid',
				borderColor: theme.palette.grey['200'],
				position: 'relative',
				px: 1,
				transition: 'background-color .25s ease-out',
			}}
		>
			<GsLogo />

			<Box sx={{ flexGrow: 1, position: 'relative' }}>
				<GsAutocomplete handleSearchChange={handleSearchChange} />
			</Box>

			{infoData !== null && <ClearData />}
		</Stack>
	)
}
