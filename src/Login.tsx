import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from './actions'
import { State } from './types'

class component extends React.Component<Props, {}> {
    async loginWithMicrosoftAccount(): Promise<void> {
        // Create unique request key
        const requestKey = `requestKey_${(new Date().getTime())}`
        // Set request key as empty in local storage
        window.localStorage.setItem(requestKey, '')
        // Create new window set to authorize url, with unique request key, and centered options
        const [width, height] = [500, 500]
        const windowOptions = {
            width,
            height,
            left: Math.floor(screen.width / 2 - width / 2) + ((screen as any).availLeft || 0),
            top: Math.floor(screen.height / 2 - height / 2)
        }

        const windowOptionString = Object.entries(windowOptions).map(([key, value]) => `${key}=${value}`).join(',')
        const loginWindow = window.open('/redirect.html', requestKey, windowOptionString)

        return new Promise<void>((resolve, reject) => {
            // Poll for when the is closed
            const checkWindow = (loginWindow: Window) => {
                if (!loginWindow) {
                    return
                }
                
                if (loginWindow.closed) {
                    const requestValue = window.localStorage.getItem(requestKey)
                    window.localStorage.removeItem(requestKey)
                    console.log(`login request value: `, requestValue)
                    resolve()
                }
                else {
                    setTimeout(() => checkWindow(loginWindow), 100)
                }
            }
            
            checkWindow(loginWindow)
        })
    }
    
    async onClickLogin() {
        console.log(`onClickLogin`)
        try {
            await this.loginWithMicrosoftAccount()
        }
        catch (error) {
            console.log(`login error`)
        }

        console.log(`login successful`)
        const { login } = this.props
        login("matt", "mazzola")
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

export default connect<typeof stateProps, typeof dispatchProps, {}>(mapStateToProps, mapDispatchToProps)(component);