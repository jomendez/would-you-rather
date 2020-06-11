import { Avatar, Card, CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { fetchQuestions, updateAnswer } from '../actions/Questions'
import '../App.css'
import { getPercentVoted } from '../util/util'

export class DetailQuestion extends Component {
  constructor(props) {
    super(props)
    this.onOptionSelected = this.onOptionSelected.bind(this)
  }
  questionAnswered = false
  selectOptionOne = false
  selectOptionTwo = false

  state = {
    optionSelected: '',
  }

  componentDidMount() {
    this.props.fetchQuestions()
  }

  onOptionSelected(uid, questionId, answer) {
    if (!this.questionAnswered) {
      this.setState({ optionSelected: answer })
    }
    this.props.fetchQuestions().then(() => {
      if (this.questionAnswered) {
        return
      }
      this.props.updateAnswer(uid, questionId, answer)
    })
  }

  render() {
    const { login, questions, match, userDictionary } = this.props
    const questionId = match.params.question_id
    const totalUsers = Object.keys(userDictionary).length

    const isAuthenticated = (login && login.isAuthenticated) && login.isAuthenticated
    const authenticatedUserId = (login && login.isAuthenticated) && login.authenticatedUserId
    const question = (questions && questions.questions) && questions.questions[questionId]

    if (!question) {
      return (<div></div>)
    }

    const optionOneVotes = question.optionOne.votes.length
    const optionOneText = question.optionOne.text
    const optionOneVotePercent = getPercentVoted(optionOneVotes, totalUsers)
    const optionTwoText = question.optionTwo.text
    const optionTwoVotes = question.optionTwo.votes.length
    const optionTwoVotePercent = getPercentVoted(optionTwoVotes, totalUsers)
    const authorId = question.author
    const avatarUrl = (userDictionary[authorId]) && userDictionary[authorId].avatarURL

    if (isAuthenticated && question) {
      const userAnsweredQuestions = Object.keys(userDictionary[authenticatedUserId]['answers'])

      const answeredQuestionsId = userDictionary[authenticatedUserId]['answers']
      if (answeredQuestionsId[questionId]) {
        this.selectOptionOne = answeredQuestionsId[questionId] === "optionOne"
        this.selectOptionTwo = answeredQuestionsId[questionId] === "optionTwo"
      }

      if (userAnsweredQuestions.indexOf(questionId) > -1) {
        this.questionAnswered = true
      } else {
        this.questionAnswered = false
        this.selectOptionOne = false
        this.selectOptionTwo = false
      }
    }

    return (
      <div className="">

        {isAuthenticated && (
          <div>
            <div className="avatar-text">
              <Avatar alt="avatar" src={avatarUrl} />
              {!this.questionAnswered && (
                <h3> Would You Rather?</h3>
              )}
              {this.questionAnswered && (
                <h3>Users Answered</h3>
              )}
            </div>

            <div className="answer-card-row">

              <div className="answer-card" >
                <Card onClick={(event) => this.onOptionSelected(authenticatedUserId, questionId, 'optionOne')}
                  className={(this.state.optionSelected === 'optionOne' || this.selectOptionOne) ? 'card-selected' : ''}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        1:
                    </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {optionOneText}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    {this.questionAnswered && (
                      <div>
                        <div className="">{optionOneVotes} votes</div>
                        <div className="">{optionOneVotePercent} % voted</div>
                      </div>
                    )}
                  </CardActions>
                </Card>
              </div>

              <div className="answer-card" >
                <Card onClick={(event) => this.onOptionSelected(authenticatedUserId, questionId, 'optionTwo')}
                  className={(this.state.optionSelected === 'optionTwo' || this.selectOptionTwo) ? 'card-selected' : ''}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        2:
                    </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {optionTwoText}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    {this.questionAnswered && (
                      <div>
                        <div className="">{optionTwoVotes} votes</div>
                        <div className="">{optionTwoVotePercent} % voted</div>
                      </div>
                    )}
                  </CardActions>
                </Card>
              </div>
            </div>
          </div>
        )}

        {isAuthenticated && !question && (
          <Redirect to="/404" />
        )}
      </div>
    )
  }
}

function mapStateToProps({ login, questions }) {
  return {
    login,
    questions
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchQuestions, updateAnswer }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailQuestion)
