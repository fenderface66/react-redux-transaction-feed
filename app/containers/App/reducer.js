/*
 * AppReducer
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
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_ERROR,
  CHANGE_EMOTION,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  id: '',
  userData: {
    transactions: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TRANSACTIONS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'transactions'], false);
    case LOAD_TRANSACTIONS_SUCCESS:
 
      return state
        .setIn(['userData', 'transactions'], action.transactions)
        .set('loading', false)
    case LOAD_TRANSACTIONS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case CHANGE_EMOTION:
      return state
        .set('emotionData', action.emotionData);
        
    default:
      return state;
  }
}

export default appReducer;
