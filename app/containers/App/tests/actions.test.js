import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
} from '../constants';

import {
  loadTransactions,
  transactionsLoaded,
  transactionLoadingError,
} from '../actions';

describe('App Actions', () => {
  describe('loadTransactions', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_TRANSACTIONS,
      };

      expect(loadTransactions()).toEqual(expectedResult);
    });
  });

  describe('transactionsLoaded', () => {
    it('should return the correct type and the passed repos', () => {
      const fixture = ['Test'];
      const username = 'test';
      const expectedResult = {
        type: LOAD_TRANSACTIONS_SUCCESS,
        repos: fixture,
        username,
      };

      expect(transactionsLoaded(fixture, username)).toEqual(expectedResult);
    });
  });

  describe('transactionLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_TRANSACTIONS_ERROR,
        error: fixture,
      };

      expect(transactionLoadingError(fixture)).toEqual(expectedResult);
    });
  });
});
