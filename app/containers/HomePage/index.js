/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectTransactions, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H2 from 'components/H2';
import TransactionsList from 'components/TransactionsList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import SelectInput from './SelectInput';
import Section from './Section';
import messages from './messages';
import { loadTransactions } from '../App/actions';
import { makeSelectTransactionFilter, makeSelectFilterType } from './selectors';
import { filterTransactions, changeFilterType } from './actions';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  
  constructor() {
    super();
    this.filterSwitch = this.filterSwitch.bind(this);
  }

  componentDidMount() {
    this.props.onSubmitForm();
  }
  
  filterSwitch() {
    
    if (this.props.filterType === 'description') {
      return(
        <fieldset>
        <FormattedMessage {...messages.trymeMessage} />

          <Input
            id="description-filter"
            type="text"
            placeholder="TFL"
            value={this.props.filter}
            onChange={this.props.onfilterTransactions}
          />
        
        </fieldset>
      )
    } else {
      return (
        <fieldset>
          <SelectInput name="emotion-filter" onChange={this.props.onfilterTransactions}>
            <option>Please Select Emotion</option>
            <option value="love">Love</option>
            <option value="hate">Hate</option>
            <option value="joy">Joy</option>
            <option value="surpirse">Surprise</option>
          </SelectInput>
        </fieldset>
      )
    }
  }

  render() {
    const { loading, error, transactions } = this.props;
    const transactionsListProps = {
      loading,
      error,
      transactions,
    };
    
    console.log(this.props.filterType);
    
    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'Search your transactions here' },
          ]}
        />
        <div>
          <CenteredSection>
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
            <p>
              <FormattedMessage {...messages.startProjectMessage} />
            </p>
          </CenteredSection>
          <Section>
            <H2>
              <FormattedMessage {...messages.trymeHeader} />
            </H2>
            <Form onSubmit={this.props.onSubmitForm}>
      
                <fieldset>
                  <SelectInput name="filter-type" onChange={this.props.onChangeFilterType}>
                    <option value="description">Description</option>
                    <option value="emotion">Emotion</option>
                  </SelectInput>
                </fieldset>
                {this.filterSwitch()}
            </Form>
            <TransactionsList {...transactionsListProps} />
          </Section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  transactions: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  onChangeUsername: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadTransactions());
    },
    
    onChangeFilterType: (evt) => dispatch(changeFilterType(evt.target.value)),
    
    onfilterTransactions: (evt) => dispatch(filterTransactions(evt.target.value)),
  };
}

const mapStateToProps = createStructuredSelector({
  transactions: makeSelectTransactions(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  transactionFilter: makeSelectTransactionFilter(),
  filterType: makeSelectFilterType()
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
