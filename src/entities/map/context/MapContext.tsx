import React from 'react'
import { OLMap } from 'shared/model'

export interface IMapContext {
	map: OLMap | null
}

export const MapContext = React.createContext<IMapContext | null>(null)
