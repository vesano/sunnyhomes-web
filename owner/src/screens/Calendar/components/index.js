import React from 'react';
import {connect} from 'react-redux';
import Calendar from '../../../components/Calendar';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";

class MyCalendar extends React.Component {

  render() {

    const {
      isLoading,
    } = this.props.Calendar

    return <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm my-3">
            <div className="card-header">
              <h3 className="m-0">{i18n.t('calendar.title')}</h3>
            </div>
            <div className="card-body">

              <Calendar/>

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
