import { useCallback, useEffect, useMemo, useRef } from 'react'

import { DOC_PREVIEW_URL } from 'shared/config'
import type { IAttachment } from 'shared/api/documents'

import { DocumentsCarousel } from '../documents-carousel'

import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import lgRotate from 'lightgallery/plugins/rotate'
import LightGalleryReact from 'lightgallery/react'
import type { LightGallery } from 'lightgallery/lightgallery'
import type { GalleryItem } from 'lightgallery/lg-utils'

interface IDocumentsGalleryProps {
	documents: IAttachment[]
}

export const DocumentsGallery: React.FC<IDocumentsGalleryProps> = ({
	documents,
}) => {
	const LGRef = useRef<LightGallery | null>(null)

	const LGItems: GalleryItem[] | undefined = useMemo(() => {
		if (!documents?.length) {
			return undefined
		}

		const newGalleryItems: GalleryItem[] = []

		documents.forEach((doc) => {
			if (!doc.pageCount && !!doc.hasPreview) {
				newGalleryItems.push({
					thumb: `${DOC_PREVIEW_URL}?docid=${doc.idDoc}&page=0&pictogram=1`,
					subHtml: doc.nameDoc,
					title: doc.nameDoc,
					src: `${DOC_PREVIEW_URL}?docid=${doc.idDoc}&page=0`,
				})
			} else if (!!doc.pageCount && !!doc.hasPreview) {
				for (let i = 0; i < +doc.pageCount; i++) {
					newGalleryItems.push({
						thumb: `${DOC_PREVIEW_URL}?docid=${doc.idDoc}&page=0&pictogram=1`,
						subHtml: doc.nameDoc,
						title: doc.nameDoc,
						src: `${DOC_PREVIEW_URL}?docid=${doc.idDoc}&page=${i}`,
					})
				}
			}
		})

		return newGalleryItems
	}, [documents])

	useEffect(() => {
		if (!LGRef.current) {
			return
		}

		LGRef.current.refresh()
	}, [LGItems])

	const onInit = useCallback((detail: any) => {
		if (detail) {
			LGRef.current = detail.instance
		}
	}, [])

	const openInGallery = useCallback(
		(idDoc: number) => {
			const idx = documents
				.filter((i) => !!i.hasPreview)
				.findIndex((i) => String(i.idDoc) === String(idDoc))

			LGRef.current && LGRef.current.openGallery(idx)
		},
		[documents]
	)

	return (
		<LightGalleryReact
			onInit={onInit}
			speed={500}
			plugins={[lgThumbnail, lgZoom, lgRotate]}
			selector=".lg-item"
			dynamic={true}
			dynamicEl={LGItems}
		>
			<DocumentsCarousel documents={documents} openInGallery={openInGallery} />
		</LightGalleryReact>
	)
}
