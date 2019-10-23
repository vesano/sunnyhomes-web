import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import * as Pages from '../../../router/Pages';
import {FETCH_SUCCESS, MODEL_CHANGED} from '../actions';
import FetchOwner from '../actions/Fetch';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import PhoneInput from "../../../components/PhoneInput";
import Remove from "../actions/Remove";

class OwnerEdit extends React.Component {

  componentDidMount() {
    const {id} = this.props.match.params

    if (id) {
      this.props.dispatch(FetchOwner(id))
    } else {
      this.props.dispatch({
        type: FETCH_SUCCESS,
        payload: {}
      })
    }
  }

  remove = () => {
    const {model} = this.props.OwnerEdit

    this.props.dispatch(Remove(model.id))
  }

  submit = () => {
    const {model} = this.props.OwnerEdit

    this.props.dispatch(Save(model))
  }

  change = (key, value = null) => this.props.dispatch({
    type: MODEL_CHANGED,
    payload: {
      [key]: value
    }
  })

  changeString = name => e => this.change(name, e.target.value)

  changeAddressString = key => e => this.props.dispatch({
    type: MODEL_CHANGED,
    payload: {
      address: {
        [key]: e.target.value
      }
    }
  })

  changeProperty = key => e => this.props.dispatch({
    type: MODEL_CHANGED,
    payload: {
      property: {
        [key]: e.target.value
      }
    }
  })

  changePhone = (name) => (value, code, isValid) => this.change(name, value)

  getError = key => {
    const {errors} = this.props.OwnerEdit.validator

    if (errors[key] === undefined) return null

    return <small className="feedback invalid-feedback d-block">{errors[key]}</small>
  }

  render() {

    const {
      model,
      isValid,
      isLoading,
      serverErrors,
    } = this.props.OwnerEdit

    let title = i18n.t('owner_edit.title')
    if (model.id) {
      title = `${model.email}`
    }

    return <div className="row">
      <div className="col-12">

        <div className="card shadow-sm my-3">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="m-0">{title}</h3>
              </div>
              <div className="col-12 col-lg-auto text-right">

                <Link to={Pages.OWNERS} className="btn btn-sm btn-outline-primary transition-3d-hover mr-1">
                  <i className="fa fa-ban"/>&nbsp;{i18n.t('owner_edit.cancel_action')}
                </Link>

                {model.id && <button
                  className="btn btn-sm btn-danger transition-3d-hover mr-1"
                  type="button"
                  onClick={this.remove}
                  disabled={isLoading}>
                  <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-times"}/>
                  &nbsp;{i18n.t('owner_edit.remove_action')}
                </button>}

                <button className="btn btn-sm btn-primary transition-3d-hover"
                        type="button"
                        onClick={this.submit}
                        disabled={isLoading || !isValid}>
                  <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-check"}/>
                  &nbsp;{i18n.t('owner_edit.save_action')}
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">

            {serverErrors.length > 0 && <div className="alert alert-danger">
              <ul className="simple">{serverErrors.map((e, i) => <li key={i}>{e}</li>)}</ul>
            </div>}

            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label className="m-0 required">{i18n.t('owner_edit.email')}</label>
                  <input type="email"
                         name="email"
                         className="form-control"
                         onChange={this.changeString('email')}
                         value={model.email || ''}/>
                  {this.getError('email')}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label className="m-0">{i18n.t('owner_edit.name')}</label>
                  <input type="text"
                         name="name"
                         className="form-control"
                         onChange={this.changeString('name')}
                         value={model.name || ''}/>
                  {this.getError('name')}
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label className="m-0">{i18n.t('owner_edit.surname')}</label>
                  <input type="text"
                         name="surname"
                         className="form-control"
                         onChange={this.changeString('surname')}
                         value={model.surname || ''}/>
                  {this.getError('surname')}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="m-0">{i18n.t('owner_edit.phoneLandline')}</label>
                    <PhoneInput
                      fieldId="owner_edit.phoneLandline"
                      className="form-control"
                      onChange={this.changePhone('phoneLandline')}
                      value={model.phoneLandline || ''}/>
                    {this.getError('phoneLandline')}
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="m-0">{i18n.t('owner_edit.phoneMobile')}</label>
                    <PhoneInput
                      fieldId="owner_edit.phoneMobile"
                      className="form-control"
                      onChange={this.changePhone('phoneMobile')}
                      value={model.phoneMobile || ''}/>
                    {this.getError('phoneMobile')}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="m-0">{i18n.t('owner_edit.address.country')}</label>
                    <input type="text"
                           className="form-control"
                           onChange={this.changeAddressString('country')}
                           value={model.address.country || ''}/>
                    {this.getError('addressCountry')}
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="m-0">{i18n.t('owner_edit.address.city')}</label>
                    <input type="text"
                           className="form-control"
                           onChange={this.changeAddressString('city')}
                           value={model.address.city || ''}/>
                    {this.getError('addressCity')}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-md-8">
                  <div className="form-group">
                    <label className="m-0">{i18n.t('owner_edit.address.address')}</label>
                    <input type="text"
                           className="form-control"
                           onChange={this.changeAddressString('address')}
                           value={model.address.address || ''}/>
                    {this.getError('addressAddress')}
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="form-group">
                    <label className="m-0">{i18n.t('owner_edit.address.zip')}</label>
                    <input type="text"
                           className="form-control"
                           onChange={this.changeAddressString('zip')}
                           value={model.address.zip || ''}/>
                    {this.getError('addressZip')}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="card shadow-sm mb-3">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="m-0">{i18n.t('owner_edit.property_title')}</h3>
              </div>
            </div>
          </div>
          <div className="card-body">

            <div className="row">
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label className="m-0">{i18n.t('owner_edit.property.propertyId')}</label>
                  <input type="text"
                         className="form-control"
                         onChange={this.changeProperty('propertyId')}
                         value={model.property.propertyId || ''}/>
                  {this.getError('propertyId')}
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label className="m-0">{i18n.t('owner_edit.property.name')}</label>
                  <input type="text"
                         className="form-control"
                         onChange={this.changeProperty('name')}
                         value={model.property.name || ''}/>
                  {this.getError('propertyName')}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="card shadow-sm mb-3">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="m-0">{i18n.t('owner_edit.security_title')}</h3>
              </div>
            </div>
          </div>
          <div className="card-body">

            <div className="row">
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label className="m-0 required">{i18n.t('owner_edit.password1')}</label>
                  <input type="password"
                         className="form-control"
                         onChange={this.changeString('password1')}
                         value={model.password1 || ''}/>
                  {this.getError('password1')}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label className="m-0 required">{i18n.t('owner_edit.password2')}</label>
                  <input type="password"
                         className="form-control"
                         onChange={this.changeString('password2')}
                         value={model.password2 || ''}/>
                  {this.getError('password2')}
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
  OwnerEdit: store => store.OwnerEdit,
})

export default withRouter(
  connect(selectors)(OwnerEdit)
)
