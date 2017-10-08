import { Dispatch } from 'redux'
import { microsoftProvider } from '../providers/microsoft'
import { service } from '../services/react-simple-auth'
import { ActionObject } from '../types'
import { AT } from '../types/ActionTypes'

export const requestProfile = (): ActionObject =>
    ({
        type: AT.FETCH_PROFILE
    })

export const receiveProfile = (profile: any): ActionObject =>
    ({
        type: AT.FETCH_PROFILE_FULFILLED,
        profile
    })

export function fetchProfile() {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestProfile())
        const graphApiBaseUri = `https://graph.microsoft.com/v1.0`
        const token = service.getAccessToken(microsoftProvider, graphApiBaseUri)
        fetch(`${graphApiBaseUri}/me`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(response =>
                response.json()
                    .then(json => {
                        if (!response.ok) {
                            throw new Error(json)
                        }

                        return dispatch(receiveProfile(json))
                    }))
    }
}