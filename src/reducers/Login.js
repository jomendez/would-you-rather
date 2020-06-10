import { LOGIN, LOGOUT } from '../actions/Login';

const initialStateLogin = {
  isAuthenticated: false,
  authenticatedUserId: null,
}

export function login(state = initialStateLogin, action) {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        authenticatedUserId: action.authenticatedUserId,
      }
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        authenticatedUserId: action.authenticatedUserId,
      }
    default:
      return state
  }
}
