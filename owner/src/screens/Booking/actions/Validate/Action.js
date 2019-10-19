import i18n from '../../../../i18n'

export default (model, changes) => {
  const validator = {
    count: 0,
    messages: [],
    errors: {}
  }

  if (changes.arrival) {
    if (!model.arrival) {
      ++validator.count
      validator.errors.arrival = i18n.t('validation.required')
    }
  }

  if (changes.departure) {
    if (!model.departure) {
      ++validator.count
      validator.errors.departure = i18n.t('validation.required')
    }
  }

  if (changes.type) {
    if (!model.type) {
      ++validator.count
      validator.errors.type = i18n.t('validation.required')
    }
  }

  return validator
}