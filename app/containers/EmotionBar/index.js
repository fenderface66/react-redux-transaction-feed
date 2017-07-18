/**
 * EmotionBar
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


export class EmotionBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {

  }
  
  render() {
    return (
      
      <div className="emotion-bar">
        <ul className="no-list">
          <li>
            😀
          </li>
          <li>
            😐
          </li>
          <li>
            😥
          </li>
          <li>
            😫
          </li>
          <li>
            😡
          </li>
        </ul>
      </div>
    
    )
  }
}

EmotionBar.propTypes = {
  item: React.PropTypes.object,
  currentUser: React.PropTypes.string,
};

export default connect()(EmotionBar);
