/*
 * App Actions
 *
 * Actions change things in your application
 * Since this app uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 */

import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
  CHANGE_EMOTION,
} from './constants';

/**
 * Load the transactions, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_TRANSACTIONS
 */
export function loadTransactions() {
  return {
    type: LOAD_TRANSACTIONS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_TRANSACTIONS_SUCCESS passing the repos
 */
export function transactionsLoaded(transactions, username) {
  return {
    type: LOAD_TRANSACTIONS_SUCCESS,
    transactions,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_TRANSACTIONS_ERROR passing the error
 */
export function transactionLoadingError(error) {
  return {
    type: LOAD_TRANSACTIONS_ERROR,
    error,
  };
}

/**
 * Dispatched when emotion has been changed
 *
 * @param  {object} emotion The chosen emotion
 *
 */
export function changeEmotion(emotionData) {
  return {
    type: CHANGE_EMOTION,
    emotionData
  };
}

