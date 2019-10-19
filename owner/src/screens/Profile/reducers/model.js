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

const phoneLandline = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.payload.phoneLandline !== undefined) {
        return action.payload.phoneLandline
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.phoneLandline !== undefined) {
        return action.payload.phoneLandline
      }
      return prev
    default:
      return prev
  }
}
const phoneMobile = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.payload.phoneMobile !== undefined) {
        return action.payload.phoneMobile
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.phoneMobile !== undefined) {
        return action.payload.phoneMobile
      }
      return prev
    default:
      return prev
  }
}

const address = (prev = {}, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.payload.address !== undefined) {
        return action.payload.address
      }
      return {}
    case Action.MODEL_CHANGED:
      if (action.payload.address !== undefined) {
        return {
          ...prev,
          ...action.payload.address
        }
      }
      return prev
    default:
      return prev
  }
}

const property = (prev = {}, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.payload.property !== undefined) {
        return action.payload.property
      }
      return {}
    case Action.MODEL_CHANGED:
      if (action.payload.property !== undefined) {
        return {
          ...prev,
          ...action.payload.property
        }
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
  phoneLandline,
  phoneMobile,
  address,
  property,
})