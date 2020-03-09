import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    this.props.onError();
  }

  render() {
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  onError: PropTypes.func.isRequired
};

export default ErrorBoundary;
