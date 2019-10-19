import React from 'react';
import {connect} from 'react-redux';
import Calendar from '../../../components/Calendar';
import i18n from '../../../i18n';
import FetchAction from '../actions/Fetch';
import * as Pages from '../../../router/Pages';
import {Link} from "react-router-dom";
import {createStructuredSelector} from "reselect";
import {replace} from 'connected-react-router'

class MyCalendar extends React.Component {

  componentDidMount() {
    this.props.dispatch(FetchAction())
  }

  onSelectEvent = (e) => {

    console.log(e);

    this.props.dispatch(
      replace(Pages.BOOKING_EDIT.replace(':id', e.resource.id))
    )
  }

  render() {

    const {isLoading, events} = this.props.Calendar

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
                  <Link className="btn btn-primary" to={Pages.BOOKING_NEW}>
                    <i className="fa fa-plus"/>&nbsp;{i18n.t('calendar.action')}
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body">

              <Calendar
                events={events}
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
