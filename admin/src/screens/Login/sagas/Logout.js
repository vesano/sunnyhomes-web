import {all, takeEvery, select} from 'redux-saga/effects'
import Cookie from "js-cookie";

const delay = 30 * 60 * 1000 //30min

let timeoutId

function* logout() {

  const state = yield select()

  if (!state.App.isAuthenticated) return

  clearTimeout(timeoutId)

  timeoutId = setTimeout(() => {

    console.log('logout');

    Cookie.remove('token')

    window.location.reload()
  }, delay)

}

export default function* sagas() {
  yield all([
    takeEvery('*', logout),
  ])
}
