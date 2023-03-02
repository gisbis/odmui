import ShareIcon from '@mui/icons-material/Share'
import { IconButton } from '@mui/material'

export const CopyRecordUrl: React.FC<{ handleSharedClick: () => void }> = ({
	handleSharedClick,
}) => {
	const handleClick = (evt: React.MouseEvent) => {
		evt.stopPropagation()
		handleSharedClick()
	}

	return (
		<IconButton
			size="small"
			aria-label="share"
			onClick={handleClick}
			sx={{ mr: 0.5 }}
		>
			<ShareIcon fontSize="small" />
		</IconButton>
	)
}
