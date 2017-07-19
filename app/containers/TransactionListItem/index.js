/**
 * transactionListItem
 *
 * Lists the name and the issue count of a repository
 */ 

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedNumber } from 'react-intl';
import ListItem from 'components/ListItem';
import TransactionData from './TransactionData';
import Wrapper from './Wrapper';
import Span from 'components/Span';
import EmotionBar from 'containers/EmotionBar';
import Emoji from './Emoji';
import RequestEmotion from './RequestEmotion';
import { toggleEmotionBar } from 'containers/HomePage/actions';
import { makeSelectShowEmotionBar, makeSelectFilteredItems } from 'containers/HomePage/selectors';


export class transactionListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      emotion: this.props.item.emotion,
      emotionExists: false,
      showEmotionBar: false
    }

  }
  
  componentDidMount() {
    
    this.getCurrencyString(this.props.item);
    
  }
  
  //Format amount from data
  emotionToEmoji(emotion) {
    var emojiDictionary = [['love', String.fromCodePoint(0x1F60D)], ['joy', String.fromCodePoint(0x1F604)], ['hate', String.fromCodePoint(0x1F621)], ['surprise', String.fromCodePoint(0x1F631)]];
    var emoji;
    emojiDictionary.map((arr) => {
      if (emotion === arr[0]) {
        emoji = arr[1];
      }
    })
    return emoji;
  }
  
  
  //Ask for user emotion if not present
  requestEmotion(emotion, emoji) {
    if (emotion === '') {
      return (
        <RequestEmotion onClick={() => this.props.toggleEmotionBar(this.props.item.id, true)}>Add Emotion</RequestEmotion>
      ) 
    } else {
      return (
        <span onClick={() => this.props.toggleEmotionBar(this.props.item.id, true)} className="emoji-wrapper">
          <Emoji>
            {emoji}
          </Emoji>
        </span>
      )
    }
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

  checkToggleState(item) {
    var showEmotionBar = false;
    
    if (this.props.showEmotionBar.id === item.id && this.props.showEmotionBar.toggleState) {
      console.log('toggled');
      showEmotionBar = true;
    }
    
    return showEmotionBar;
  }

  getAmountClass(item) {
    var amountClass;
    
    if (item.amount < 0) {
      amountClass = "price negative";
    } else {
      amountClass = "price positive";
    }
    return amountClass;
  }

  showItem(itemId) {
    var show = '';
    
    if (this.props.filteredItems === undefined) {
      return 'open';
    }
    
    this.props.filteredItems.map((filterId) => {
      if (itemId === filterId.id) {
        show = 'open';
        console.log('MATCH');
      }
    })
    
    return show;
  }
  
  render() {
    
    const item = this.props.item;
    var amountClass = this.getAmountClass(item)
    var showEmotionBar = this.checkToggleState(item);
    var emoji = this.emotionToEmoji(item.emotion);
    var showItem = this.showItem(item.id);
    console.log(showItem);
    
    // Put together the content of the repository          
    var content = (
      <Wrapper className={showItem}>
        <TransactionData>
          <Span>
            {item.description}
          </Span>
          {this.requestEmotion(item.emotion, emoji)}
          <Span className={amountClass}>
            {this.state.amount}
          </Span>
        </TransactionData>
        <EmotionBar id={this.props.item.id} show={showEmotionBar} emotion={this.props.item.emotion}></EmotionBar>
      </Wrapper>

    );

    // Render the content into a list item
    return (
      <ListItem key={`transaction-list-item-${item.id}`} item={content} showClass={showItem}/>
    );
  }
}

transactionListItem.propTypes = {
  item: React.PropTypes.object,
  showEmotionBar: React.PropTypes.object,
  filteredItems: React.PropTypes.array
};

export function mapDispatchToProps(dispatch) {
  return {
    toggleEmotionBar: (itemId, force) => {
      dispatch(toggleEmotionBar(itemId, force));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  showEmotionBar: makeSelectShowEmotionBar(),
  filteredItems: makeSelectFilteredItems()
});

export default connect(mapStateToProps, mapDispatchToProps)(transactionListItem);
