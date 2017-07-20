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
import { makeSelectTransactionFilter, makeSelectFilterType, makeSelectFilteredItems } from './selectors';
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
    
    switch(this.props.filterType) {
      case 'description':
        return(
          <fieldset>
            <label>Filter transactions by description:</label>

            <Input
              id="description-filter"
              type="text"
              placeholder="TFL"
              value={this.props.filter}
              onChange={this.props.onfilterTransactions}
            />

          </fieldset>
        )
        break;
      case 'emotion':
        return (
          <fieldset>
            <label>Select an Emotion:</label>
            <SelectInput name="emotion-filter" onChange={this.props.onfilterTransactions}>
              <option value='all'>Please Select Emotion</option>
              <option value="love">Love</option>
              <option value="hate">Hate</option>
              <option value="joy">Joy</option>
              <option value="surprise">Surprise</option>
            </SelectInput>
          </fieldset>
        )
        break;
      case 'both':
          return (
              <div>
                <fieldset>
                  <FormattedMessage {...messages.trymeMessage} />

                    <Input
                      id="description-filter"
                      type="text"
                      placeholder="TFL"
                      value={this.props.filter}
                    />

                </fieldset> 
                <fieldset>
                  <label>Select an Emotion</label>
                  <SelectInput name="emotion-filter">

                    <option value='all'>Please Select Emotion</option>
                    <option value="love">Love</option>
                    <option value="hate">Hate</option>
                    <option value="joy">Joy</option>
                    <option value="surprise">Surprise</option>
                  </SelectInput>
                </fieldset>
                <input type="submit" value="Filter" />
              </div>
          
          )
        break
    }
  
  }

  render() {
    const { loading, error, transactions, filteredItems } = this.props;
    const transactionsListProps = {
      loading,
      error,
      transactions,
      filteredItems
    };
    
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
            <p className="header-des">
              <FormattedMessage {...messages.startProjectMessage} />
            </p>
          </CenteredSection>
          <Section>
            <Form>
                
                <fieldset>
                  <label>Select a filter type:</label>
                  <SelectInput name="filter-type" onChange={this.props.onChangeFilterType}>
                    <option value="description">Description</option>
                    <option value="emotion">Emotion</option>
                    <option value="both">Both</option>
                  </SelectInput>
                </fieldset>
                
            </Form>
            <Form onSubmit={this.props.onfilterTransactions}>
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
    
    onfilterTransactions: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      
      if (evt.target.tagName === 'FORM')  {
        dispatch(filterTransactions({
          description: evt.target.querySelector('input').value,
          emotion: evt.target.querySelector('select').value
        }))
      } else {
        dispatch(filterTransactions(evt.target.value))
      }
      
      console.log(this);
      
    }
  };
}

const mapStateToProps = createStructuredSelector({
  transactions: makeSelectTransactions(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  transactionFilter: makeSelectTransactionFilter(),
  filterType: makeSelectFilterType(),
  filteredItems: makeSelectFilteredItems()
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
