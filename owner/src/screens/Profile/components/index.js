import React from 'react';
import {connect} from 'react-redux';
import {MODEL_CHANGED} from '../actions';
import FetchMe from '../actions/FetchMe';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import PhoneInput from "../../../components/PhoneInput";

class Profile extends React.Component {

  componentDidMount() {
    this.props.dispatch(FetchMe())
  }

  submit = () => {
    const {model} = this.props.Profile

    this.props.dispatch(Save(model))
  }

  change = (key, value = null) => this.props.dispatch({
    type: MODEL_CHANGED,
    payload: {
      [key]: value
    }
  })

  changeBool = name => e => this.change(name, e.target.checked)

  changeString = name => e => this.change(name, e.target.value)

  changeAddressString = key => e => this.props.dispatch({
    type: MODEL_CHANGED,
    payload: {
      address: {
        [key]: e.target.value
      }
    }
  })

  changePhone = (name) => (value, code, isValid) => this.change(name, value)

  getError = key => {
    const {errors} = this.props.Profile.validator

    if (errors[key] === undefined) return null

    return <small className="feedback invalid-feedback d-block">{errors[key]}</small>
  }

  render() {

    const {
      model,
      isValid,
      isLoading,
      serverErrors,
    } = this.props.Profile

    return <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm my-3">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h3 className="m-0">{i18n.t('profile.title')}</h3>
                </div>
                <div className="col-12 col-md-auto text-right">
                  <button className="btn btn-primary transition-3d-hover"
                          type="button"
                          onClick={this.submit}
                          disabled={isLoading || !isValid}>
                    <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-check"}/>
                    &nbsp;{i18n.t('profile.action')}
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
                  <div className="col-12">
                    <div className="form-group">
                      <label className="m-0 required">{i18n.t('profile.email')}</label>
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
                      <label className="m-0">{i18n.t('profile.name')}</label>
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
                      <label className="m-0">{i18n.t('profile.surname')}</label>
                      <input type="text"
                             name="surname"
                             className="form-control"
                             onChange={this.changeString('surname')}
                             value={model.surname || ''}/>
                      {this.getError('surname')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label className="m-0">{i18n.t('profile.phoneLandline')}</label>
                      <PhoneInput
                        fieldId="profile.phoneLandline"
                        className="form-control"
                        onChange={this.changePhone('phoneLandline')}
                        value={model.phoneLandline || ''}/>
                      {this.getError('phoneLandline')}
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label className="m-0">{i18n.t('profile.phoneMobile')}</label>
                      <PhoneInput
                        fieldId="profile.phoneMobile"
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
                      <label className="m-0">{i18n.t('profile.address.country')}</label>
                      <input type="text"
                             className="form-control"
                             onChange={this.changeAddressString('country')}
                             value={model.address.country || ''}/>
                      {this.getError('country')}
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label className="m-0">{i18n.t('profile.address.city')}</label>
                      <input type="text"
                             className="form-control"
                             onChange={this.changeAddressString('city')}
                             value={model.address.city || ''}/>
                      {this.getError('city')}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-8">
                    <div className="form-group">
                      <label className="m-0">{i18n.t('profile.address.address')}</label>
                      <input type="text"
                             className="form-control"
                             onChange={this.changeAddressString('address')}
                             value={model.address.address || ''}/>
                      {this.getError('address')}
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group">
                      <label className="m-0">{i18n.t('profile.address.zip')}</label>
                      <input type="text"
                             className="form-control"
                             onChange={this.changeAddressString('zip')}
                             value={model.address.zip || ''}/>
                      {this.getError('zip')}
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
                  <h3 className="m-0">{i18n.t('profile.property_title')}</h3>
                </div>
              </div>
            </div>
            <div className="card-body">

              <div className="form-group">
                <label className="m-0">{i18n.t('profile.property.name')}</label>
                <input type="text"
                       className="form-control"
                       readOnly={true}
                       defaultValue={model.property.name}/>
              </div>

            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card shadow-sm mb-3">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h3 className="m-0">{i18n.t('profile.security_title')}</h3>
                </div>
              </div>
            </div>
            <div className="card-body">

              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="m-0">{i18n.t('profile.password1')}</label>
                    <input type="password"
                           className="form-control"
                           onChange={this.changeString('password1')}
                           value={model.password1 || ''}/>
                    {this.getError('password1')}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="m-0">{i18n.t('profile.password2')}</label>
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
    </div>
  }
}

const selectors = createStructuredSelector({
  Profile: store => store.Profile,
})

export default connect(selectors)(Profile)
