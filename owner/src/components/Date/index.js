import 'react-datepicker/dist/react-datepicker.min.css'
import './style.css'

import React from 'react'
import moment from 'moment'
import PropType from 'prop-types'

import Date from 'react-datepicker'
import i18n from '../../i18n'

class DateWrapper extends React.Component {

  onChange = date => {
    let value = null

    if (date) {
      value = moment(date).format('YYYY-MM-DD')
    }

    this.props.onChange(value)
  }

  render() {
    return <Date
      locale="en"
      closeOnSelect={true}
      viewMode="days"
      placeholderText={i18n.t('placeholder.date')}
      dateFormat={'dd-mm-yyyy'}
      className="form-control"
      {...this.props}
      onChange={this.onChange}/>
  }
}

DateWrapper.propTypes = {
  value: PropType.any,
  onChange: PropType.func.isRequired,
}

export default DateWrapper