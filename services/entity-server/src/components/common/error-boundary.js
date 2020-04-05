import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    this.props.onError();
  }

  getDerivedStateFromError() {
    this.props.onError();
  }

  render() {
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  onError: PropTypes.func.isRequired
};

export default withRouter(ErrorBoundary);
