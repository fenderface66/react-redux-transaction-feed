/**
 * Gets the Transactions from the server
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_TRANSACTIONS, CHANGE_EMOTION } from 'containers/App/constants';
import { FILTER_TRANSACTIONS, CHANGE_FILTERTYPE } from 'containers/HomePage/constants';
import { transactionsLoaded, transactionLoadingError } from 'containers/App/actions';
import { makeSelectEmotion, makeSelectTransactions } from 'containers/App/selectors';
import request from 'utils/request';
import { makeSelectShowEmotionBar, makeSelectFilterType, makeSelectTransactionFilter } from 'containers/HomePage/selectors';
import { toggleEmotionBar, filtersCreated } from 'containers/HomePage/actions';

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
    switch (filterType) {
      case 'description':
        lowercase = transaction.description.toLowerCase();
        if (lowercase.indexOf(filter.toLowerCase()) !== -1) {
          shownItems.push({
            id: transaction.id
          })
        }
        break;
      case 'emotion':
        if (filter === 'all') {
          shownItems.push({
            id: transaction.id
          })
        } else if (transaction.emotion === filter) {
            shownItems.push({
              id: transaction.id
            })
        } 
        break;
      case 'both':
        lowercase = transaction.description.toLowerCase();
        if (lowercase.indexOf(filter.description.toLowerCase()) !== -1 && (filter.emotion === 'all' || transaction.emotion === filter.emotion)) {
          
          console.log('MATCH');
          console.log(transaction.description);
          console.log(transaction.emotion);
          shownItems.push({
            id: transaction.id
          })
        }
        
        break;
    }

  })
  
  try {
    yield put(filtersCreated(shownItems));
  } catch (err) {
    console.log(err);
  }
}

export function* clearFilters() {
  
  const shownItems = []
  const transactions = yield select(makeSelectTransactions());
  transactions.map((transaction) => {
    shownItems.push({
      id: transaction.id
    })
  })
  
  try {
    // Call our request helper (see 'utils/request')
     yield put(filtersCreated(shownItems));
  } catch (err) {
    console.log(err);
  }
}

/**
 * Root sagas manage watcher lifecycle
 */
export function* emotionData() {
  
  const watcher = yield takeLatest(CHANGE_EMOTION, updateEmotion);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* filterData() {
  const watcher = yield takeLatest(FILTER_TRANSACTIONS, filterTransactions);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* clearFilterData() {
  const watcher = yield takeLatest(CHANGE_FILTERTYPE, clearFilters);

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
  filterData,
  clearFilterData
];
