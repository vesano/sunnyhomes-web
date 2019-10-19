import {combineReducers} from 'redux'
import * as Action from '../actions'

const isLoading = (prev = false, action) => {
  switch (action.type) {
    case Action.FETCH_FAILURE:
    case Action.FETCH_SUCCESS:
    case Action.SAVE_SUCCESS:
    case Action.SAVE_FAILURE:
      return false
    case Action.FETCH_BEFORE:
    case Action.SAVE_BEFORE:
      return true
    default:
      return prev
  }
}

export default combineReducers({
  isLoading,
})

