import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { browserHistory } from 'react-router';
import { PATH } from '../util/router';

export const USER_ACTIONS = {
    SIGN_IN: 'SIGN_IN',
    SIGNED_IN: 'SIGNED_IN',
    SIGN_IN_ERROR: 'SIGN_IN_ERROR',
    SIGNED_OUT: 'SIGNED_OUT',
    CREATE_NEW_TOPIC: 'CREATE_NEW_TOPIC',
    EDIT_TOPIC: 'EDIT_TOPIC',
    ADD_SECTION: 'ADD_SECTION',
    ADD_QUESTION: 'ADD_QUESTION',
    LOAD_TOPICS: 'LOAD_TOPICS',
    UPDATE_TOPIC: 'UPDATE_TOPIC',
    CREATE_WORKBOOK: 'CREATE_WORKBOOK',
};

export const signIn = () => ({
    type: USER_ACTIONS.SIGN_IN
});

export const signedIn = details => ({
    type: USER_ACTIONS.SIGNED_IN,
    details
});

export const signInError = error => ({
    type: USER_ACTIONS.SIGN_IN_ERROR,
    error
});

export const signedOut = () => ({
    type: USER_ACTIONS.SIGNED_OUT
});

export const createNewTopic = () => {
    return { type: USER_ACTIONS.CREATE_NEW_TOPIC };
};

export const editTopic = index => {
    return {
        type: USER_ACTIONS.EDIT_TOPIC,
        index
    };
};

export const addSection = () => ({
    type: USER_ACTIONS.ADD_SECTION
});

export const addQuestion = (sectionIndex) => ({
    type: USER_ACTIONS.ADD_QUESTION,
    sectionIndex
});

export const loadTopics = (topics) => ({
    type: USER_ACTIONS.LOAD_TOPICS,
    topics
});

export const updateTopic = topic => ({
    type: USER_ACTIONS.UPDATE_TOPIC,
    topic
});

export const createWorkbook = topic => ({
    type: USER_ACTIONS.CREATE_WORKBOOK,
    topic
});

function retrieveUserData(uid, dispatch){
    firebase
        .database()
        .ref(`/users/${uid}/topics`)
        .once('value')
        .then( topicsSnapshot => {
            const topics = topicsSnapshot.val().filter( topic => topic !== undefined);
            if(topics) {
                dispatch(loadTopics(topics));
            }
        });
}

export const authenticateAtStartup = () => dispatch => {

    firebase.auth().onAuthStateChanged( user => {
        if (user) {
            const { displayName, email, photoURL, uid } = user;
            dispatch(signedIn({ displayName, email, photoURL, uid }));
            retrieveUserData(uid, dispatch);
        }
        else {
            browserHistory.push(PATH.HOME);
        }
    });
};

export const googleSignIn = () => dispatch => {

    dispatch(signIn());

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');

    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const { displayName, email, photoURL, uid } = result.user;
            dispatch(signedIn({ displayName, email, photoURL, uid }));
            retrieveUserData(uid, dispatch);
        })
        .catch( error => {
            dispatch(signInError(error));
        });
};

export const signOut = () => dispatch => {
    firebase.auth().signOut();
    dispatch(signedOut());
    browserHistory.push(PATH.HOME);
};
