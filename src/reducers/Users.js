import { RESPONSE_ANSWER_UPDATE, RESPONSE_SAVE_QUESTION } from '../actions/Questions';
import { REQUEST_USERS, RESPONSE_USERS } from '../actions/Users';

const initStateUsers = {
  users: {}
}

export function users(state = initStateUsers, action) {
  switch(action.type) {
    case REQUEST_USERS:
      return {
        ...state,
        isRetrieving: action.isRetrieving,
      }
    case RESPONSE_USERS:
      return {
        ...state,
        users: action.users,
      }
    case RESPONSE_ANSWER_UPDATE:
      return {
        ...state,
        users: {
          ...state.users,
          [action.authedUser]: {
            ...state.users[action.authedUser],
            answers: {
              ...state.users[action.authedUser].answers,
              [action.id]: action.answer
            }
          }
        }
      }
    case RESPONSE_SAVE_QUESTION:
      let uid = action.question.author;
      return {
        ...state,
        users: {
          ...state.users,
          [uid]: {
            ...state.users[uid],
            questions: (state.users[uid]['questions']).concat(action.question.id)
          }
        }
      }

    default:
      return state
  }
}
