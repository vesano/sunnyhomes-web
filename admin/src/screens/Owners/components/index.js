import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {FILTER_CHANGED} from '../actions';
import * as Pages from '../../../router/Pages';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import OwnerCard from "./Card";
import Paginator from "../../../components/Paginator";
import Loading from "../../../components/Loading";

class Owners extends React.Component {

  componentDidMount() {
    this.changePage(1)
  }

  changePage = page => {
    this.props.dispatch({
      type: FILTER_CHANGED,
      payload: {
        page
      }
    })
  }

  renderPagination = () => {
    const {isLoading, page, limit, total} = this.props.Owners

    if (isLoading) return <Loading/>

    return <Paginator
      onChange={this.changePage}
      total={total}
      limit={limit}
      page={page}/>

  }
  renderContent = () => {
    const {items} = this.props.Owners

    return <div className="row no-gutters">{items.map((item, i) =>
      <OwnerCard model={item} key={i}/>
    )}</div>
  }

  render() {

    return <div className="row">
      <div className="col-12">
        <div className="card shadow-sm my-3">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="m-0">{i18n.t('owners.title')}</h3>
              </div>
              <div className="col-12 col-md-auto text-right">
                <Link className="btn btn-primary transition-3d-hover"
                      to={Pages.OWNERS_NEW}>
                  <i className="fa fa-plus"/>&nbsp;{i18n.t('owners.new_action')}
                </Link>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                {this.renderContent()}
              </div>
            </div>
            <div className="row my-2">
              <div className="col-auto mx-auto">
                {this.renderPagination()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

const selectors = createStructuredSelector({
  Owners: store => store.Owners,
})

export default connect(selectors)(Owners)
