export const selectCurrentZoom = (state: RootState) => state.map.currentZoom

export const selectMapOnLoadEnd = (state: RootState) => state.map.mapOnLoadEnd

export const selectActiveIdLayerList = (state: RootState) =>
	state.map.activeIdLayerList

export const selectRightSidebarData = (state: RootState) => ({
	isOpen: state.map.isOpenRightSidebar,
	contentType: state.map.rightSidebarContentType,
})

export const selectIsOpenRightSidebar = (state: RootState) =>
	state.map.isOpenRightSidebar

export const selectLeftSidebarData = (state: RootState) => ({
	isOpen: state.map.isOpenLeftSidebar,
	contentType: state.map.leftSidebarContentType,
})

export const selectIsOpenLeftSidebar = (state: RootState) =>
	state.map.isOpenLeftSidebar

export const selectCRFUserLayerList = (state: RootState) =>
	state.map.crfUserLayerList

export const selectIsOpenCRFFilterSearch = (state: RootState) =>
	state.map.isOpenCrfFilterSearch

export const selectCRFClassifierValues = (state: RootState) =>
	state.map.crfClassifierValues

export const selectInfoMapGeoms = (state: RootState) => state.map.infoMapGeoms
export const selectMapInfoData = (state: RootState) => state.map.mapInfoData
