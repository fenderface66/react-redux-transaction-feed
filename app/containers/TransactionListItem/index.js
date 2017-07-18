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
import Emoji from './emoji';

export class transactionListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      emotion: this.props.item.emotion,
      emotionExists: false
    }
  }
  
  componentDidMount() {
    
    this.getCurrencyString(this.props.item);
    this.emotionToEmoji(this.props.item.emotion);
    
  }
  
  //Format amount from data
  emotionToEmoji(emotion) {
    const emojiDictionary = [['love', String.fromCodePoint(0x1F60D)], ['joy', String.fromCodePoint(0x1F604)], ['hate', String.fromCodePoint(0x1F60D)], ['surprise', String.fromCodePoint(0x1F631)]];
    
    emojiDictionary.map((arr) => {
      if (emotion === arr[0]) {
        this.setState({
          emotion: arr[1]
        })
      }
    })
  }
  
  //Format amount from data
  getCurrencyString(item) {
    const currencyCodes = [['GBP', '£'], ['USD', '$'], ['EUR', '€']];
    
    var currencyString
    var negativeNumber = false;
    
    if (item.amount.toString().split('-').length > 1) {
      currencyString = item.amount.toString().split('-');
      negativeNumber = true;
    }
    
    currencyCodes.map((code) => {
      if (item.currency === code[0]) {
        
        if (negativeNumber) {
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
          <Span className="emoji">
            Feeling:
            <Emoji>
              {this.state.emotion}
            </Emoji>
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
