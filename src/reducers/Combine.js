import { combineReducers } from 'redux';
import { login } from './Login';
import { questions } from './Questions';
import { users } from './Users';

export default combineReducers({
  login,
  questions,
  users,
});
