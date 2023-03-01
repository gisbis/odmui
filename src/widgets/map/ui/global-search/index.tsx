import { Box, Stack } from '@mui/material'

import Logo from 'shared/assets/images/gb_3.svg'

import { DEFAULT_SIDEBAR_WIDTH } from 'shared/config'
import { useAppDispatch, useAppSelector } from 'shared/model'
import { theme } from 'shared/theme'

import type { ISearchGlobalValue } from 'shared/api/select'

import { mapActions, mapApi, mapSelectors } from 'widgets/map'

import type { IMapInfoRowData } from 'widgets/map/api'

import { GsAutocomplete } from './gs-autocomplete'

import { ToggleLeftSidebar } from '../controls'
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
		<Box
			sx={{
				position: 'absolute',
				top: '0',
				left: '0',
				zIndex: 2,
				width: DEFAULT_SIDEBAR_WIDTH,
			}}
		>
			<Box
				sx={{
					px: 1.5,
					py: '1rem',
				}}
			>
				<Stack
					direction="row"
					alignItems="center"
					sx={{
						borderRadius: '14px',
						backgroundColor: isOpenLeftSidebar
							? theme.palette.grey['200']
							: 'white',
						position: 'relative',
						px: 0.5,
						transition: 'background-color .25s ease-out',
					}}
				>
					<img src={Logo} width={50} height={50} />

					<Box sx={{ flexGrow: 1, position: 'relative' }}>
						<GsAutocomplete handleSearchChange={handleSearchChange} />
					</Box>

					{infoData !== null && <ClearData />}
				</Stack>
			</Box>

			<Box
				sx={{ position: 'absolute', right: '-64px', top: 'calc(1rem + 5px)' }}
			>
				<ToggleLeftSidebar />
			</Box>
		</Box>
	)
}
