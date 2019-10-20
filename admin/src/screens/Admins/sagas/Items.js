import {all, put, select, takeEvery} from 'redux-saga/effects'
import {FILTER_CHANGED} from '../actions'
import FetchAction from '../actions/Fetch'

function* fetch({payload}) {
    const Admins = yield select(store => store.Admins)

    const page = payload.page || Admins.page
    const limit = payload.limit || Admins.limit

    yield put(FetchAction(page, limit))
}

export default function* sagas() {
    yield all([
        takeEvery(FILTER_CHANGED, fetch)
    ])
}
