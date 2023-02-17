import type { IAttachment } from 'shared/api/documents'
import { ResponsiveImg } from 'shared/ui/img'
import { DOC_PREVIEW_URL } from 'shared/config'

export const DocImgPreview = (props: {
	document: IAttachment
	renderPreview: boolean
	handleDocClick: (idDoc: number) => void
}) => {
	const { document, renderPreview, handleDocClick } = props

	return (
		<ResponsiveImg
			src={`${DOC_PREVIEW_URL}?docid=${
				document.idDoc
			}&page=0&pictogram=${Number(renderPreview)}`}
			aspectratio="3 / 4"
			onClick={() => handleDocClick(+document.idDoc)}
			className="lg-item"
			style={{ cursor: 'pointer' }}
		/>
	)
}
