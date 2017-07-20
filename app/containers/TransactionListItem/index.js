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
import A from 'components/A';
import Span from 'components/Span';
import EmotionBar from 'containers/EmotionBar';
import NoteContainer from 'containers/NoteContainer';
import Emoji from './Emoji';
import RequestEmotion from './RequestEmotion';
import { toggleEmotionBar, toggleNoteContainer } from 'containers/HomePage/actions';
import { makeSelectShowEmotionBar, makeSelectFilteredItems, makeSelectShowNoteContainer } from 'containers/HomePage/selectors';


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

  checkToggleState(item, type) {
    var show = false;
    if (type === 'emo-bar') {
      if (this.props.showEmotionBar.id === item.id && this.props.showEmotionBar.toggleState) {
        show = true;
      }
    } else {
      console.log('toggling note container');
      console.log(this.props.showNoteContainer);
      if (this.props.showNoteContainer.id === item.id && this.props.showNoteContainer.toggleState) {
        show = true;
      }
    }
    
    return show;
  }

  getAmountClass(item, type) {
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
    var showEmotionBar = this.checkToggleState(item, 'emo-bar');
    var showNoteContainer = this.checkToggleState(item, 'note-con');
    var emoji = this.emotionToEmoji(item.emotion);
    var showItem = this.showItem(item.id);
    console.log(showNoteContainer);
    
    // Put together the content of the repository          
    var content = (
      <Wrapper className={showItem}>
        <TransactionData>
          <Span className="description">
            {item.description}
          </Span>
          <A onClick={() => this.props.toggleNoteContainer(this.props.item.note, true, this.props.item.id)} className="note">
            Note
          </A>
          {this.requestEmotion(item.emotion, emoji)}
          <Span className={amountClass}>
            {this.state.amount}
          </Span>
        </TransactionData>
        <EmotionBar id={this.props.item.id} show={showEmotionBar} emotion={this.props.item.emotion}></EmotionBar>
        <NoteContainer id={this.props.item.id} show={showNoteContainer} note={this.props.item.note}></NoteContainer>
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
    toggleNoteContainer: (note, force, id) => {
      dispatch(toggleNoteContainer(note, force, id));
    }
  };
}

const mapStateToProps = createStructuredSelector({
  showEmotionBar: makeSelectShowEmotionBar(),
  showNoteContainer: makeSelectShowNoteContainer(),
  filteredItems: makeSelectFilteredItems()
});

export default connect(mapStateToProps, mapDispatchToProps)(transactionListItem);
