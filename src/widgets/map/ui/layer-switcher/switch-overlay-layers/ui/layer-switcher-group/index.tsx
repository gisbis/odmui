import { useCallback, useEffect, useMemo, useState } from 'react'

import { Box, Checkbox, Collapse, Stack, Typography } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'

import { useAppDispatch, useAppSelector } from 'shared/model'
import { ILayersGroup } from 'entities/map'

import { mapActions } from 'entities/map'

import { LayerSwitcherItem } from '../layer-switcher-item'

interface ILayerSwitcherGroupProps {
	group: ILayersGroup
	defaultGroupIsOpen: boolean
}
export const LayerSwitcherGroup: React.FC<ILayerSwitcherGroupProps> = ({
	group,
	defaultGroupIsOpen,
}) => {
	const dispatch = useAppDispatch()
	const activeIdLayerList = useAppSelector(
		(state) => state.map.activeIdLayerList
	)
	const [open, setOpen] = useState(defaultGroupIsOpen)

	useEffect(() => {
		setOpen(defaultGroupIsOpen)
	}, [defaultGroupIsOpen])

	const toggleOpen = () => {
		setOpen(!open)
	}

	const checkedGroup = useMemo(() => {
		const ids = group.layers.map((i) => i.id)
		const uncheckedIds = ids.filter((i) => !activeIdLayerList.includes(+i))
		return !uncheckedIds.length
	}, [group, activeIdLayerList])

	const indeterminate = useMemo(() => {
		const ids = group.layers.map((i) => i.id)
		const uncheckedIds = ids.filter((i) => !activeIdLayerList.includes(+i))

		return (
			uncheckedIds.length !== group.layers.length && uncheckedIds.length !== 0
		)
	}, [group, activeIdLayerList])

	const handleChange = useCallback(() => {
		if (checkedGroup && !indeterminate) {
			dispatch(
				mapActions.setActiveIdLayerList([
					...activeIdLayerList.filter(
						(i) => !group.layers.map((x) => +x.id).includes(+i)
					),
				])
			)

			return
		}

		if (!checkedGroup || indeterminate) {
			dispatch(
				mapActions.setActiveIdLayerList([
					...activeIdLayerList.filter(
						(i) => !group.layers.map((x) => +x.id).includes(+i)
					),
					...group.layers.map((i) => +i.id),
				])
			)
		}
	}, [checkedGroup, indeterminate, activeIdLayerList, group])

	return (
		<Box>
			<Stack direction="row">
				<Checkbox
					size="small"
					checked={checkedGroup}
					indeterminate={indeterminate}
					edge="start"
					onChange={handleChange}
				/>

				<Box
					onClick={toggleOpen}
					sx={{
						cursor: 'pointer',
						flexGrow: '1',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Typography variant="body2" fontWeight={500}>
						{group.nameLayerGroup}
					</Typography>

					{open ? <ExpandLess /> : <ExpandMore />}
				</Box>
			</Stack>

			<Collapse in={open} timeout="auto" unmountOnExit>
				<Stack sx={{ pl: 3 }}>
					{group.layers.map((layer) => (
						<LayerSwitcherItem key={layer.id} layer={layer} />
					))}
				</Stack>
			</Collapse>
		</Box>
	)
}
