import { ActionObject } from '../types'
import { UserState } from '../types'
import { AT } from '../types/ActionTypes'
import { Reducer } from 'redux'
import { Session } from '../Login'

const unauthenticatedState: UserState = {
    isLoggedIn: false,
    id: null,
    name: null
};

const initialState = { ...unauthenticatedState }

const sessionString = window.localStorage.getItem('session')
if (typeof sessionString === 'string' && sessionString.length > 0) {
    const session: Session = JSON.parse(sessionString)
    if (session.decodedIdToken) {
        initialState.isLoggedIn = true
        initialState.id = session.decodedIdToken.oid
        initialState.name = session.decodedIdToken.name
    }
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
            return { ...unauthenticatedState };
        default:
            return state;
    }
}

export default userReducer;