export const getSettingById = (idSetting: number) => (state: RootState) =>
	state.user.settingList.find((i) => +i.idSetting === +idSetting)?.valueSetting

export const getSettingByName = (nameSetting: string) => (state: RootState) =>
	state.user.settingList.find(
		(i) => i.nameSetting.toLowerCase() === nameSetting.toLowerCase()
	)?.valueSetting
