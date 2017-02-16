import { browserHistory } from 'react-router'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { googleSignIn, createNewTopic } from '../actions/user-actions';
import { PATH } from '../util/router';
import TopicBox from './TopicBox';

const s = {
    title: {
        fontSize: 100,
    },
    tagLine: {
        fontSize: 20,
    },
    topBar: {
        padding: 5,
    },
    createTopic: {
        backgroundColor: 'lightgrey',
        padding: 10,
        width: 320,
        height: 240,
        borderRadius: 10,
        margin: 5,
    },
    addButton: {
        fontSize: 20,
    }
};

class Home extends Component {

    static propTypes = {
        signingIn: PropTypes.bool.isRequired,
        signedIn: PropTypes.bool.isRequired,
        topics: PropTypes.array
    };

    handleSignInWithGoogleClick(){
        this.props.dispatch(googleSignIn());
    }

    handleCreateTopicClick(){
        this.props.dispatch(createNewTopic());
        browserHistory.push(PATH.CREATE_TOPIC);
    }

    render() {
        return (
            <div className="text-center">
                <div style={s.title}>Wetware Trainer</div>
                <div style={s.tagLine}>Wire those neurons with knowledge</div>
                <div className="flex-row padding-5 justify-center">
                    { !this.props.signedIn &&
                        <button className="btn btn-primary btn-lg"
                                onClick={this.handleSignInWithGoogleClick.bind(this)}
                                disabled={this.props.signingIn}>
                            Sign In With Google
                        </button>
                    }
                </div>
                    { this.props.signedIn &&
                        <div className="flex-row wrap">
                            <div className="flex-col between" style={s.createTopic}>
                                <h1>Let's create a topic to learn</h1>
                                <button className="btn btn-primary btn-lg"
                                        onClick={this.handleCreateTopicClick.bind(this)}>
                                    Create New Topic
                                </button>
                            </div>
                            { this.props.topics.map( (topic, i) =>
                                <TopicBox dispatch={this.props.dispatch} topic={topic} key={i} index={i}/>)
                            }
                        </div>
                    }
            </div>
        );
    }
}

const mapProps = state => {
    const {
        signingIn,
        signedIn,
        topics,
    } = state.user;

    return {
        signingIn,
        signedIn,
        topics,
    }
};

export default connect(mapProps)(Home);