import React from 'react';
import {connect} from 'react-redux';
import Calendar from '../../../components/Calendar';
import moment from 'moment';
import i18n from '../../../i18n';
import FetchAction from '../actions/Fetch';
import * as Pages from '../../../router/Pages';
import {createStructuredSelector} from "reselect";
import {replace} from 'connected-react-router'
import {SET_BOOKING} from "../../Booking/actions";

class MyCalendar extends React.Component {

  componentDidMount() {
    this.props.dispatch(FetchAction())
  }

  onSelectEvent = e => {

    const model = {
      id: e.resource.id,
      arrivalDate: e.resource.arrival,
      departureDate: e.resource.departure,
    }

    this.openBooking(model)()
  }

  createEvent = e => {

    let start = e.start
    let end = e.end

    if (start === end) {
      end = null
    } else {
      end = moment(end).format('YYYY-MM-DD')
    }

    start = moment(start).format('YYYY-MM-DD')

    const model = {
      arrivalDate: start,
      departureDate: end,
    }

    this.openBooking(model)()
  }

  openBooking = payload => () => {

    this.props.dispatch({
      type: SET_BOOKING,
      payload
    })

    this.props.dispatch(
      replace(Pages.BOOKING_EDIT)
    )
  }

  render() {

    const {events} = this.props.Calendar

    return <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm my-3">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h3 className="m-0">{i18n.t('calendar.title')}</h3>
                </div>
                <div className="col-12 col-md-auto text-right">
                  <button className="btn btn-primary"
                          onClick={this.openBooking({})}>
                    <i className="fa fa-plus"/>&nbsp;{i18n.t('calendar.action')}
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">

              <Calendar
                views={['month']}
                events={events}
                selectable={true}
                onSelectSlot={this.createEvent}
                onSelectEvent={this.onSelectEvent}/>

            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

const selectors = createStructuredSelector({
  Calendar: store => store.Calendar,
})

export default connect(selectors)(MyCalendar)
