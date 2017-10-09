import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../actions'
import { State } from '../types'
import { microsoftProvider } from '../providers/microsoft'
import './Profile.css'

class Component extends React.Component<Props, {}> {
    onClickLogout() {
        const { logout } = this.props
        logout()
        window.location.assign(microsoftProvider.getSignOutUrl(window.location.origin))
    }

    render() {
        const { user } = this.props
        return (
            <div>
                <h1>Profile: {user.name}</h1>
                <button type="button" className="button-logout" onClick={() => this.onClickLogout()}>Logout</button>
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