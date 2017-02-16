import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import createLogger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { firebaseMiddleware } from './persistence';

const STORE_VERSION = '3';

const middleware = [
    thunk,
    routerMiddleware(browserHistory),
    firebaseMiddleware,
];

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const storeVersion = localStorage.getItem('storeVersion');

let store;

if(storeVersion === STORE_VERSION) {
    const preloadedState = JSON.parse(localStorage.getItem('preloadedState'));
    store = createStore(reducers, preloadedState, applyMiddleware(...middleware));

}
else {
    store = createStore(reducers, applyMiddleware(...middleware));
    localStorage.setItem('storeVersion', STORE_VERSION);
}

// store state on localStorage for fast retrieval after page reload
store.subscribe(() => {
    localStorage.setItem('preloadedState', JSON.stringify(store.getState()));
});

export default store;