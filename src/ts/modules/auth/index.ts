import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { asyncFactory } from 'typescript-fsa-redux-thunk'

import * as api from '~/api'
import { IUser } from '~/models'
import { IRootState } from '~/modules'

// State
// ==================================================================
export interface IAuthState {
  isAuthenticated: boolean
  accessToken: string,
  user: IUser | null
}

const createInitialState = (): IAuthState => {
  return {
    isAuthenticated: false,
    accessToken: '',
    user: null
  }
}

// Prepare
// ==================================================================
const actionCreator = actionCreatorFactory('auth')
const createAsync = asyncFactory<IRootState>(actionCreator)
export const reducer = reducerWithInitialState<IAuthState>(createInitialState())

// Action - Login
// ==================================================================
interface ICredential {
  username: string
  password: string
}

interface IUserAndAccessToken {
  accessToken: string
  user: IUser
}

export const login = createAsync<ICredential, IUserAndAccessToken>(
  'LOGIN',
  async ({ username, password }, dispatch, getState) => {
    // TODO: Error handling
    const response = await api.login({ username, password })
    localStorage.setItem('access_token', response.jwt);
    return {
      accessToken: response.jwt,
      user: response.data
    }
  }
)

reducer.case(login.async.started, (state): IAuthState => {
  console.debug('Start login...')
  return { ...state }
})

reducer.case(login.async.failed, (state, { error }): IAuthState => {
  return { ...state }
})

reducer.case(login.async.done, (state, { result: {accessToken, user} }): IAuthState => {
  console.debug('Logged in!!!', { ...state, accessToken, user })
  return {
    ...state,
    isAuthenticated: true,
    accessToken,
    user
  }
})

// Action - Check Loggedin
// ==================================================================
export const checkLoggedin = createAsync<never, IUserAndAccessToken>(
  'CHECK_LOGIN',
  async (params, dispatch, getState) => {
    const { auth } = getState()
    if (auth.isAuthenticated && auth.user) {
      return {
        accessToken: auth.accessToken,
        user: auth.user
      }
    }

    // TODO: Error handling
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      throw 'Access token is not found.'
    }

    // TODO: Error handling
    const response = await api.getUser(accessToken)
    return {
      accessToken: accessToken,
      user: response.data
    }
  }
)

reducer.case(checkLoggedin.async.started, (state): IAuthState => {
  console.debug('Start check login...')
  return { ...state }
})

reducer.case(checkLoggedin.async.failed, (state, { error }): IAuthState => {
  return { ...state }
})

reducer.case(checkLoggedin.async.done, (state, { result: {accessToken, user} }): IAuthState => {
  console.debug('Logged in!!!', { ...state, accessToken, user })
  return {
    ...state,
    isAuthenticated: true,
    accessToken,
    user
  }
})

// Action - Logout
// ==================================================================
export const logout = createAsync<void, void>(
  'LOGOUT',
  async (params, dispatch) => {
    await api.logout()
  }
)
