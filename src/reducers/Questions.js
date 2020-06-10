import { QUESTIONS_RECEIVE, QUESTIONS_REQUEST, REQUEST_ANSWER_UPDATE, REQUEST_SAVE_QUESTION, RESPONSE_ANSWER_UPDATE, RESPONSE_SAVE_QUESTION } from '../actions/Questions';

const initStateQuestions = {
  questions: {}
}

export function questions(state = initStateQuestions, action) {
  switch(action.type) {
    case QUESTIONS_REQUEST:
      return {
        ...state,
        isRetrieving: action.isRetrieving,
      }
    case QUESTIONS_RECEIVE:
      return {
        ...state,
        isRetrieving: action.isRetrieving,
        questions: action.questions,
      }
    case REQUEST_ANSWER_UPDATE:
      return {
        ...state,
        isRetrieving: action.isRetrieving,
      }
    case RESPONSE_ANSWER_UPDATE:
      return {
        ...state,
        isRetrieving: action.isRetrieving,
        questions: {...state.questions,
          [action.qid]: {
            ...state.questions[action.qid],
            [action.answer]: {
              ...state.questions[action.qid][action.answer],
              votes: state.questions[action.qid][action.answer].votes.concat([action.authedUser])
          }
        }
        },
      }
    case REQUEST_SAVE_QUESTION:
      return {
        ...state,
        isRetrieving: action.isRetrieving,
      }
    case RESPONSE_SAVE_QUESTION:
      return {
        ...state,
        isRetrieving: action.isRetrieving,
        questions: {
          ...state.questions,
          [action.question.id]: action.question
        }
      }

    default:
      return state
  }
}
