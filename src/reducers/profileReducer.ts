import { ActionObject } from '../types'
import { ProfileState } from '../types'
import { AT } from '../types/ActionTypes'
import { Reducer } from 'redux'

const initialState: ProfileState = {
    current: null
}

const reducer: Reducer<ProfileState> = (state = initialState, action: ActionObject): ProfileState => {
    switch (action.type) {
        case AT.FETCH_PROFILE_FULFILLED:
            return { current: action.profile }
        default:
            return state
    }
}

export default reducer