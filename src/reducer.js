import { initialState } from './store';
import * as types from './actions/types';

/* 
state = {
  loading: false,
  error: null,
  list: [
    {
      id: 1,
      question: ...,
      options: ...,
      rightAnswer: ...,
      selectedAnswer: ...,
      loading: false,
    },
    {
      id: 2,
      question: ...,
      options: ...,
      selectedAnswer: ...,
      loading: true,
    },
    {
      id: 3,
      question: ...,
      options: ...,
    },
  ]
}
*/

export default (state = initialState, { type, payload }) => {
  // console.log({ type, payload });

  switch (type) {
    case types.LOAD_QUESTIONS_START:
      return {
        ...state,
        loading: true
      };

    case types.LOAD_QUESTIONS_SUCCESS:
      return {
        ...state,
        list: payload.list,
        loading: false
      };

    case types.LOAD_QUESTIONS_FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false
      };

    case types.LOAD_QUESTION_DATA_START:
      return {
        ...state,
        list: state.list.map(obj =>
          obj.id === payload.questionId
            ? { ...obj, selectedAnswer: payload.selectedAnswer, loading: true }
            : obj
        )
      };

    case types.LOAD_QUESTION_DATA_SUCCESS:
      return {
        ...state,
        list: state.list.map(obj =>
          obj.id === payload.data.id
            ? { ...obj, ...payload.data, loading: false }
            : obj
        )
      };

    case types.LOAD_QUESTION_DATA_FAILURE:
      return {
        ...state,
        list: state.list.map(obj =>
          obj.id === payload.questionId
            ? { ...obj, loading: false, error: payload.error }
            : obj
        )
      };

    case types.TIMER_SET:
      return {
        ...state,
        timer: payload.seconds
      };

    default:
      return state;
  }
};
