import React from 'react';
import i18n from '../i18n';

const Footer = () => {

  return <footer>

    <div className="container text-center space-1 border-top">
      <a className="d-inline-flex align-items-center mb-2" href="/">
        Logo
      </a>
      <p className="small text-muted">{i18n.t('footer.copyright')}</p>
    </div>
  </footer>
}

export default Footer