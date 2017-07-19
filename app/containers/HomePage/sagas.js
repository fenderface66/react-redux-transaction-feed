/**
 * Gets the Transactions from the server
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_TRANSACTIONS, CHANGE_EMOTION } from 'containers/App/constants';
import { FILTER_TRANSACTIONS  } from 'containers/HomePage/constants';
import { transactionsLoaded, transactionLoadingError } from 'containers/App/actions';
import { makeSelectEmotion, makeSelectTransactions } from 'containers/App/selectors';
import request from 'utils/request';
import { makeSelectShowEmotionBar, makeSelectFilterType, makeSelectTransactionFilter } from 'containers/HomePage/selectors';
import { toggleEmotionBar } from 'containers/HomePage/actions';

/**
 * Transaction request/response handler
 */
export function* getTransactions() {

  const requestURL = 'http://localhost:3000/api/getTransactions';
  
  try {
    // Call our request helper (see 'utils/request')
    const transactions = yield call(request, requestURL);
    yield put(transactionsLoaded(transactions));
  } catch (err) {
    yield put(transactionLoadingError(err));
  }
}

/**
 * Emotions  handler
 */
export function* updateEmotion() {
  
  // Select emotion from store
  const itemEmotion = yield select(makeSelectEmotion());
  console.log(itemEmotion);
  
  const requestURL = `http://localhost:3000/api/updateEmotion?emotion=${itemEmotion.emotion}&id=${itemEmotion.id}`;

  try {
    // Call our request helper (see 'utils/request')
    const transactions = yield call(request, requestURL);
    yield put(transactionsLoaded(transactions));
    yield put(toggleEmotionBar(itemEmotion.id));
  } catch (err) {
    yield put(transactionLoadingError(err));
  }
}

/**
 * Transactions Filter handler
 */
export function* filterTransactions() {
  
  const shownItems = []
  const transactions = yield select(makeSelectTransactions());
  const filterType = yield select(makeSelectFilterType());
  const filter = yield select(makeSelectTransactionFilter());
  
  transactions.map((transaction) => {
    var lowercase;  
    if (filterType === 'description') {
      lowercase = transaction.description.toLowerCase();
      if (lowercase.indexOf(filter.toLowerCase()) !== -1) {
        shownItems.push({
          id: transaction.id
        })
      }
    } else {
      lowercase = transaction.emotion.toLowerCase();

      if (lowercase === filter) {

      shownItems.push({
        id: transaction.id
      })
      }
    }
  })
  
  try {
    yield put(filtersCreatedSuccess(shownItems));
  } catch (err) {
    yield put(transactionLoadingError(err));
  }
}

/**
 * Root sagas manage watcher lifecycle
 */
export function* emotionData() {
  // Watches for LOAD_TRANSACTIONS actions and calls getTransactions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  
  const watcher = yield takeLatest(CHANGE_EMOTION, updateEmotion);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* filterData() {
  // Watches for LOAD_TRANSACTIONS actions and calls getTransactions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(FILTER_TRANSACTIONS, filterTransactions);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* transactionData() {
  // Watches for LOAD_TRANSACTIONS actions and calls getTransactions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_TRANSACTIONS, getTransactions);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  transactionData,
  emotionData,
  filterData
];
