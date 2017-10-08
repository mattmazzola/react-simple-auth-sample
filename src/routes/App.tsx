import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

import { State } from '../types'
import './App.css'
import Home from './Home'
import Apps from './Apps'
import Docs from './Docs'
import Login from './Login'
import Profile from './Profile'

// tslint:disable-next-line:no-any
const userIsAuthenticated = connectedRouterRedirect<any, State>({
  // The url to redirect user to if they fail
  redirectPath: '/login',
  // Determine if the user is authenticated or not
  authenticatedSelector: state => state.user.isLoggedIn,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated'
})

const locationHelper = locationHelperBuilder({})
// tslint:disable-next-line:no-any
const userIsNotAuthenticated = connectedRouterRedirect<any, State>({
  // This sends the user either to the query param route if we have one, or to the landing page if none is specified and the user is already logged in
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/apps',
  // This prevents us from adding the query parameter when we send the user away from the login page
  allowRedirectBack: false,
  // This prevents us from adding the query parameter when we send the user away from the login page
  // Determine if the user is authenticated or not
  authenticatedSelector: state => !state.user.isLoggedIn,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsNotAuthenticated'
})

const ProtectedHome = userIsAuthenticated(Home)
const RedirectedLogin = userIsNotAuthenticated(Login)
const ProtectedApps = userIsAuthenticated(Apps)
const ProtectedDocs = userIsAuthenticated(Docs)
const ProtectedProfile = userIsAuthenticated(Profile)

class Component extends React.Component<Props, {}> {
  render() {
    return (
      <Router>
        <div className="app">
          <nav className="nav">
            <div className="title">React Auth</div>
            <NavLink to="/" exact={true}>Home</NavLink>
            <NavLink to="/apps">Apps</NavLink>
            <NavLink to="/docs">Docs</NavLink>
            {this.props.user.isLoggedIn && <NavLink to="/profile">Profile</NavLink>}
          </nav>
          <div className="app_content">
            <Route path="/" exact={true} component={ProtectedHome} />
            <Route path="/login" component={RedirectedLogin} />
            <Route path="/apps" component={ProtectedApps} />
            <Route path="/docs" component={ProtectedDocs} />
            <Route path="/profile" component={ProtectedProfile} />
          </div>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<{}>) => {
  return bindActionCreators({}, dispatch)
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
