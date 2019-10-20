import i18n from '../../../../i18n'

export default (model, changes) => {
  const validator = {
    count: 0,
    messages: [],
    errors: {}
  }

  if (!model.arrival) {
    ++validator.count
    if (changes.arrival) {
      validator.errors.arrival = i18n.t('validation.required')
    }
  }

  if (!model.departure) {
    ++validator.count
    if (changes.departure) {
      validator.errors.departure = i18n.t('validation.required')
    }
  }

  if (!model.type) {
    ++validator.count
    if (changes.type) {
      validator.errors.type = i18n.t('validation.required')
    }
  }

  return validator
}