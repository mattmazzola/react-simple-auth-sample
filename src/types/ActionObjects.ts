import AT from './ActionTypes'

export interface App {
    name: string
}

export interface AddAppAction {
    type: AT.ADD_APP
    app: App
}

export interface UserLoginAction {
    type: AT.USER_LOGIN
    name: string
    password: string
}

export interface UserLogoutAction {
    type: AT.USER_LOGOUT
}

export type ActionObject =
    AddAppAction |
    UserLoginAction |
    UserLogoutAction