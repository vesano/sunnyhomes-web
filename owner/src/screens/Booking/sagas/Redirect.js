import {all, takeLatest, put} from 'redux-saga/effects'
import {replace} from 'connected-react-router'
import * as Actions from '../actions'
import * as Pages from '../../../router/Pages'

function* toCalendar() {
  yield put(replace(Pages.HOME))
}

export default function* sagas() {
  yield all([
    takeLatest([
      Actions.REMOVE_SUCCESS,
      Actions.SAVE_SUCCESS,
    ], toCalendar),
  ])
}
