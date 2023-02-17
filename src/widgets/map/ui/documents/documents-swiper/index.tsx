import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Autoplay, A11y } from 'swiper'

import 'swiper/swiper-bundle.min.css'

import type { IAttachment } from 'shared/api/documents'
import { DocumentImg } from '../document-img'

interface IDocumentsSwiperProps {
	documents: IAttachment[]
	openInGallery: (idDoc: number) => void
}

export const DocumentsSwiper: React.FC<IDocumentsSwiperProps> = ({
	documents,
	openInGallery,
}) => {
	return (
		<Swiper
			modules={[Scrollbar, Autoplay, A11y]}
			spaceBetween={5}
			slidesPerView={documents.length === 1 ? 1 : 2}
			scrollbar={{ draggable: true }}
			autoplay={{
				delay: 3000,
				pauseOnMouseEnter: true,
				waitForTransition: true,
			}}
		>
			{documents.map((doc) => (
				<SwiperSlide key={doc.idDoc}>
					<DocumentImg
						document={doc}
						renderPreview={documents.length > 1}
						handleClick={openInGallery}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	)
}
