import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable'

import { IAttachment } from 'entities/select'
import { DOC_PREVIEW_URL } from 'shared/config'

const NEXT = 'NEXT'
const PREV = 'PREV'

type Direction = typeof PREV | typeof NEXT

interface CarouselState {
	pos: number
	sliding: boolean
	dir: Direction
}

type CarouselAction =
	| { type: Direction; numItems: number }
	| { type: 'stopSliding' }

const getInitialState = (numItems: number): CarouselState => ({
	pos: numItems - 1,
	sliding: false,
	dir: NEXT,
})

interface IDocumentsCarouselProps {
	documents: IAttachment[]
	openInGallery: (idDoc: number) => void
}

export const DocumentsCarousel: React.FC<IDocumentsCarouselProps> = ({
	documents,
	openInGallery,
}) => {
	const numItems = documents.length
	const [state, dispatch] = React.useReducer(reducer, getInitialState(numItems))

	const slide = (dir: Direction) => {
		dispatch({ type: dir, numItems })
		setTimeout(() => {
			dispatch({ type: 'stopSliding' })
		}, 50)
	}

	const handlers = useSwipeable({
		onSwipedLeft: () => slide(NEXT),
		onSwipedRight: () => slide(PREV),
		swipeDuration: 500,
		preventScrollOnSwipe: true,
		trackMouse: true,
	})

	return (
		<div {...handlers}>
			{documents.map((doc) => (
				<img src={`${DOC_PREVIEW_URL}?docid=${doc.idDoc}&page=0`} />
			))}
		</div>
	)
}

function reducer(state: CarouselState, action: CarouselAction): CarouselState {
	switch (action.type) {
		case PREV:
			return {
				...state,
				dir: PREV,
				sliding: true,
				pos: state.pos === 0 ? action.numItems - 1 : state.pos - 1,
			}
		case NEXT:
			return {
				...state,
				dir: NEXT,
				sliding: true,
				pos: state.pos === action.numItems - 1 ? 0 : state.pos + 1,
			}
		case 'stopSliding':
			return { ...state, sliding: false }
		default:
			return state
	}
}
