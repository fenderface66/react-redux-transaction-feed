/**
 * Update emotional state of transactions
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { CHANGE_EMOTION } from 'containers/App/constants';

import request from 'utils/request';
import { makeSelectEmotion } from 'containers/App/selectors';

/**
 * Transaction request/response handler
 */
export function* updateEmotion() {
  
  console.log('running');
  
  // Select emotion from store
  const emotion = yield select(makeSelectEmotion());
  const requestURL = `http://localhost:3000/api/updateEmotion?emotion=${emotion}`;

  try {
    // Call our request helper (see 'utils/request')
    const transactions = yield call(request, requestURL);
  } catch (err) {
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* emotionData() {
  // Watches for LOAD_TRANSACTIONS actions and calls getTransactions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  console.log('here now');
  
  const watcher = yield takeLatest(CHANGE_EMOTION, updateEmotion);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  emotionData,
];