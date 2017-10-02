import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from './actions'
import { State } from './types'
import { microsoftProvider, Session } from './providers/microsoft'
import { service } from './services/react-simple-auth'

class Component extends React.Component<Props, {}> {
    async onClickLogin() {
        try {
            const session = await service.acquireTokenAsync<Session>(microsoftProvider)
            const { login } = this.props
            login(session.decodedIdToken.oid, session.decodedIdToken.name)
        } catch (error) {
            throw error
        }
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <button type="button" onClick={() => this.onClickLogin()}>Login</button>
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