/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);

const makeSelectShowEmotionBar = () => createSelector(
  selectHome,
  (homeState) => {
    return {
      id: homeState.getIn(['showEmotionBar', 'id']),
      toggleState: homeState.getIn(['showEmotionBar', 'toggleState'])
    }
  }
);

export {
  selectHome,
  makeSelectUsername,
  makeSelectShowEmotionBar
};
