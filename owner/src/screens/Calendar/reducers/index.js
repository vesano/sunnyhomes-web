import {combineReducers} from 'redux'
import * as Action from '../actions'
import moment from 'moment'

const events = (prev = [], action) => {
  switch (action.type) {
    case Action.FETCH_SUCCESS:
      return action.payload.bookings.map(item => {

        return {
          title: item.type,
          start: moment(item.arrival, 'YYYY-MM-DD'),
          end: moment(item.departure, 'YYYY-MM-DD'),
          allDay: false,
          resource: item
        }
      })
    default:
      return prev
  }
}

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
  events,
})

