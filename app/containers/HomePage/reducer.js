/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  CHANGE_USERNAME,
  TOGGLE_EMOTIONBAR
} from './constants';

// The initial state of the App
const initialState = fromJS({
  username: '',
  showEmotionBar: {
    id: '',
    toggleState: false
  }
});

function homeReducer(state = initialState, action) {
  console.log('This is the action');
  console.log(action);
  switch (action.type) {
    case CHANGE_USERNAME:

      return state
        .set('username', action.name.replace(/@/gi, ''));
    case TOGGLE_EMOTIONBAR:
      console.log(state.getIn(['showEmotionBar', 'toggleState']));
      
      if (action.force !== undefined) {
        return state
          .setIn(['showEmotionBar', 'id'], action.item_id)
          .setIn(['showEmotionBar', 'toggleState'], action.force);
      } else {
        return state
          .setIn(['showEmotionBar', 'id'], action.item_id)
          .setIn(['showEmotionBar', 'toggleState'], !state.getIn(['showEmotionBar', 'toggleState']));
      }
      
      
      
    default:
      return state;
  }
}

export default homeReducer;
