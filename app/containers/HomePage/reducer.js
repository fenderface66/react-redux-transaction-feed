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
  TOGGLE_EMOTIONBAR,
  FILTER_TRANSACTIONS,
  CHANGE_FILTERTYPE
} from './constants';

// The initial state of the App
const initialState = fromJS({
  transactionFilter: '',
  filterType: 'description',
  transactionFilter: '',
  showEmotionBar: {
    id: '',
    toggleState: false
  }
});

function homeReducer(state = initialState, action) {
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
      
    case CHANGE_FILTERTYPE:
      console.log('changing filter type');
      console.log(action);
      
      return state
        .set('filterType', action.filterType)
      
    case FILTER_TRANSACTIONS:
      
      return state
        .set('transactionFilter', action.filter)
      
    default:
      return state;
  }
}

export default homeReducer;
