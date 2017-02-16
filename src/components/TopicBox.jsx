import React, { PropTypes } from 'react';
import { editTopic } from '../actions/user-actions';
import { browserHistory } from 'react-router'
import { PATH } from '../util/router';
const s = {
    topicBox: {
        backgroundColor: 'lightgrey',
        padding: 10,
        width: 320,
        height: 240,
        borderRadius: 10,
        margin: 5,
    }
};

class TopicBox extends React.Component {

    static propTypes = {
        topic: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
    };

    handleEditTopicClick(){
        this.props.dispatch(editTopic(this.props.index));
        browserHistory.push(PATH.CREATE_TOPIC);
    }

    render() {
        return (
            <div className="flex-col between" style={s.topicBox}>
                <h1>{this.props.topic.name}</h1>
                <p>{this.props.topic.description}</p>
                <button className="btn btn-info btn-lg"
                        onClick={this.handleEditTopicClick.bind(this)}>
                    Edit Topic
                </button>
            </div>
        );
    }
}


export default TopicBox;