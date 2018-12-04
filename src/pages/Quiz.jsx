import React, { useContext } from 'react';
import { Redirect } from 'react-router';

import { StoreContext } from '../context';

import Layout from '../core/Layout';

import Question from '../components/Q';
import Score from '../components/Score';

import { QUESTIONS_PER_PAGE } from '../constants';

export default () => {
  const { state } = useContext(StoreContext);
  window.state = state;
  const { list, loading, error, timer } = state;

  if (timer === 0) {
    return <Redirect to="/result" />;
  }

  if (loading === undefined) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return (
      <Layout>
        <h2>Загрузка</h2>
        <Score />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>

        <h2>Ошибка при загрузке</h2>
        <Score />
      </Layout>
    );
  }

  if (!list) {
    return (
      <Layout>
        <Score />
      </Layout>
    );
  }

  const selectedAnswersCount = list.filter(
    ({ selectedAnswer, loading }) => !loading && selectedAnswer !== undefined
  ).length;

  if (selectedAnswersCount === QUESTIONS_PER_PAGE) {
    return <Redirect to="/result" />;
  }

  return (
    <Layout>
      <h2>Выберите правильный ответ:</h2>
      <Score />
      <div>
        {list.map(data => (
          <Question {...data} key={data.id} />
        ))}
      </div>
    </Layout>
  );
};
