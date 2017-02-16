import {Topic, Question, Section} from '../model/topic';
import {Workbook} from '../model/workbook';
import update from 'immutability-helper';
import { USER_ACTIONS } from '../actions/user-actions';

const emptyUser = {
    details: {},
    signingIn: false,
    signedIn: false,
    topics: [],
    currentTopic: 0,
};

const userReducer = (state = emptyUser, action) => {
    switch (action.type) {
        case USER_ACTIONS.SIGN_IN :
            return {
                ...state,
                signingIn: true,
            };
        case USER_ACTIONS.SIGNED_IN :
            return {
                ...state,
                details: action.details,
                signingIn: false,
                signedIn: true,
            };
        case USER_ACTIONS.SIGNED_OUT :
            return {
                ...state,
                details: {},
                signedIn: false,
            };
        case USER_ACTIONS.SIGN_IN_ERROR :
            return {
                ...state,
                signInError: action.error,
                signingIn: false,
            };
        case USER_ACTIONS.CREATE_NEW_TOPIC :
            return update(state, {
                topics: {$unshift: [new Topic(state.details)]},
                currentTopic: {$set: 0}
            });
        case USER_ACTIONS.EDIT_TOPIC :
            return update(state, {
                currentTopic: {$set: action.index}
            });
        case USER_ACTIONS.ADD_SECTION :
            return update(state, {
                topics: {
                    [state.currentTopic]: {
                        sections: {$push: [new Section()]}
                    }
                }
            });
        case USER_ACTIONS.ADD_QUESTION :
            return update(state, {
                topics: {
                    [state.currentTopic]: {
                        sections: {
                            [action.sectionIndex]: {
                                questions: {$push: [new Question()]}
                            }
                        }
                    }
                }
            });
        case USER_ACTIONS.LOAD_TOPICS :
            return {
                ...state,
                topics: action.topics
            };
        case USER_ACTIONS.UPDATE_TOPIC :
            return update(state, {
                topics: {
                    [state.currentTopic]: {$set: action.topic}
                }
            });
        case USER_ACTIONS.CREATE_WORKBOOK :
            return {
                ...state,
                workbook: new Workbook(action.topic)
            };
        default:
            return state;
    }
};


export default userReducer;