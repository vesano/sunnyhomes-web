import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {MODEL_CHANGED} from '../actions';
import DatePicker from '../../../components/Date';
import Save from '../actions/Save';
import Remove from '../actions/Remove';
import i18n from '../../../i18n';
import * as Pages from '../../../router/Pages';
import {Link, withRouter} from "react-router-dom";
import {createStructuredSelector} from "reselect";

class Booking extends React.Component {

  remove = () => {
    const {model} = this.props.Booking

    this.props.dispatch(Remove(model.id))
  }

  submit = () => {
    const {model} = this.props.Booking

    this.props.dispatch(Save(model))
  }

  change = (key, value = null) => this.props.dispatch({
    type: MODEL_CHANGED,
    payload: {
      [key]: value
    }
  })

  changeDate = name => value => this.change(name, value)

  getError = key => {
    const {errors} = this.props.Booking.validator

    if (errors[key] === undefined) return null

    return <small className="feedback invalid-feedback d-block">{errors[key]}</small>
  }

  render() {

    const {
      model,
      isValid,
      isLoading,
      serverErrors,
    } = this.props.Booking

    let minDeparture
    if (model.arrivalDate) {
      minDeparture = moment(model.arrivalDate, 'YYYY-MM-DD 00:00:00').add(1, 'day').toDate()
    } else {
      minDeparture = moment(new Date(), 'YYYY-MM-DD 00:00:00').add(1, 'day').toDate()
    }

    return <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm my-3">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h3 className="m-0">{i18n.t('booking.title')}</h3>
                </div>
                <div className="col-12 col-md-auto text-right">

                  <Link className="btn btn-outline-primary transition-3d-hover mr-1" to={Pages.HOME}>
                    <i className="fa fa-ban"/>&nbsp;{i18n.t('booking.cancel_action')}
                  </Link>

                  {model.id && <button className="btn btn-danger transition-3d-hover mr-1"
                                       type="button"
                                       onClick={this.remove}
                                       disabled={isLoading}>
                    <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-times"}/>
                    &nbsp;{i18n.t('booking.remove_action')}
                  </button>}

                  {!model.id && <button className="btn btn-primary transition-3d-hover"
                                        type="button"
                                        onClick={this.submit}
                                        disabled={isLoading || !isValid}>
                    <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-check"}/>
                    &nbsp;{i18n.t('booking.create_action')}
                  </button>}

                </div>
              </div>
            </div>
            <div className="card-body">

              {serverErrors.length > 0 && <div className="alert alert-danger">
                <ul className="simple">{serverErrors.map((e, i) => <li key={i}>{e}</li>)}</ul>
              </div>}

              <div className="row">
                <div className="col-12 col-md-8 col-lg-6 mx-auto">

                  <div className="form-group">
                    <label className="m-0">{i18n.t('booking.arrivalDate')}</label>
                    <DatePicker
                      minDate={moment(new Date(), 'YYYY-MM-DD 00:00:00').toDate()}
                      onChange={this.changeDate('arrivalDate')}
                      value={model.arrivalDate || ''}/>
                    {this.getError('arrivalDate')}
                  </div>

                  <div className="form-group">
                    <label className="m-0">{i18n.t('booking.departureDate')}</label>
                    <DatePicker
                      minDate={minDeparture}
                      onChange={this.changeDate('departureDate')}
                      value={model.departureDate || ''}/>
                    {this.getError('departureDate')}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

const selectors = createStructuredSelector({
  Booking: store => store.Booking,
})

export default withRouter(
  connect(selectors)(Booking)
)
