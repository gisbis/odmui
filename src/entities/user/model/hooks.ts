import { useAppSelector } from 'shared/model'

export const useUser = () => {
	const sessId = useAppSelector((state) => state.user.sessId)
	const user = useAppSelector((state) => state.user.user)

	return {
		isAuth: !!user?.uid,
		sessId,
		user,
	}
}
