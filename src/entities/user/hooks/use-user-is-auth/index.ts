import { useAppSelector } from 'shared/model'
import { userSelectors } from 'entities/user/model/index'

export const useUser = () => useAppSelector(userSelectors.selectUserInfo)

export const useUserIsAuth = () => {
	const user = useUser()

	return !!user?.uid
}
