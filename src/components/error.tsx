import React             from "react";
import logo              from './../assets/logo.png';
import { ErrorBoundary } from 'react-error-boundary';
import './error.css';

class Error extends React.Component {
  ErrorFallback = ({ resetErrorBoundary }) => {
    return (
      <div className="error-container">
        <div className="error-holder-container">
          <div className="error-logo-holder">
            <img src={ logo } alt="Logo" className="error-logo"/>
          </div>
          <h4 className="error-caption">Sorry, something went wrong.</h4>
          <p className="error-description">
            We are working on it and we will get it fixed as soon as we can
          </p>
          <span href="#" className="error-go-back-btn" onClick={ () => {
            resetErrorBoundary();
            window.location.reload();
          } }>Go Back</span>
        </div>
      </div>
    )
  }

  myErrorHandler = (error, componentStack) => {
    console.log(error, componentStack);
  }

  render() {
    const { children } = this.props;
    return (
      <ErrorBoundary
        FallbackComponent={ this.ErrorFallback }
        onError={ this.myErrorHandler }
      >
        { children }
      </ErrorBoundary>
    )
  }
}

export default Error
