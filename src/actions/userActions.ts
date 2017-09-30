import { ActionObject } from '../types'
import { AT } from '../types/ActionTypes'

export const login = (name: string, password: string): ActionObject =>
    ({
        type: AT.USER_LOGIN,
        name,
        password
    })

export const logout = (): ActionObject => 
    ({
        type: AT.USER_LOGOUT
    })