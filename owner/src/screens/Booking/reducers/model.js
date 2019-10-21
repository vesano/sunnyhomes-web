import {combineReducers} from 'redux'
import * as Action from '../actions'

const id = (prev = null, action) => {
  switch (action.type) {
    case Action.SET_BOOKING:
    case Action.SAVE_SUCCESS:
      if (action.payload.id !== undefined) {
        return action.payload.id
      }
      return null
    default:
      return prev
  }
}

const arrivalDate = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.SET_BOOKING:
      if (action.payload.arrivalDate !== undefined) {
        return action.payload.arrivalDate
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.arrivalDate !== undefined) {
        return action.payload.arrivalDate
      }
      return prev
    default:
      return prev
  }
}

const departureDate = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.SET_BOOKING:
      if (action.payload.departureDate !== undefined) {
        return action.payload.departureDate
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.departureDate !== undefined) {
        return action.payload.departureDate
      }
      return prev
    default:
      return prev
  }
}

export default combineReducers({
  id,
  arrivalDate,
  departureDate,
})