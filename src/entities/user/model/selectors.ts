export const getSettingById = (idSetting: number) => (state: RootState) =>
	state.user.settingList.find((i) => +i.idSetting === +idSetting)?.valueSetting

export const selectUserInfo = (state: RootState) => state.user.user
