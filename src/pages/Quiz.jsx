import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router';

import { StoreContext } from '../context';

import Layout from '../core/Layout';

import Question from '../components/Question';
import Score from '../components/Score';
import { addNewResult } from '../actions/results';

import { QUESTIONS_PER_PAGE, TIMER_DURATION_SECONDS } from '../constants';

const SECONDS_BEFORE_REDIRECT = 3;

export default () => {
  const { dispatch, state } = useContext(StoreContext);
  const { list, loading, error, results } = state;

  const [shouldRedirect, setRedirectPosibility] = useState(false);
  const [timer, setTimer] = useState(TIMER_DURATION_SECONDS);

  const rightAnswersCount =
    list &&
    list.filter(
      ({ selectedAnswer, rightAnswer, loading }) =>
        !loading &&
        selectedAnswer !== undefined &&
        selectedAnswer === rightAnswer
    ).length;

  useEffect(() => {
    const timeout = setTimeout(() => setTimer(timer - 1), 1000);

    return () => clearInterval(timeout);
  });

  const selectedAnswersCount =
    list &&
    list.filter(
      ({ selectedAnswer, loading }) => !loading && selectedAnswer !== undefined
    ).length;

  if (selectedAnswersCount === QUESTIONS_PER_PAGE) {
    setTimeout(
      () => setRedirectPosibility(true),
      SECONDS_BEFORE_REDIRECT * 1000
    );
  }

  if (shouldRedirect || timer === 0) {
    const result = {
      date: new Date().toISOString(),
      answers: rightAnswersCount,
      time:
        TIMER_DURATION_SECONDS -
        timer -
        (shouldRedirect ? SECONDS_BEFORE_REDIRECT : 0)
    };
    dispatch(addNewResult(result));
    localStorage.setItem('results', JSON.stringify([result, ...results]));

    return <Redirect to="/result" />;
  }

  if (loading === undefined) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return (
      <Layout>
        <h2>Загрузка</h2>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <h2>Ошибка при загрузке</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2>Выберите правильный ответ:</h2>
      <Score timer={timer} />
      <div>
        {list.map(data => (
          <Question {...data} key={data.id} />
        ))}
      </div>
    </Layout>
  );
};
