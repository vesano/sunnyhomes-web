import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import * as Pages from '../../../router/Pages';
import {FETCH_SUCCESS, MODEL_CHANGED} from '../actions';
import FetchAdmin from '../actions/Fetch';
import Remove from '../actions/Remove';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";

class AdminEdit extends React.Component {

  componentDidMount() {
    const {id} = this.props.match.params

    if (id) {
      this.props.dispatch(FetchAdmin(id))
    } else {
      this.props.dispatch({
        type: FETCH_SUCCESS,
        payload: {}
      })
    }
  }

  remove = () => {
    const {model} = this.props.AdminEdit

    this.props.dispatch(Remove(model.id))
  }

  submit = () => {
    const {model} = this.props.AdminEdit

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
    const {errors} = this.props.AdminEdit.validator

    if (errors[key] === undefined) return null

    return <small className="feedback invalid-feedback d-block">{errors[key]}</small>
  }

  render() {

    const {
      model,
      isValid,
      isLoading,
      serverErrors,
    } = this.props.AdminEdit

    let title = i18n.t('admin_edit.title')
    if (model.id) {
      title = `${model.surname} ${model.name}`
    }

    return <div className="container">
      <div className="row">
        <div className="col-12">

          <div className="card shadow-sm my-3">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h3 className="m-0">{title}</h3>
                </div>
                <div className="col-12 col-lg-auto text-right">

                  <Link to={Pages.ADMINS} className="btn btn-sm btn-outline-primary transition-3d-hover mr-1">
                    <i className="fa fa-ban"/>&nbsp;{i18n.t('admin_edit.cancel_action')}
                  </Link>

                  {model.id && <button className="btn btn-sm btn-danger transition-3d-hover mr-1"
                                       type="button"
                                       onClick={this.remove}
                                       disabled={isLoading}>
                    <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-times"}/>
                    &nbsp;{i18n.t('admin_edit.remove_action')}
                  </button>}

                  <button className="btn btn-sm btn-primary transition-3d-hover"
                          type="button"
                          onClick={this.submit}
                          disabled={isLoading || !isValid}>
                    <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-check"}/>
                    &nbsp;{i18n.t('admin_edit.save_action')}
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
                    <label className="m-0 required">{i18n.t('admin_edit.email')}</label>
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
                    <label className="m-0 required">{i18n.t('admin_edit.name')}</label>
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
                    <label className="m-0 required">{i18n.t('admin_edit.surname')}</label>
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
          </div>
        </div>

        <div className="col-12">
          <div className="card shadow-sm mb-3">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h3 className="m-0">{i18n.t('admin_edit.security_title')}</h3>
                </div>
              </div>
            </div>
            <div className="card-body">

              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="m-0 required">{i18n.t('admin_edit.password1')}</label>
                    <input type="password"
                           className="form-control"
                           onChange={this.changeString('password1')}
                           value={model.password1 || ''}/>
                    {this.getError('password1')}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="m-0 required">{i18n.t('admin_edit.password2')}</label>
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
  AdminEdit: store => store.AdminEdit,
})

export default withRouter(
  connect(selectors)(AdminEdit)
)
