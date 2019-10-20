import {all, put, select, takeEvery} from 'redux-saga/effects'
import {FILTER_CHANGED} from '../actions'
import FetchAction from '../actions/Fetch'

function* fetch({payload}) {
    const Owners = yield select(store => store.Owners)

    const page = payload.page || Owners.page
    const limit = payload.limit || Owners.limit

    yield put(FetchAction(page, limit))
}

export default function* sagas() {
    yield all([
        takeEvery(FILTER_CHANGED, fetch)
    ])
}
