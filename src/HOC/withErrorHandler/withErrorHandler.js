import React, { Component } from "react";
import Modal from "../../Components/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      };
    }

    componentDidMount() {
      this.reqIntercetor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resIntercetor = axios.interceptors.response.use(null, (error) => {
        this.setState({ error });
        return Promise.reject(error);
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqIntercetor);
      axios.interceptors.response.eject(this.resIntercetor);
    }

    closeBackDrop = () => {
      this.setState({ error: null });
    };

    render() {
      let { error } = this.state;
      return (
        <>
          <Modal show={error} closeBackDrop={this.closeBackDrop}>
            {error && error.message ? error.message : "Something went wrong..."}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;
