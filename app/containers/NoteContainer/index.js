/**
 * NoteContainer
 *
 * Provides available emotions to be selected
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import NoteContainerStyle from './NoteContainerStyle';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import { toggleNoteContainer } from 'containers/HomePage/actions';


export class NoteContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props) {
    super(props);
  }
  
  render() {
      
    
    
      var showState = '';
    
      if (this.props.show === true) {
        showState = 'open';
        console.log(this.props);
      }
         
      return (
      
      <NoteContainerStyle className={showState}>
        
        <FaTimesCircle className='close-icon' onClick={() => this.props.toggleNoteContainer(this.props.note, false, this.props.id)}/>
        <p> {this.props.note} </p>
      
      </NoteContainerStyle>
    
      )
  }
}

NoteContainer.propTypes = {
  note: React.PropTypes.string
};

export function mapDispatchToProps(dispatch) {
  return {
    toggleNoteContainer: (itemId, force) => {
      dispatch(toggleNoteContainer(itemId, force));
    }
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(null, mapDispatchToProps)(NoteContainer);
