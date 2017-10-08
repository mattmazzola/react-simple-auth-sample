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
    id: string
    name: string
}

export interface UserLogoutAction {
    type: AT.USER_LOGOUT
}

export interface FetchProfile {
    type: AT.FETCH_PROFILE
}

export interface FetchProfileFulfilled {
    type: AT.FETCH_PROFILE_FULFILLED
    profile: any
}

export type ActionObject =
    AddAppAction |
    UserLoginAction |
    UserLogoutAction |
    FetchProfile |
    FetchProfileFulfilled