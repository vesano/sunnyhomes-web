import {all, takeLatest} from 'redux-saga/effects'
import * as Actions from '../actions'
import {toast} from 'react-toastify';
import i18n from '../../../i18n'

function alertSuccess() {
  toast.success(i18n.t('notification.save_success'), {
    position: toast.POSITION.TOP_RIGHT,
  });
}

function alertRemoveSuccess() {
  toast.success(i18n.t('notification.remove_success'), {
    position: toast.POSITION.TOP_RIGHT,
  });
}

export default function* sagas() {
  yield all([
    takeLatest(Actions.SAVE_SUCCESS, alertSuccess),

    takeLatest(Actions.REMOVE_SUCCESS, alertRemoveSuccess),
  ])
}
