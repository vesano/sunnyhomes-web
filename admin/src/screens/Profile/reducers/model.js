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

const email = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.payload.email !== undefined) {
        return action.payload.email
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.email !== undefined) {
        return action.payload.email
      }
      return prev
    default:
      return prev
  }
}

const name = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.payload.name !== undefined) {
        return action.payload.name
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.name !== undefined) {
        return action.payload.name
      }
      return prev
    default:
      return prev
  }
}

const surname = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.payload.surname !== undefined) {
        return action.payload.surname
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.surname !== undefined) {
        return action.payload.surname
      }
      return prev
    default:
      return prev
  }
}
const password1 = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.password1 !== undefined) {
        return action.payload.password1
      }
      return prev
    default:
      return prev
  }
}

const password2 = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.password2 !== undefined) {
        return action.payload.password2
      }
      return prev
    default:
      return prev
  }
}


export default combineReducers({
  id,
  email,
  name,
  surname,
  password1,
  password2,
})