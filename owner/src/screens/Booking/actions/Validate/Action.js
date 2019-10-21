import i18n from '../../../../i18n'
import moment from 'moment'

export default (model, changes) => {
  const validator = {
    count: 0,
    messages: [],
    errors: {}
  }

  if (!model.arrivalDate) {
    ++validator.count
    if (changes.arrivalDate) {
      validator.errors.arrivalDate = i18n.t('validation.required')
    }
  }

  if (!model.departureDate) {
    ++validator.count
    if (changes.departureDate) {
      validator.errors.departureDate = i18n.t('validation.required')
    }
  }

  if (model.departureDate && model.arrivalDate) {
    const date1 = moment(model.arrivalDate, 'YYYY-MM-DD')
    const date2 = moment(model.departureDate, 'YYYY-MM-DD')

    if (!date1.isBefore(date2)) {
      ++validator.count
      if (changes.departureDate) {
        validator.errors.departureDate = i18n.t('validation.booking_date_invalid')
      }
    }
  }

  return validator
}