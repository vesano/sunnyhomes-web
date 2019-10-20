import i18n from '../../../../i18n'
import EmailValidator from 'email-validator'
import PasswordValidator from 'password-validator'

const passwordSchema = new PasswordValidator();

passwordSchema
  .is().min(8)
  .is().max(100)
  .has().not().spaces()

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

  if (!model.phoneMobile) {
    ++validator.count

    if (changes.phoneMobile) {
      validator.errors.phoneMobile = i18n.t('validation.required')
    }
  }

  if (!model.phoneLandline) {
    ++validator.count

    if (changes.phoneLandline) {
      validator.errors.phoneLandline = i18n.t('validation.required')
    }
  }

  if (model.address) {

    if (!model.address.country) {
      ++validator.count

      if (changes.address) {
        validator.errors.addressCountry = i18n.t('validation.required')
      }
    }

    if (!model.address.city) {
      ++validator.count

      if (changes.address) {
        validator.errors.addressCity = i18n.t('validation.required')
      }
    }

    if (!model.address.address) {
      ++validator.count

      if (changes.address) {
        validator.errors.addressAddress = i18n.t('validation.required')
      }
    }
  }

  if (model.property) {

    if (!model.property.id) {
      ++validator.count

      if (changes.property) {
        validator.errors.propertyId = i18n.t('validation.required')
      }
    }

    if (!model.property.name) {
      ++validator.count

      if (changes.property) {
        validator.errors.propertyName = i18n.t('validation.required')
      }
    }
  }

  if (model.password1 && model.password2) {

    if (!passwordSchema.validate(model.password1)) {
      ++validator.count

      if (changes.password1) {
        validator.errors.password1 = i18n.t('validation.weak_password1')
      }
    }

    if (model.password1 !== model.password2) {
      ++validator.count

      if (changes.password2) {
        validator.errors.password2 = i18n.t('validation.password_mismatch')
      }
    }
  }

  return validator
}