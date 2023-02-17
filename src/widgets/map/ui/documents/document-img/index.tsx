import { IAttachment } from 'shared/api/documents'
import { DOC_PREVIEW_URL } from 'shared/config'
import { ResponsiveImg } from 'shared/ui/img'

export const DocumentImg = (props: {
	document: IAttachment
	renderPreview: boolean
	handleClick: (idDoc: number) => void
}) => {
	const { document, renderPreview, handleClick } = props

	return (
		<ResponsiveImg
			src={`${DOC_PREVIEW_URL}?docid=${
				document.idDoc
			}&page=0&pictogram=${Number(renderPreview)}`}
			aspectratio="3 / 4"
			onClick={() => handleClick(+document.idDoc)}
			className="lg-item"
			style={{ cursor: 'pointer' }}
		/>
	)
}
