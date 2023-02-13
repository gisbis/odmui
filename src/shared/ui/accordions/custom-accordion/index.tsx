import React, { FC } from 'react'

import { styled } from '@mui/material'

import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
	AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'

const Accordion = styled((props: AccordionProps) => (
	<MuiAccordion {...props} />
))<{ bordercolor?: string; disablemargins: string }>(
	({ theme, bordercolor, disablemargins = 'false' }) => ({
		border: `1px solid ${bordercolor ? bordercolor : theme.palette.divider}`,
		'&.MuiAccordion-root.Mui-expanded': {
			margin: disablemargins === 'true' ? '0' : '16px 0',
			borderColor: bordercolor ? bordercolor : theme.palette.divider,
		},
		'& .MuiAccordionSummary-root.Mui-expanded': {
			backgroundColor: 'white',
		},
		'&:not(:last-child)': {
			borderBottom:
				disablemargins === 'true'
					? 0
					: `1px solid ${
							bordercolor ? bordercolor : theme.palette.action.selected
					  }`,
		},
		'&:before': {
			display: 'none',
		},
	})
)

const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary {...props} />
))<{ bgcolor?: string }>(({ theme, bgcolor }) => ({
	backgroundColor: bgcolor ? bgcolor : theme.palette.action.hover,
	flexDirection: 'row-reverse',
	alignItems: 'center',
	width: '100%',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
		color: theme.palette.primary.main,
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
		width: '100%',
		justifyContent: 'space-between',
	},
	'& .MuiAccordionSummary-content.Mui-expanded': {
		color: theme.palette.primary.main,
		marginLeft: theme.spacing(1),
	},
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({}))

interface ICustomAccordionProps {
	accordionsProps?: AccordionProps
	accordionSummaryProps?: AccordionSummaryProps
	bgcolor?: string
	borderColor?: string
	disableMargins?: boolean
	showExpandIcon?: boolean
	summaryComponent: JSX.Element
	detailsComponent: JSX.Element
}

export const CustomAccordion: FC<ICustomAccordionProps> = ({
	accordionsProps = {},
	accordionSummaryProps = {},
	bgcolor,
	borderColor,
	summaryComponent,
	disableMargins,
	detailsComponent,
	showExpandIcon,
}) => {
	return (
		<Accordion
			{...accordionsProps}
			disablemargins={String(!!disableMargins)}
			bordercolor={borderColor}
			TransitionProps={{ unmountOnExit: true }}
		>
			<AccordionSummary
				{...accordionSummaryProps}
				bgcolor={bgcolor}
				expandIcon={
					showExpandIcon ? (
						<ArrowForwardIosSharpIcon sx={{ fontSize: '0.7rem' }} />
					) : null
				}
			>
				{summaryComponent}
			</AccordionSummary>

			<AccordionDetails>{detailsComponent}</AccordionDetails>
		</Accordion>
	)
}
