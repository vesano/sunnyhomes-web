import {combineReducers} from 'redux'
import * as Action from '../actions'
import model from './model'

const serverErrors = (prev = [], action) => {
  switch (action.type) {
    case Action.SAVE_FAILURE:
      if (action.payload.data.message !== undefined) {
        return [
          action.payload.data.message
        ]
      }

      if (action.payload.data.validation_messages !== undefined) {

        if (action.payload.data.validation_messages.error !== undefined) {
          return [
            action.payload.data.validation_messages.error
          ]
        }

        const fields = Object.values(action.payload.data.validation_messages)

        let errors = []
        fields.forEach(field => {
          errors = [...errors, ...Object.values(field)]
        })

        return errors
      }

      return []
    case Action.SET_BOOKING:
    case Action.SAVE_SUCCESS:
    case Action.SAVE_BEFORE:
      return []
    default:
      return prev
  }
}

const isValid = (prev = false, action) => {
  switch (action.type) {
    case Action.VALIDATE_SUCCESS:
      return true
    case Action.VALIDATE_FAILURE:
    case Action.SAVE_FAILURE:
      return false
    default:
      return prev
  }
}

const initialValidator = {
  count: 0,
  messages: [],
  errors: {}
}
const validator = (prev = initialValidator, action) => {
  switch (action.type) {
    case Action.SET_BOOKING:
    case Action.VALIDATE_SUCCESS:
      return initialValidator
    case Action.VALIDATE_FAILURE:
      return action.payload
    default:
      return prev
  }
}

const changes = (prev = {}, action) => {
  switch (action.type) {
    case Action.SET_BOOKING:
      return {}
    case Action.MODEL_CHANGED:

      const changes = {...prev}

      Object.keys(action.payload).forEach(key => {
        changes[key] = true
      })

      return changes
    default:
      return prev
  }
}

export default combineReducers({
  isValid,
  validator,
  changes,
  model,
  serverErrors,
})

