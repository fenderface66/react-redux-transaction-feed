/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const FILTER_TRANSACTIONS = 'react-redux-transactions/Home/FILTER_TRANSACTIONS';
export const CHANGE_FILTERTYPE = 'react-redux-transactions/Home/CHANGE_FILTERTYPE';
export const TOGGLE_EMOTIONBAR = 'react-redux-transactions/Home/TOGGLE_EMOTIONBAR';
export const TOGGLE_NOTECONTAINER = 'react-redux-transactions/Home/TOGGLE_NOTECONTAINER';
export const FILTERS_CREATED = 'react-redux-transactions/Home/FILTERS_CREATED';
