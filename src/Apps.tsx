import * as React from 'react'
import { returntypeof } from 'react-redux-typescript';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addApplication } from './actions/appActions'
import { State } from './types'

const component = ({ addApplication, apps, user }: Props) => (
    <div>
        <h1>Apps</h1>
        <div>
            IsLoggedIn {user.isLoggedIn}
        </div>
        <div>
            <button type="button" onClick={() => addApplication({ name: `myapp-${(new Date().getTime())}` })}>Add App</button>
        </div>
        <ul>
            {apps.apps.map((app, i) =>
                <li key={app.name}>{app.name}</li>
            )}
        </ul>
    </div>
)

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        addApplication
    }, dispatch)
}
const mapStateToProps = (state: State) => {
    return {
        user: state.user,
        apps: state.apps
    }
}


// Props types inferred from mapStateToProps & dispatchToProps
const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);
type Props = typeof stateProps & typeof dispatchProps;

export default connect<typeof stateProps, typeof dispatchProps, {}>(mapStateToProps, mapDispatchToProps)(component);