import { _getUsers } from '../data/_DATA';

export const REQUEST_USERS = 'REQUEST_USERS';
export const RESPONSE_USERS = 'RESPONSE_USERS';

export function requestUsers() {
  return {
    type: REQUEST_USERS,
    isRetrieving: true
  }
}

export function receiveUsers(users) {
  return {
    type: RESPONSE_USERS,
    isRetrieving: false,
    users
  }
}

export const fetchUsers = () => dispatch => {
  dispatch(requestUsers());

  return _getUsers()
          .then(data => dispatch(receiveUsers(data)));
}
