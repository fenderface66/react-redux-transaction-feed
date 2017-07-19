/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectTransactions = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'transactions'])
);

const makeSelectEmotion = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('emotionData')
);

const makeSelectHideEmotionBar = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('hideEmotionBar')
);

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectTransactions,
  makeSelectLocationState,
  makeSelectEmotion,
  makeSelectHideEmotionBar
};
