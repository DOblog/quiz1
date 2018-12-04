import React, { useContext } from 'react';
import { Redirect } from 'react-router';

import { StoreContext } from '../context';
import { QUESTIONS_PER_PAGE, TIMER_DURATION_SECONDS } from '../constants';

import { Link } from 'react-router-dom';
import { secondsDeclension } from '../utils/declension';

import Layout from '../core/Layout';

export default () => {
  const {
    state: { list, timer, loading }
  } = useContext(StoreContext);

  if (loading === undefined) {
    return <Redirect to="/" />;
  }

  const rightAnswersCount = list.filter(
    ({ selectedAnswer, rightAnswer, loading }) =>
      !loading && selectedAnswer !== undefined && selectedAnswer === rightAnswer
  ).length;

  return (
    <Layout>
      <h1>
        {rightAnswersCount} / {QUESTIONS_PER_PAGE} за&nbsp;
        {TIMER_DURATION_SECONDS - timer}&nbsp;
        {secondsDeclension(timer)}!
      </h1>
      <Link to="/">Начать заново</Link>
    </Layout>
  );
};
