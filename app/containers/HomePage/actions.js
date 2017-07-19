/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this app uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 */

import {
  CHANGE_USERNAME,
  TOGGLE_EMOTIONBAR,
  FILTER_TRANSACTIONS,
  CHANGE_FILTERTYPE,
  FILTERS_CREATED
} from './constants';


export function filterTransactions(filter) {
  return {
    type: FILTER_TRANSACTIONS,
    filter,
  };
}

export function changeFilterType(filterType) {
  return {
    type: CHANGE_FILTERTYPE,
    filterType,
  };
}

export function toggleEmotionBar(item_id, force) {
  console.log('running toggle action');
  console.log(item_id);
  return {
    type: TOGGLE_EMOTIONBAR,
    item_id,
    force
  };
}
