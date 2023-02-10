import React from 'react'
import { Map } from 'shared/model'

export interface IMapContext {
	map: Map | null
	renderRightSidebarContent: () => JSX.Element | null
	renderLeftSidebarContent: () => JSX.Element | null
}

export const MapContext = React.createContext<IMapContext | null>(null)
