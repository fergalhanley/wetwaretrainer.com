import * as firebase from 'firebase/app';
import 'firebase/database';
import { USER_ACTIONS } from '../actions/user-actions';
import update from 'immutability-helper';

export const firebaseMiddleware = store => next => action => {
    switch(action.type) {
        case USER_ACTIONS.UPDATE_TOPIC :
            const state = store.getState();
            const userId = state.user.details.uid;
            const topics = update(state.user.topics, {
                [state.user.currentTopic]: {$set: action.topic}
            });
            firebase
                .database()
                .ref(`users/${userId}/topics`)
                .set(topics);
            break;
        default:
    }
    return next(action);
};
