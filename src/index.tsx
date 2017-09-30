import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

export const createReduxStore = () => createStore(rootReducer)


ReactDOM.render(
  <Provider store={createReduxStore()}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
