import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from '../actions'
import { State } from '../types'
import { microsoftProvider } from '../providers/microsoft'
import RSA from 'react-simple-auth'
import './Login.css'

class Component extends React.Component<Props, {}> {
    async onClickLogin() {
        try {
            const session = await RSA.acquireTokenAsync(microsoftProvider)
            const { login } = this.props
            login(session.decodedIdToken.oid, session.decodedIdToken.name)
        } catch (error) {
            throw error
        }
    }

    render() {
        return (
            <div className="login">
                <div className="login-providers">
                    <h4>Login:</h4>
                    <button type="button" className="login-button" onClick={() => this.onClickLogin()}>
                        <img src="/images/sign-in-with-microsoft-light.png" alt="Login with Microsoft" />
                    </button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        login
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