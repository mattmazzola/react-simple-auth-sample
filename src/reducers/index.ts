import { combineReducers } from 'redux'
import appsReducer from './appsReducer'
import userReducer from './userReducer'
import { State } from '../types'

export default combineReducers<State>({
    user: userReducer,
    apps: appsReducer
})