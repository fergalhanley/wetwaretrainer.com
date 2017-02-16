import { combineReducers } from 'redux'
import userReducer from './user-reducer';
import topicsReducer from './topics-reducer';
import { routerReducer } from 'react-router-redux';

const reducers = combineReducers({
    user: userReducer,
    topics: topicsReducer,
    routing: routerReducer,
});

export default reducers;