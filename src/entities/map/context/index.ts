import type { Map } from 'ol'
import { createContext } from 'react'

export interface IMapContext {
	map: Map | null
}

export const MapContext = createContext<IMapContext | null>(null)
