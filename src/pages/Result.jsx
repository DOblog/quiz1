import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { StoreContext } from '../context';
import { QUESTIONS_PER_PAGE } from '../constants';

import { secondsDeclension } from '../utils/declension';
import { clearResults } from '../actions/results';

import Layout from '../core/Layout';

export default () => {
  const {
    dispatch,
    state: { results, loading }
  } = useContext(StoreContext);

  if (loading === undefined || results.length === 0) {
    return <Redirect to="/" />;
  }

  const [{ time, answers }, ...rest] = results;

  return (
    <Layout>
      <h1>
        {answers} / {QUESTIONS_PER_PAGE} за {time}&nbsp;
        {secondsDeclension(time)}!
      </h1>
      <Link to="/" className="btn btn-info">
        Начать заново
      </Link>
      {rest.length > 0 && (
        <>
          <h2>Предыдущие попытки</h2>
          <table className="table table-dark">
            <tr>
              <th>Дата</th>
              <th>Длительность</th>
              <th>Правильных ответов</th>
            </tr>
            {rest.map(({ date, time, answers }) => (
              <tr>
                <td>{date.slice(0, -5).replace('T', ' ')}</td>
                <td>{time}</td>
                <td>
                  {answers} / {QUESTIONS_PER_PAGE}
                </td>
              </tr>
            ))}
          </table>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(clearResults());
              localStorage.setItem('results', JSON.stringify([results[0]]));
            }}
          >
            Очистить
          </button>
        </>
      )}
    </Layout>
  );
};
