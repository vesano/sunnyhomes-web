import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as Pages from '../../../router/Pages';

class OwnerCard extends React.PureComponent {

  render() {

    const {model} = this.props

    return <div className="col-3 col-lg-2">
      <Link to={Pages.OWNERS_EDIT.replace(':id', model._id)}
            className="card shadow-sm mb-1 mr-1 transition-3d-hover">
        <div className="card-image">
          <img src="/img/fallout-thumb-up.png" alt="" className="img-fluid"/>
        </div>
        <div className="card-footer p-1">
          <p className="m-0 text-truncate">{model.surname} {model.name}</p>
          <p className="m-0 text-truncate">{model.email}</p>
        </div>
      </Link>
    </div>
  }
}

export default connect()(OwnerCard)
