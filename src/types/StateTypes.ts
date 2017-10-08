import { App } from './ActionObjects'

export interface AppState {
    apps: App[]
}

export interface UserState {
    isLoggedIn: boolean
    id: string | null
    name: string | null
}

export interface ProfileState {
    current: any
}

export interface State {
    user: UserState
    apps: AppState
    profile: ProfileState
}
