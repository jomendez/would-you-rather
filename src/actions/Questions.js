import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../data/_DATA';

export const QUESTIONS_REQUEST = 'QUESTIONS_REQUEST';
export const QUESTIONS_RECEIVE = 'QUESTIONS_RECEIVE';


export const REQUEST_ANSWER_UPDATE = 'REQUEST_ANSWER_UPDATE';
export const RESPONSE_ANSWER_UPDATE = 'RESPONSE_ANSWER_UPDATE';
export const REQUEST_SAVE_QUESTION = 'REQUEST_SAVE_QUESTION';
export const RESPONSE_SAVE_QUESTION = 'RESPONSE_SAVE_QUESTION';

export function requestQuestions() {
  return {
    type: QUESTIONS_REQUEST,
    isRetrieving: true
  }
}

export function receiveQuestions(questions) {
  return {
    type: QUESTIONS_RECEIVE,
    isRetrieving: false,
    questions
  }
}

export const fetchQuestions = () => dispatch => {
  dispatch(requestQuestions());
  return _getQuestions()
    .then(data => dispatch(receiveQuestions(data)));
}


export function requestAnswerUpdate() {
  return {
    type: REQUEST_ANSWER_UPDATE,
    isRetrieving: true
  }
}

export function receiveAnswerUpdate(authedUser, qid, answer) {
  return {
    type: RESPONSE_ANSWER_UPDATE,
    isRetrieving: false,
    authedUser,
    qid,
    answer
  }
}

export const updateAnswer = (authedUser, qid, answer) => dispatch => {
  dispatch(requestAnswerUpdate());
  let paramsObj = { authedUser, qid, answer };
  _saveQuestionAnswer(paramsObj);
  dispatch(receiveAnswerUpdate(authedUser, qid, answer));
}


export function requestSaveQuestion() {
  return {
    type: REQUEST_SAVE_QUESTION,
    isRetrieving: true
  }
}

export function receiveSaveQuestion(question) {
  return {
    type: RESPONSE_SAVE_QUESTION,
    isRetrieving: false,
    question
  }
}

export const saveQuestion = ({ optionOneText, optionTwoText, author }) => dispatch => {
  dispatch(requestSaveQuestion());

  return _saveQuestion({ optionOneText, optionTwoText, author })
    .then((resp) => dispatch(receiveSaveQuestion(resp))
    )
}
