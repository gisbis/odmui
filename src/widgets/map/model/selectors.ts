export const selectCurrentZoom = (state: RootState) => state.map.currentZoom

export const selectMapOnLoadEnd = (state: RootState) => state.map.mapOnLoadEnd

export const selectActiveIdLayerList = (state: RootState) =>
	state.map.activeIdLayerList

export const selectRightSidebarData = (state: RootState) => ({
	isOpen: state.map.isOpenRightSidebar,
	contentType: state.map.rightSidebarContentType,
})

export const selectLeftSidebarData = (state: RootState) => ({
	isOpen: state.map.isOpenLeftSidebar,
	contentType: state.map.leftSidebarContentType,
})

export const selectCRFUserLayerList = (state: RootState) =>
	state.map.crfUserLayerList

export const selectIsOpenCRFFilterSearch = (state: RootState) =>
	state.map.isOpenCrfFilterSearch

export const selectCRFClassifierValues = (state: RootState) =>
	state.map.crfClassifierValues

export const selectDefaultBaseLayerId = (state: RootState) =>
	state.map.defaultBaseLayerId
