import { styled } from '@mui/material'

export const ResponsiveImg = styled('img', {
	shouldForwardProp: (prop) => prop !== 'aspectratio',
})<{
	aspectratio?: string
}>(({ theme, aspectratio = '1' }) => ({
	width: '100%',
	aspectRatio: aspectratio,
	objectPosition: 'center',
	objectFit: 'cover',
	transition: 'box-shadow .1s ease-out,background-color .1s ease-out',
	zIndex: 1,
}))
