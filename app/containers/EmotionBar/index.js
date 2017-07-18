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
import { changeEmotion } from 'containers/App/actions';
import { makeSelectEmotionSucess } from 'containers/App/selectors';
import { makeSelectTransactions, makeSelectLoading, makeSelectError } from 'containers/App/selectors';

export class EmotionBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props) {
    super(props);
  }
  
  render() {
    if (this.props.show) {
      return (
      
      <EmotionBarStyle>
        <ToolTipTop />
        <ul className="no-list">
          <li onClick={() => this.props.onEmotionClick('love')}>
            &#x1F60D;
          </li>
          <li onClick={() => this.props.onEmotionClick('joy')}>
            &#x1F604;
          </li>
          <li onClick={() => this.props.onEmotionClick('hate')}>
            &#x1F621;
          </li>
          <li onClick={() => this.props.onEmotionClick('surprise')}>
            &#x1F631;
          </li>
        </ul>
      </EmotionBarStyle>
    
      )
    } else {
      return null
    }

  }
}

EmotionBar.propTypes = {
  show: React.PropTypes.bool,
  onEmotionClick: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  transactions: makeSelectTransactions(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onEmotionClick: (emotion) => {
      dispatch(changeEmotion(emotion));
    },

  };
}

// Wrap the component to inject dispatch and state into it
export default connect(null, mapDispatchToProps)(EmotionBar);
