import { ActionObject } from '../types'
import { AppState } from '../types'
import { AT } from '../types/ActionTypes'
import { Reducer } from 'redux'

const initialState: AppState = {
    apps: []
};

const reducer: Reducer<AppState> = (state = initialState, action: ActionObject): AppState => {
    switch (action.type) {
        case AT.ADD_APP:
            return { apps: [...state.apps, action.app] }
        default:
            return state
    }
}

export default reducer