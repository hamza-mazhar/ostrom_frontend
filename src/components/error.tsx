import React             from "react";

interface Props {
  children: any;
}

interface State {
  hasError: boolean;
  error:any;
  info:any;
}
export default class ErrorBoundary extends React.Component<Props,State> {
  constructor(props:any ) {
    super(props);
    this.state = { hasError: false, error: '', info:  '' };
  }

  componentDidCatch(error: any, info: any): void {
    this.setState({ hasError: true, error: error, info: info });
  }

  render(): {} {
    if (this.state.hasError) {
      return (
          <div id="errorModal" className="modal">
            <div className="modal-content">
              <span className="close">&times;</span>
              <h2>Application Crash</h2>
              <p>Error encountered in application.</p>
              {this.state.error}
            </div>
          </div>
      );
    }

    // Render children if no error
    return this.props.children
  }
}

