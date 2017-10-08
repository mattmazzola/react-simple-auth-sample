import { combineReducers } from 'redux'
import appsReducer from './appsReducer'
import userReducer from './userReducer'
import profileReducer from './profileReducer'
import { State } from '../types'

export default combineReducers<State>({
    user: userReducer,
    apps: appsReducer,
    profile: profileReducer
})