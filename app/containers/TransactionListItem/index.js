/**
 * transactionListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedNumber } from 'react-intl';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import ListItem from 'components/ListItem';
import TransactionData from './TransactionData';
import Wrapper from './Wrapper';
import Span from 'components/Span';
import EmotionBar from 'containers/EmotionBar'

export class transactionListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props) {
    super(props);
    this.state = {
      amount: ''
    }
  }
  
  componentDidMount() {
    const currencyCodes = [['GBP', '£'], ['USD', '$'], ['EUR', '€']];
    this.getCurrencyString(currencyCodes, this.props.item)
  }
  
  //Format amount from data
  getCurrencyString(codeList, item) {
    var currencyString
    var negativeNumber = false;
    
    if (item.amount.toString().split('-').length > 1) {
      currencyString = item.amount.toString().split('-');
      negativeNumber = true;
    }
    
    codeList.map((code) => {
      if (item.currency === code[0]) {
        
        if (negativeNumber) {
          console.log(currencyString);
          currencyString = '-' + code[1] + currencyString[1];
        } else {
          currencyString = code[1] + item.amount.toString();
        }
        
        this.setState({
          amount: currencyString
        })
      }
    })
  }
  
  render() {
    const item = this.props.item;
    var amountClass
    
    if (item.amount < 0) {
      amountClass = "price negative";
    } else {
      amountClass = "price positive";
    }
    
    // Put together the content of the repository          
    var content = (
      <Wrapper>
        <TransactionData>
          <Span>
            {item.description}
          </Span>
          <Span className={amountClass}>
            {this.state.amount}
          </Span>
        </TransactionData>
        <EmotionBar emotion={item.emotion}></EmotionBar>
      </Wrapper>

    );

    // Render the content into a list item
    return (
      <ListItem key={`transaction-list-item-${item.id}`} item={content} />
    );
  }
}

transactionListItem.propTypes = {
  item: React.PropTypes.object,
  currentUser: React.PropTypes.string,
};

export default connect(createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
}))(transactionListItem);
