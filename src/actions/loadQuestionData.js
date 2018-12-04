import * as types from './types';
import { getQuestionData } from '../api';

export const loadQuestionDataStart = (selectedAnswer, questionId) => ({
  type: types.LOAD_QUESTION_DATA_START,
  payload: { questionId, selectedAnswer }
});

export const loadQuestionDataSuccess = data => ({
  type: types.LOAD_QUESTION_DATA_SUCCESS,
  payload: { data }
});

export const loadQuestionDataFailure = (questionId, error) => ({
  type: types.LOAD_QUESTION_DATA_FAILURE,
  payload: { questionId, error }
});

export default (dispatch, selectedAnswer, questionId) => {
  dispatch(loadQuestionDataStart(selectedAnswer, questionId));
  return getQuestionData(questionId)
    .then(list => dispatch(loadQuestionDataSuccess(list)))
    .catch(error => dispatch(loadQuestionDataFailure(questionId, error)));
};
