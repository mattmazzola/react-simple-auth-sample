import { ActionObject } from '../types'
import { App } from '../types/ActionObjects'
import { AT } from '../types/ActionTypes'

export const addApplication = (app: App): ActionObject =>
    ({
        type: AT.ADD_APP,
        app
    })