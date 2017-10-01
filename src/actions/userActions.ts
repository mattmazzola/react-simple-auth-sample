import { ActionObject } from '../types'
import { AT } from '../types/ActionTypes'

export const login = (id: string, name: string): ActionObject =>
    ({
        type: AT.USER_LOGIN,
        id,
        name
    })

export const logout = (): ActionObject => 
    ({
        type: AT.USER_LOGOUT
    })