import { ActionObject } from '../types'
import { UserState } from '../types'
import { AT } from '../types/ActionTypes'
import { Reducer } from 'redux'
import { microsoftProvider } from '../providers/microsoft'
import RSA from 'react-simple-auth'

const unauthenticatedState: UserState = {
    isLoggedIn: false,
    id: null,
    name: null
};

const initialState = { ...unauthenticatedState }

const session = RSA.restoreSession(microsoftProvider)
if (session) {
    initialState.isLoggedIn = true
    initialState.id = session.decodedIdToken.oid
    initialState.name = session.decodedIdToken.name
}

const userReducer: Reducer<UserState> = (state = initialState, action: ActionObject): UserState => {
    switch (action.type) {
        case AT.USER_LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                name: action.name
            }
        case AT.USER_LOGOUT:
            RSA.invalidateSession()
            return { ...unauthenticatedState };
        default:
            return state;
    }
}

export default userReducer;