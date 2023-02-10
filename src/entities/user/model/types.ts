export interface IUser {
	loged: number
	uid: string
	nameUser: string
	isadmin: number
	groupId: number[]
	isNoPassword: number
	lng: string
	timeZone: string
	userRight: Array<IUserRight>
}

export interface IUserRight {
	id: string
	name: string
	allow: number
}

export interface IUserProperties {
	idUser: string
	nameUser: string
	descriptionUser?: string
	shortNameUser?: string
	idGroupUser?: string
	postUser?: string
	addressUser?: string
	remarkUser?: string
	lngUser?: string
	allowSendMailUser?: boolean
	accessAllUser?: boolean
	disableUser?: boolean
	noPasswordLogonUser?: boolean
	Organisation?: IOrganization
	contactsUser?: IUserContact[]
}

export interface IUserGroup {
	idGroup: string
	nameGroup: string
	descriptionGroup: string
	disableGroup: number
}

export interface IOrganization {
	idOrganisation: string
	nameOrganisation: string
}

export interface IUserContact {
	idUserContact: string
	textUserContact: string
	UserContactType: IUserContactType
}

export interface IUserContactType {
	idUserContactType: string
	nameUserContactType: string
}
