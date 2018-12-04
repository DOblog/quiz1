import * as types from './types';

export const setTimer = seconds => ({
  type: types.TIMER_SET,
  payload: { seconds }
});

export const startTimer = (dispatch, seconds) => {
  dispatch(setTimer(seconds));
  if (seconds !== 0) {
    setTimeout(() => startTimer(dispatch, seconds - 1), 1000);
  }
};
