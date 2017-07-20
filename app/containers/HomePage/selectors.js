/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectTransactionFilter = () => createSelector(
  selectHome,
  (homeState) => homeState.get('transactionFilter')
);

const makeSelectFilteredItems = () => createSelector(
  selectHome,
  (homeState) => homeState.get('filteredItems')
);

const makeSelectFilterType = () => createSelector(
  selectHome,
  (homeState) => homeState.get('filterType')
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

const makeSelectShowNoteContainer = () => createSelector(
  selectHome,
  (homeState) => {
    return {
      note: homeState.getIn(['showNoteContainer', 'note']),
      toggleState: homeState.getIn(['showNoteContainer', 'toggleState']),
      id: homeState.getIn(['showNoteContainer', 'id'])
    }
  }
);

export {
  selectHome,
  makeSelectUsername,
  makeSelectShowEmotionBar,
  makeSelectTransactionFilter,
  makeSelectFilterType,
  makeSelectFilteredItems,
  makeSelectShowNoteContainer 
};
