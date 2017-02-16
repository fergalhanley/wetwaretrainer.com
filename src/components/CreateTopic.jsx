import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { PATH } from '../util/router';
import { connect } from 'react-redux';
import { deepCopy, changed, swapElems } from '../util/utilz';
import { addQuestion, addSection, updateTopic } from '../actions/user-actions';

const s = {
    menu: {
        top: 40,
        left: -123,
    }
};

class CreateTopic extends React.Component {

    static propTypes = {
        topic: PropTypes.object.isRequired,
    };

    constructor(){
        super();
        setInterval(() => {
            if(this.props.topic && changed(this.props.topic, this.props.storeTopic)) {
                this.props.dispatch(updateTopic(this.props.topic));
            }
        }, 5000);
    }

    handleAddQuestionClick(sectionIndex){
        this.props.dispatch(addQuestion(sectionIndex));
    }

    handleAddSectionClick(){
        this.props.dispatch(addSection());
    }

    handleClickMoveSectionUp(sectionIndex){
        if(sectionIndex > 0) {
            swapElems(this.props.topic.sections, sectionIndex, sectionIndex - 1);
        }
    }

    handleClickMoveSectionDown(sectionIndex){
        if(sectionIndex < this.props.topic.sections - 1) {
            swapElems(this.props.topic.sections, sectionIndex, sectionIndex + 1);
        }
    }

    handleClickRemoveSection(sectionIndex){
        this.props.topic.sections.splice(sectionIndex, 1);
    }

    handleClickRemoveQuestion(sectionIndex, questionIndex){
        if(sectionIndex > 0) {
        }
    }

    handleClickMoveQuestionUp(sectionIndex, questionIndex){
        if(sectionIndex < this.props.topic.sections - 1) {

        }
    }

    handleClickMoveQuestionDown(sectionIndex, questionIndex){
        this.props.topic.sections.splice(sectionIndex, 1);
    }

    render() {
        return (
            <div className="page">
                <div className="flex-row between">
                    <h1>Create a topic</h1>
                    <div>
                        <Link className="btn btn-success btn-lg margr-10" to={PATH.PREVIEW}>
                            <span className="fa fa-play-circle"></span> Preview
                        </Link>
                        <button className="btn btn-danger btn-lg">
                            <span className="fa fa-book"></span> Publish
                        </button>
                    </div>
                </div>
                <div className="panel panel-primary">
                    <div className="panel-body">
                        <h3>Topic Details</h3>
                        <input
                            type="text"
                            className="form-control margb-10"
                            placeholder="Topic name"
                            defaultValue={this.props.topic.name}
                            onChange={ e => this.props.topic.name = e.target.value }/>
                        <textarea
                            type="text"
                            className="form-control margb-10"
                            placeholder="Description"
                            defaultValue={this.props.topic.description}
                            onChange={ e => this.props.topic.description = e.target.value }/>

                        { this.props.topic.sections && this.props.topic.sections.map( (section, i) =>
                            <div key={i}>
                                <div className="flex-row between">
                                    <h2>Section {i+1}</h2>
                                    <div className="btn-group dropdown">
                                        <button className="btn btn-link btn-lg dropdown-toggle"
                                           data-toggle="dropdown"
                                           role="button" aria-expanded="false">
                                            <span className="fa fa-ellipsis-v"></span>
                                        </button>
                                        <ul className="dropdown-menu" style={s.menu} role="menu">
                                            <li><a className="pointer"
                                                   onClick={this.handleClickMoveSectionUp.bind(this, i)}>
                                                Move Section Up
                                            </a>
                                            </li>
                                            <li><a className="pointer"
                                                   onClick={this.handleClickMoveSectionDown.bind(this, i)}>
                                                Move Section Down
                                            </a>
                                            </li>
                                            <li className="divider"></li>
                                            <li><a className="pointer"
                                                   onClick={this.handleClickRemoveSection.bind(this, i)}>
                                                Remove Section
                                            </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <text type="text"
                                       className="form-control margb-10"
                                       placeholder="Section title"
                                       defaultValue={this.props.topic.sections[i].title}
                                       onChange={ e => this.props.topic.sections[i].title = e.target.value }/>
                                <input
                                    type="text"
                                    className="form-control margb-10"
                                    placeholder="Source material"
                                    defaultValue={this.props.topic.sections[i].source}
                                    onChange={ e => this.props.topic.sections[i].source = e.target.value }/>
                                { section.questions.map( (question, j) =>
                                    <div key={j}>
                                        <div className="flex-row between">
                                            <h3>Question {j+1}</h3>
                                            <div className="dropdown">
                                                <button className="btn btn-link btn-lg dropdown-toggle"
                                                        data-toggle="dropdown"
                                                        role="button" aria-expanded="false">
                                                    <span className="fa fa-ellipsis-v"></span>
                                                </button>
                                                <ul className="dropdown-menu" style={s.menu} role="menu">
                                                    <li><a className="pointer"
                                                           onClick={this.handleClickMoveQuestionUp.bind(this, i, j)}>
                                                        Move Question Up
                                                    </a>
                                                    </li>
                                                    <li><a className="pointer"
                                                           onClick={this.handleClickMoveQuestionDown.bind(this, i, j)}>
                                                        Move Question Down
                                                        </a>
                                                    </li>
                                                    <li className="divider"></li>
                                                    <li><a className="pointer"
                                                            onClick={this.handleClickRemoveQuestion.bind(this, i, j)}>
                                                            Remove Question
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <textarea
                                            type="text"
                                            className="form-control margb-10"
                                            placeholder="Question"
                                            defaultValue={this.props.topic.sections[i].questions[j].question}
                                            onChange={ e => this.props.topic.sections[i].questions[j].question = e.target.value }/>
                                        <textarea
                                            type="text"
                                            className="form-control margb-10"
                                            placeholder="Correct answer"
                                            defaultValue={this.props.topic.sections[i].questions[j].answer}
                                            onChange={ e => this.props.topic.sections[i].questions[j].answer = e.target.value }/>
                                    </div>
                                )}
                                <button className="btn btn-info btn-lg margb-10 width-100pc"
                                        onClick={this.handleAddQuestionClick.bind(this, i)}>Add Question</button>
                            </div>
                        )}
                        <button className="btn btn-primary btn-lg width-100pc"
                                onClick={this.handleAddSectionClick.bind(this)} >Add Section</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapProps = state => {
    // create a copy that can be mutated without effecting the original
    if(state.user.topics[state.user.currentTopic]) {
        return {
            storeTopic: state.user.topics[state.user.currentTopic],
            topic: deepCopy(state.user.topics[state.user.currentTopic]),
        }
    }
    return {
        topic: {}
    }
};

export default connect(mapProps)(CreateTopic);