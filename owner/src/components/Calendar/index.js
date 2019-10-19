import {Calendar, momentLocalizer} from 'react-big-calendar'
import React from 'react'
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './style.css'

const localizer = momentLocalizer(moment)

const MyCalendar = props => (
  <div className="calendar-container">
    <Calendar
      localizer={localizer}
      events={[]}
      step={60}
      showMultiDayTimes
    />
  </div>
)


export default MyCalendar