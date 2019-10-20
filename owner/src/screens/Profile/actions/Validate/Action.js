import i18n from '../../../../i18n'
import EmailValidator from 'email-validator'

export default (model, changes) => {
  const validator = {
    count: 0,
    messages: [],
    errors: {}
  }

  if (!model.name) {
    ++validator.count
    if (changes.name) {
      validator.errors.name = i18n.t('validation.required')
    }
  }

  if (!model.surname) {
    ++validator.count
    if (changes.surname) {
      validator.errors.surname = i18n.t('validation.required')
    }
  }

  if (!model.email) {
    ++validator.count
    if (changes.email) {
      validator.errors.email = i18n.t('validation.required')
    }
  } else if (!EmailValidator.validate(model.email)) {
    ++validator.count
    if (changes.email) {
      validator.errors.email = i18n.t('validation.invalid_email')
    }
  }

  if (!model.phoneLandline) {
    ++validator.count
    if (changes.phoneLandline) {
      validator.errors.phoneLandline = i18n.t('validation.required')
    }
  }

  if (!model.phoneMobile) {
    ++validator.count
    if (changes.phoneMobile) {
      validator.errors.phoneMobile = i18n.t('validation.required')
    }
  }

  if (model.address) {

    if (!model.address.country) {
      ++validator.count
      if (changes.address) {
        validator.errors.country = i18n.t('validation.required')
      }
    }

    if (!model.address.city) {
      ++validator.count
      if (changes.address) {
        validator.errors.city = i18n.t('validation.required')
      }
    }

    if (!model.address.address) {
      ++validator.count
      if (changes.address) {
        validator.errors.address = i18n.t('validation.required')
      }
    }
  }

  return validator
}