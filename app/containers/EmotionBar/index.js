/**
 * EmotionBar
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import EmotionBarStyle from './EmotionBarStyle';


export class EmotionBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {

  }
  
  render() {
    return (
      
      <EmotionBarStyle>
        <ul className="no-list">
          <li>
            &#x1F60D;
          </li>
          <li>
            &#x1F604;
          </li>
          <li>
            &#x1F621;
          </li>
        </ul>
      </EmotionBarStyle>
    
    )
  }
}

EmotionBar.propTypes = {
  item: React.PropTypes.object,
  currentUser: React.PropTypes.string,
};

export default connect()(EmotionBar);
