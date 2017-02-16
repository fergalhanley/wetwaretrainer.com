import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux';

import App from '../containers/App';
import Home from '../components/Home';
import About from '../components/About';
import Terms from '../components/Terms';
import Profile from '../components/Profile';
import Preview from '../components/Preview';

import CreateTopic from '../components/CreateTopic';

export const PATH = {
    HOME: '/',
    ABOUT: '/about',
    TERMS: '/terms',
    CREATE_TOPIC: '/create-topic',
    PROFILE: '/profile',
    PREVIEW: '/preview',
};

export const Routing = store => {
    return (
        <Router history={syncHistoryWithStore(browserHistory, store)}>
            <Route path={PATH.HOME} component={App}>
                <IndexRoute component={Home}/>
                <Route path={PATH.ABOUT} component={About}/>
                <Route path={PATH.TERMS} component={Terms}/>
                <Route path={PATH.CREATE_TOPIC} component={CreateTopic}/>
                <Route path={PATH.PROFILE} component={Profile}/>
                <Route path={PATH.PREVIEW} component={Preview}/>
            </Route>
        </Router>
    );
}
