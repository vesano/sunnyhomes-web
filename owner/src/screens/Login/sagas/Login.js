import {all, takeLatest, put} from 'redux-saga/effects'
import {replace} from 'connected-react-router'
import Cookie from 'js-cookie'
import * as Actions from '../actions'
import * as Pages from '../../../router/Pages'

function* saveToken({payload}) {

    Cookie.set('token', payload.token)

    yield put(replace(Pages.HOME))
}

function* removeToken() {

    Cookie.remove('token')

    yield put(replace(Pages.LOGIN))
}

export default function* sagas() {
    yield all([

        takeLatest([
            Actions.LOGIN_SUCCESS,
            Actions.LOGIN_CHECK_SUCCESS,
        ], saveToken),

        takeLatest([
            Actions.LOGOUT,
            Actions.LOGIN_CHECK_FAILURE,
        ], removeToken)
    ])
}
