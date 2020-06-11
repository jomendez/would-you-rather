import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { receiveLogin, receiveLogout } from './actions/Login';
import { fetchQuestions } from './actions/Questions';
import { fetchUsers } from './actions/Users';
import './App.css';
import DetailQuestion from './components/DetailQuestion';
import LeaderBoard from './components/LeaderBoard';
import Questions from './components/ListQuestions';
import Navbar from './components/Navbar';
import NewQuestion from './components/NewQuestion';
import NotFound from './components/NotFound';
import Login from './components/Login';
import NoMatch from './components/NoMatch';


export class App extends Component {
  constructor(props) {
    super(props);

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.logout = this.logout.bind(this);
  }


  state = {
    authenticatedUser: '',
    isAuthenticated: false,
    currentNav: '',
    currentLogin: ''
  }

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchQuestions();
  }

  onChangeHandler(ev) {
    let value = ev.target.value;
    let stateChange = {};
    stateChange[ev.target.name] = value;
    this.setState(stateChange, function () {
      if (this.state.authenticatedUser.length) {
        // change state to logged in
        this.props.receiveLogin(this.state.authenticatedUser);
      }
    });
  }

  logout(ev) {
    this.setState({ authenticatedUser: '' });
    this.props.receiveLogout();
  }

  render() {
    let isAuthenticated;
    let userDictionary;
    let questionDictionary;
    let userAnswers;
    let userQuestions;

    if (this.props.users && this.props.users.users) {
      userDictionary = this.props.users.users;
    }

    if (this.props.login) {
      isAuthenticated = this.props.login['isAuthenticated'];
      if (isAuthenticated) {
        let loggedInUid = this.state.authenticatedUser;

        if (this.props.questions && this.props.questions.questions) {
          questionDictionary = this.props.questions.questions;
          userAnswers = userDictionary[loggedInUid]['answers'];
          userQuestions = userDictionary[loggedInUid]['questions'];
        }
      }
    }

    return (
      <Router>
        <div className="App">
          <Navbar {...this.props} logout={this.logout} authenticatedUser={this.state.authenticatedUser} onChangeHandler={this.onChangeHandler} />

          <main>

            <Switch>
              {!this.state.authenticatedUser ? <Route component={Login} /> : null}


              <Route exact path="/" render={() => (
                <Questions isAuthenticated={isAuthenticated}
                  userQuestions={userQuestions}
                  userAnswers={userAnswers}
                  questions={questionDictionary}
                />
              )}
              />
              <Route exact path="/questions/:question_id" render={({ match }) => (
                <DetailQuestion match={match} userDictionary={userDictionary} />
              )}
              />
              <Route exact path="/add" render={() => (
                <NewQuestion />
              )}
              />
              <Route exact path="/leaderboard" render={() => (
                <LeaderBoard />
              )}
              />
              <Route exact path="/404" render={() => (
                <NotFound />
              )}
              />
              <Route component={NoMatch} />

            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ login, users, questions }) {
  return {
    login,
    users,
    questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchUsers,
    fetchQuestions,
    receiveLogin,
    receiveLogout
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
