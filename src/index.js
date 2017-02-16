import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import jQuery from 'jquery';
global.jQuery = jQuery;
require('bootstrap');
import './css/bootstrap.css';
import './css/theme.css';
import './css/font-awesome.css';

import { firebaseConfig } from './util/config';
import firebaseApp from 'firebase/app';
import { Routing } from './util/router';
import { authenticateAtStartup } from './actions/user-actions';
import store from './util/store';

firebaseApp.initializeApp(firebaseConfig);
store.dispatch(authenticateAtStartup());

ReactDOM.render(
    <Provider store={store}>
        <Routing {...store} />
    </Provider>,
  document.getElementById('root'));
