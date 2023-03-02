export const getSettingById = (idSetting: number) => (state: RootState) =>
	state.user.settingList.find((i) => +i.idSetting === +idSetting)?.valueSetting

export const selectUserInfo = (state: RootState) => state.user.user

export const selectUserLayerList = (state: RootState) => state.user.layerList

export const selectUserMapBoundBox = (state: RootState) =>
	state.user.user?.boundBox
