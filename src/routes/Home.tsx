import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { fetchProfile } from '../actions/graphApiActions'
import { State } from '../types'

const component = ({ fetchProfile, profile }: Props) => (
    <div>
        <h1>Home</h1>
        <button type="button" onClick={() =>  fetchProfile()}>Load Profile</button>
        <h2>Profile:</h2>
        <pre>
            {profile.current ? JSON.stringify(profile.current, null, '  ') : "Profile not loaded"}
        </pre>
    </div>
)

const mapDispatchToProps = (dispatch: Dispatch<{}>) => {
    return bindActionCreators({
        fetchProfile
    }, dispatch)
}
const mapStateToProps = (state: State) => {
    return {
        profile: state.profile
    }
}

const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);
export type Props = typeof stateProps & typeof dispatchProps;

export default connect<typeof stateProps, typeof dispatchProps, {}>(mapStateToProps, mapDispatchToProps)(component);