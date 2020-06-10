// sync actions for login
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export function receiveLogin(userId) {
  return {
    type: LOGIN,
    isAuthenticated: true,
    authenticatedUserId: userId
  }
}

export function receiveLogout() {
  return {
    type: LOGOUT,
    isAuthenticated: false,
    authenticatedUserId: null
  }
}
