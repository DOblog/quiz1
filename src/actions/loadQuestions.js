import * as types from './types';
import { getQuestions } from '../api';

export const loadQuestionsStart = () => ({
  type: types.LOAD_QUESTIONS_START
});

export const loadQuestionsSuccess = list => ({
  type: types.LOAD_QUESTIONS_SUCCESS,
  payload: { list }
});

export const loadQuestionsFailure = error => ({
  type: types.LOAD_QUESTIONS_FAILURE,
  payload: { error }
});

export default dispatch => {
  dispatch(loadQuestionsStart());
  return getQuestions()
    .then(list => {
      dispatch(loadQuestionsSuccess(list));
    })
    .catch(error => dispatch(loadQuestionsFailure(error)));
};
