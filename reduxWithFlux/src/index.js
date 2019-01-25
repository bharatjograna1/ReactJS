import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import todoApp from './reducer/reducers'

// let store = createStore(todoApp)
// let rootElement = document.getElementById('app')

ReactDOM.render(
    <Provider store={createStore(todoApp)}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,

//     rootElement
// );
