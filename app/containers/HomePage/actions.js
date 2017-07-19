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
  TOGGLE_EMOTIONBAR
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
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
