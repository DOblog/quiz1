import React, { useContext } from 'react';

import { secondsDeclension } from '../utils/declension';
import { StoreContext } from '../context';

export default () => {
  const { state } = useContext(StoreContext);
  const { list, timer } = state;

  if (!list) {
    return <div className="score-widget">...</div>;
  }

  const rightAnswersCount = list.filter(
    ({ selectedAnswer, rightAnswer, loading }) =>
      !loading && selectedAnswer !== undefined && selectedAnswer === rightAnswer
  ).length;
  const wrongAnswersCount = list.filter(
    ({ selectedAnswer, rightAnswer, loading }) =>
      !loading && selectedAnswer !== undefined && selectedAnswer !== rightAnswer
  ).length;
  const noAnswersCount = list.length - (rightAnswersCount + wrongAnswersCount);

  return (
    <div className="score-widget">
      <p>Правильно: {rightAnswersCount}</p>
      <p>Неравильно: {wrongAnswersCount}</p>
      <p>Осталось: {noAnswersCount}</p>
      <hr />
      <p>
        Осталось <strong>{timer}</strong> {secondsDeclension(timer)}
      </p>
    </div>
  );
};
