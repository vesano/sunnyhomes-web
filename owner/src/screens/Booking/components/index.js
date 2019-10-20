import React from 'react';
import {connect} from 'react-redux';
import {MODEL_CHANGED} from '../actions';
import FetchAction from '../actions/Fetch';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import * as Pages from '../../../router/Pages';
import {Link, withRouter} from "react-router-dom";
import {createStructuredSelector} from "reselect";

class Booking extends React.Component {

  componentDidMount() {
    const {id} = this.props.match.params

    if (id)
      this.props.dispatch(FetchAction(id))
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

  changeString = name => e => this.change(name, e.target.value)

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

                  <button className="btn btn-primary transition-3d-hover"
                          type="button"
                          onClick={this.submit}
                          disabled={true}>
                    <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-check"}/>
                    &nbsp;{i18n.t('booking.action')}
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">

              {serverErrors.length > 0 && <div className="alert alert-danger">
                <ul className="simple">{serverErrors.map((e, i) => <li key={i}>{e}</li>)}</ul>
              </div>}

              <div className="mb-4">
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="form-group">
                      <label className="m-0">{i18n.t('booking.arrival')}</label>
                      <input type="text"
                             className="form-control"
                             onChange={this.changeString('arrival')}
                             value={model.arrival || ''}/>
                      {this.getError('arrival')}
                    </div>
                  </div>
                  <div className="col-12 col-md-4">

                    <div className="form-group">
                      <label className="m-0">{i18n.t('booking.departure')}</label>
                      <input type="text"
                             className="form-control"
                             onChange={this.changeString('departure')}
                             value={model.departure || ''}/>
                      {this.getError('departure')}
                    </div>
                  </div>
                  <div className="col-12 col-md-4">

                    <div className="form-group">
                      <label className="m-0">{i18n.t('booking.type')}</label>
                      <input type="text"
                             className="form-control"
                             onChange={this.changeString('type')}
                             value={model.type || ''}/>
                      {this.getError('type')}
                    </div>
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
