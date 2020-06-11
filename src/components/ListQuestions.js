import { AppBar, Tab, Tabs } from '@material-ui/core';
import React, { Component } from 'react';
import '../App.css';
import { getArrayFromDictionary, getUnansweredQuestions, sortAnswer, sortByPropDesc } from '../util/util';
import QuestionListItems from './QuestionListItems';
import TabPanel from './TabPanel';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTabValue: 0
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(event, newValue) {
    this.setState({ selectedTabValue: newValue });
  }


  render() {
    const { userAnswers, isAuthenticated, questions } = this.props;
    const questionArray = questions && getArrayFromDictionary(questions);
    const questionArraySorted = questions && sortByPropDesc(questionArray, 'timestamp');

    const unansweredQuestions = (getUnansweredQuestions(userAnswers, questions) &&
      sortAnswer(getUnansweredQuestions(userAnswers, questions), questionArraySorted)) || []
    const answeredQuestions = ((userAnswers && Object.keys(userAnswers)) &&
      sortAnswer(Object.keys(userAnswers), questionArraySorted)) || []

    return (
      <div>
        {isAuthenticated && (
          <div className="">
            <h1>Questions</h1>

            <AppBar position="static">
              <Tabs value={this.state.selectedTabValue} onChange={this.onChangeHandler} aria-label="simple tabs example">
                <Tab label="Unanswered Questions" {...a11yProps(0)} />
                <Tab label="Answered Questions" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={this.state.selectedTabValue} index={0}>
              <QuestionListItems questionsList={unansweredQuestions} questions={questions} />
            </TabPanel>
            <TabPanel value={this.state.selectedTabValue} index={1}>
              <QuestionListItems questionsList={answeredQuestions} questions={questions} />
            </TabPanel>
          </div>
        )}
      </div>
    )
  }
}

export default Questions;
