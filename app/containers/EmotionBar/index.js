/**
 * EmotionBar
 *
 * Provides available emotions to be selected
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import EmotionBarStyle from './EmotionBarStyle';
import ToolTipTop from 'components/ToolTipTop';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import { changeEmotion } from 'containers/App/actions';
import { toggleEmotionBar } from 'containers/HomePage/actions';
import { makeSelectTransactions, makeSelectLoading, makeSelectError } from 'containers/App/selectors';


export class EmotionBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props) {
    super(props);
  }
  
  showRemoveBtn(emotion) {

    if (emotion !== '') {
      return (
        <span onClick={() => {this.props.onEmotionClick({emotion: '', id: this.props.id})}} className="remove" >
          Remove    
        </span>
      )
    }
  }
  
  render() {
    
      var showState = '';
    
      if (this.props.show === true) {
        showState = 'open';
      }
         
      return (
      
      <EmotionBarStyle className={showState}>
        <ToolTipTop className="tooltip-top"/>
        <FaTimesCircle className='close-icon' onClick={() => this.props.toggleEmotionBar(this.props.id, false)}/>
        <ul className="no-list">
          <li onClick={() => {this.props.onEmotionClick({emotion: 'love', id: this.props.id})}}>
            &#x1F60D;
          </li>
          <li onClick={() => {this.props.onEmotionClick({emotion: 'joy', id: this.props.id})}}>
            &#x1F604;
          </li>
          <li onClick={() => {this.props.onEmotionClick({emotion: 'hate', id: this.props.id})}}>
            &#x1F621;
          </li>
          <li onClick={() => {this.props.onEmotionClick({emotion: 'surprise', id: this.props.id})}}>
            &#x1F631;
          </li>
        </ul>
        {this.showRemoveBtn(this.props.emotion)}
      </EmotionBarStyle>
    
      )
  }
}

EmotionBar.propTypes = {
  onEmotionClick: React.PropTypes.func,
  id: React.PropTypes.string
};

export function mapDispatchToProps(dispatch) {
  return {
    onEmotionClick: (emotion) => {
      dispatch(changeEmotion(emotion));
    },
    toggleEmotionBar: (itemId, force) => {
      dispatch(toggleEmotionBar(itemId, force));
    }
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(null, mapDispatchToProps)(EmotionBar);
