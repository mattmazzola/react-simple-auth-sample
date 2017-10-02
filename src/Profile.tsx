import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { logout } from './actions'
import { State } from './types'
import { microsoftProvider } from './providers/microsoft'
import { service } from './services/react-simple-auth'

interface ComponentState {
    data: any
}

class Component extends React.Component<Props, ComponentState> {
    componentWillMount() {
        this.setState({
            data: null
        })
    }

    componentDidMount() {
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

                        this.setState({
                            data: json
                        })
                    }))
    }

    onClickLogout() {
        const { logout } = this.props
        logout()
        window.location.assign(`https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=http%3A%2F%2Flocalhost%3A3000`)
    }

    render() {
        const { user } = this.props
        return (
            <div>
                <h1>Profile: {user.name}</h1>
                <p>UPN: {this.state.data && this.state.data.userPrincipalName}</p>
                <button type="button" onClick={() => this.onClickLogout()}>Logout</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch<{}>) => {
    return bindActionCreators({
        logout
    }, dispatch)
}
const mapStateToProps = (state: State) => {
    return {
        user: state.user
    }
}

const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);
type Props = typeof stateProps & typeof dispatchProps;

export default connect<typeof stateProps, typeof dispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Component);