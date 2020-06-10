import { Button, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import '../App.css';
import { saveQuestion } from '../actions/Questions';

export class NewQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      optionOne: '',
      optionTwo: '',
      pollSubmitted: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    let value = event.target.value;
    let stateChange = {};
    stateChange[event.target.name] = value;
    this.setState(stateChange);
  }

  onSubmit(event, author) {
    event.preventDefault();
    const form = document.querySelector('.question-form')

    const optionOneText = this.state.optionOne;
    const optionTwoText = this.state.optionTwo;
    const question = { optionOneText, optionTwoText, author }
    this.props.saveQuestion(question);
    form.reset();
    this.setState({ pollSubmitted: true })
  }

  render() {
    const { login } = this.props;

    const isAuthenticated = (login && login.isAuthenticated) && login.isAuthenticated;
    const id = (login && login.isAuthenticated) && login.authenticatedUserId;

    return (
      <div>
        {isAuthenticated && (<h1>Add a Question</h1>)}

        {isAuthenticated && (
          <form className="question-form">
            <div className="input-text" >
              <TextField id="question-one" label="Question one" variant="outlined" type="text"
                name="optionOne"
                onChange={this.onChange}
              />
            </div>

            <div className="input-text" >
              <TextField id="question-two" label="Question two" variant="outlined"
                type="text"
                name="optionTwo"
                onChange={this.onChange}
              />
            </div>
            <Button size="large" variant="contained" color="primary"
              value="Save"
              onClick={(event) => this.onSubmit(event, id)}
              className="save-button"
              startIcon={<SaveIcon />}
            >Save</Button>
          </form>
        )}

        {!isAuthenticated && (
          <h3>You need to select a user to add a question.</h3>
        )}

        {this.state.pollSubmitted && (
          <Redirect to="/" />
        )}
      </div>
    )
  }
}

function mapStateToProps({ login }) {
  return {
    login
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveQuestion }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
