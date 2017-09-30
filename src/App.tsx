import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom'
// import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
// import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
// import { State } from './types'
import './App.css'
import Home from './Home'
import Apps from './Apps'
import Docs from './Docs'
import Login from './Login'

export const createReduxStore = () => createStore(rootReducer)

// const userIsAuthenticated = connectedRouterRedirect<{}, State>({
//   // The url to redirect user to if they fail
//   redirectPath: '/login',
//   // Determine if the user is authenticated or not
//   authenticatedSelector: state => state.user.isLoggedIn,
//   // A nice display name for this check
//   wrapperDisplayName: 'UserIsAuthenticated'
// })

// const locationHelper = locationHelperBuilder({})
// const userIsNotAuthenticated = connectedRouterRedirect<{}, State>({
//   // This sends the user either to the query param route if we have one, or to the landing page if none is specified and the user is already logged in
//   redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/apps',
//   // This prevents us from adding the query parameter when we send the user away from the login page
//   allowRedirectBack: false,
//   // Determine if the user is authenticated or not
//   authenticatedSelector: state => state.user.isLoggedIn,
//   // A nice display name for this check
//   wrapperDisplayName: 'UserIsNotAuthenticated'
// })

// const HomeC = userIsAuthenticated(Home)
// const LoginC = userIsNotAuthenticated(Login)
// const AppsC = userIsAuthenticated(Apps)
// const DocsC = userIsAuthenticated(Docs)

class App extends React.Component {
  render() {
    return (
      <Provider store={createReduxStore()}>
        <Router>
          <div>
            <h1>React Auth Test</h1>
            <nav>
              <ul>
                <li><NavLink to="/" exact={true}>Home</NavLink></li>
                <li><NavLink to="/apps">Apps</NavLink></li>
                <li><NavLink to="/docs">Docs</NavLink></li>
              </ul>
            </nav>
            <div>
              <Route path="/" exact={true} component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/apps" component={Apps} />
              <Route path="/docs" component={Docs} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
