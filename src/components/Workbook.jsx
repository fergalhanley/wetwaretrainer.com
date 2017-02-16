import React, { PropTypes } from 'react';
import { createWorkbook } from '../actions/user-actions';

class Workbook extends React.Component {

    componentDidMount(){
        this.props.dispatch(createWorkbook(this.props.topic));
    }

    render() {
        return (
            <h1>workbook</h1>
        );
    }
}


export default Workbook;
