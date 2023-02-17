import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Autoplay, A11y } from 'swiper'

import 'swiper/swiper-bundle.min.css'

import type { IAttachment } from 'shared/api/documents'
import { DOC_PREVIEW_URL } from 'shared/config'
import { ResponsiveImg } from 'shared/ui/img'

interface IDocumentsSwiperProps {
	documents: IAttachment[]
	handleDocClick: (idDoc: number) => void
}

export const DocSwiper: React.FC<IDocumentsSwiperProps> = ({
	documents,
	handleDocClick,
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
			{documents.map((document) => (
				<SwiperSlide key={document.idDoc}>
					<ResponsiveImg
						src={`${DOC_PREVIEW_URL}?docid=${
							document.idDoc
						}&page=0&pictogram=${Number(documents.length > 1)}`}
						aspectratio="3 / 4"
						onClick={() => handleDocClick(+document.idDoc)}
						className="lg-item"
						style={{ cursor: 'pointer' }}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	)
}
