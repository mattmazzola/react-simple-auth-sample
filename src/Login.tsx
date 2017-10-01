import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from './actions'
import { State } from './types'

function guid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c: string) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

class Component extends React.Component<Props, {}> {
    async loginWithMicrosoftAccount(): Promise<any> {
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

        const oauthAuthorizeUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_type=id_token+token
&scope=https%3A%2F%2Fgraph.microsoft.com%2Fuser.read%20openid%20profile
&client_id=606b0d7c-9062-474c-a5b0-cb9a61baf566
&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fredirect.html
&state=${guid()}
&nonce=${guid()}
&client_info=1
&x-client-SKU=MSAL-JS-SUCKS
&x-client-Ver=1.0.0
&client-request-id=${guid()}
&login_hint=mattmazzola%40live.com
&domain_req=${guid()}
&login_req=${guid()}
&domain_hint=consumers`
        // &prompt=none

        const windowOptionString = Object.entries(windowOptions).map(([key, value]) => `${key}=${value}`).join(',')
        const loginWindow = window.open(oauthAuthorizeUrl, requestKey, windowOptionString)

        return new Promise<any>((resolve: any, reject: any) => {
            // Poll for when the is closed
            const checkWindow = (loginWindow: Window) => {
                // If window is still open check again later
                if (!loginWindow.closed) {
                    setTimeout(() => checkWindow(loginWindow), 100)
                    return
                }

                const redirectUrl = window.localStorage.getItem(requestKey)
                window.localStorage.removeItem(requestKey)

                if (typeof redirectUrl !== 'string' || redirectUrl.length === 0) {
                    reject(new Error(`login window was closed or incomplete`))
                    return
                }

                const errorMatch = redirectUrl.match(/error=([^&]+)/)
                if (errorMatch) {
                    const errorReason = errorMatch[1]
                    const errorDescriptionMatch = redirectUrl.match(/error_description=([^&]+)/)
                    const errorDescription = errorDescriptionMatch ? errorDescriptionMatch[1] : ''
                    reject(new Error(`Error during login. Reason: ${errorReason} Description: ${errorDescription}`))
                    return
                }

                let accessToken: string | null = null
                const accessTokenMatch = redirectUrl.match(/access_token=([^&]+)/)
                if (accessTokenMatch) {
                    accessToken = accessTokenMatch[1]
                }

                let idToken: string | null = null
                let user: any = null
                const idTokenMatch = redirectUrl.match(/id_token=([^&]+)/)
                if (idTokenMatch) {
                    idToken = idTokenMatch[1]
                    user = JSON.parse(atob(idToken.split('.')[1]))
                }

                const session = {
                    accessToken,
                    idToken,
                    user
                }

                window.localStorage.setItem('session', JSON.stringify(session))
                resolve(session)
            }

            checkWindow(loginWindow)
        })
    }

    async onClickLogin() {
        try {
            const session = await this.loginWithMicrosoftAccount()
            const { login } = this.props
            login(session.user.oid, session.user.name)
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