import * as types from './types';
import { setTimer, startTimer } from './timer';
import { getQuestions } from '../api';
import { TIMER_DURATION_SECONDS } from '../constants';

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
  dispatch(setTimer(-1));
  return getQuestions()
    .then(list => {
      dispatch(loadQuestionsSuccess(list));
      startTimer(dispatch, TIMER_DURATION_SECONDS);
    })
    .catch(error => dispatch(loadQuestionsFailure(error)));
};
