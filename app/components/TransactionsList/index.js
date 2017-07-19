import React, { PropTypes } from 'react';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import transactionListItem from 'containers/transactionListItem';

function TransactionsList({ loading, error, transactions, filteredItems }) {

  
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (transactions !== false) {
    return <List items={transactions} component={transactionListItem} filteredItems={filteredItems}/>;
  }

  return null;
}

TransactionsList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  transactions: PropTypes.any,
  filteredItems: PropTypes.array
};

export default TransactionsList;
