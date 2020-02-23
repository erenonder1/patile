import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getAccounts from '../actions/accounts';

class AccountListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    accounts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    match: PropTypes.shape({ params: PropTypes.shape({}) }),
    fetchAccounts: PropTypes.func.isRequired, }

  static defaultProps = {
    match: null,
  }

  state = {
    error: null,
    loading: false,
  }

  componentDidMount = () => this.fetchData();

  fetchData = (data) => {
    const { fetchAccounts,} = this.props;

    this.setState({ loading: true });


    return fetchAccounts(data)
      .then(() => this.setState({
        loading: false,
        error: null,
      })).catch(err => this.setState({
        loading: false,
        error: err,
      }));
  }

  render = () => {
    const { Layout, accounts, match } = this.props;
    const { loading, error } = this.state;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        accountId={id}
        error={error}
        loading={loading}
        accounts={accounts}
        reFetch={() => this.fetchData()}
      />
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts.accounts || {},
});

const mapDispatchToProps = {
  fetchAccounts: getAccounts,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountListing);
