import type { Map } from 'ol'
import { createContext, useContext } from 'react'

import VectorSource from 'ol/source/Vector'

interface IMapContext {
	map: Map | null
	dataInfoSource: VectorSource
}

const MapContext = createContext<IMapContext | null>(null)

export const MapContextProvider = MapContext.Provider

export const useMapContext = () => {
	const context = useContext(MapContext) as IMapContext

	if (context === null) {
		throw new Error("Don't provide map context")
	}

	return context
}
