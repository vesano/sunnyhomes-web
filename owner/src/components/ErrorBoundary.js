import React from 'react'
import i18n from '../i18n'

class ErrorBoundary extends React.PureComponent {

  state = {
    hasError: false
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log(errorInfo);

    this.setState({
      hasErrors: true
    });
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-container p-3">
        <h3>{i18n.t('view_error.title')}</h3>
        <h4>{i18n.t('view_error.subtitle')}</h4>
      </div>
    }

    return this.props.children;
  }
}

export default ErrorBoundary