/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 */

export const LOAD_TRANSACTIONS = 'react-redux-transactions/Home/LOAD_TRANSACTIONS';
export const LOAD_TRANSACTIONS_SUCCESS = 'react-redux-transactions/Home/LOAD_TRANSACTIONS_SUCCESS';
export const LOAD_TRANSACTIONS_ERROR = 'react-redux-transactions/Home/LOAD_TRANSACTIONS_ERROR';
export const DEFAULT_LOCALE = 'en';
export const CHANGE_EMOTION = 'react-redux-transactions/EmotionBar/CHANGE_EMOTION';
