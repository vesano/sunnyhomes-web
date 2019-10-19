import {combineReducers} from 'redux'
import * as Action from '../actions'

const id = (prev = null, action) => {
  switch (action.type) {
    case Action.FETCH_SUCCESS:
    case Action.SAVE_SUCCESS:
      if (action.payload._id !== undefined) {
        return action.payload._id
      }
      return null
    default:
      return prev
  }
}

const arrival = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.payload.arrival !== undefined) {
        return action.payload.arrival
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.arrival !== undefined) {
        return action.payload.arrival
      }
      return prev
    default:
      return prev
  }
}

const departure = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.payload.departure !== undefined) {
        return action.payload.departure
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.departure !== undefined) {
        return action.payload.departure
      }
      return prev
    default:
      return prev
  }
}

const type = (prev = 'reservation', action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.payload.type !== undefined) {
        return action.payload.type
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.type !== undefined) {
        return action.payload.type
      }
      return prev
    default:
      return prev
  }
}

export default combineReducers({
  id,
  arrival,
  departure,
  type,
})