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

    if (changes.name) {
        if (!model.name) {
            ++validator.count
            validator.errors.name = i18n.t('validation.required')
        }
    }

    if (changes.surname) {
        if (!model.surname) {
            ++validator.count
            validator.errors.surname = i18n.t('validation.required')
        }
    }

    if (changes.email) {
        if (!model.email) {
            ++validator.count
            validator.errors.email = i18n.t('validation.required')
        } else if (!EmailValidator.validate(model.email)) {
            ++validator.count
            validator.errors.email = i18n.t('validation.invalid_email')
        }
    }

    return validator
}