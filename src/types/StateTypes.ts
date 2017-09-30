import { App } from './ActionObjects'

export interface AppState {
    apps: App[]
}

export interface UserState {
    isLoggedIn: boolean
    name: string
}

export interface State {
    user: UserState
    apps: AppState
}
