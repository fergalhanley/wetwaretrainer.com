import React from 'react';
import { Link } from 'react-router';
import { PATH } from '../util/router';
import { connect } from 'react-redux';
import Workbook from './Workbook';

class Preview extends React.Component {

    render() {
        return (
            <div>
                <Link className="btn btn-link btn-lg" to={PATH.CREATE_TOPIC}>
                    <span className="fa fa-arrow-left"></span> Back to topic
                </Link>
                <Workbook {...this.props} />
            </div>
        );
    }
}

const mapProps = state => {
    if(state.user.topics[state.user.currentTopic]) {
        return {
            topic: state.user.topics[state.user.currentTopic]
        }
    }
    return {
        topic: {}
    }
};

export default connect(mapProps)(Preview);