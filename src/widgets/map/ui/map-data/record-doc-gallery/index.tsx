import React from 'react'

import { IAttachment } from 'shared/api/documents'
import { DocGallery } from 'entities/documents'

interface IDocGalleryProps {
	documents: IAttachment[]
}
export const RecordDocGallery: React.FC<IDocGalleryProps> = ({ documents }) => {
	return <DocGallery documents={documents} viewMode="swiper" />
}
