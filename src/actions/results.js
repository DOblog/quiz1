import * as types from './types';

export const addNewResult = result => ({
  type: types.ADD_NEW_RESULT,
  payload: { result }
});

export const clearResults = () => ({
  type: types.CLEAR_RESULTS,
});