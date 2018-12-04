import React, { useContext } from 'react';
import { StoreContext } from '../context';

import { Link } from 'react-router-dom';

import Layout from '../core/Layout';
import loadQuestions from '../actions/loadQuestions';

export default () => {
  const { dispatch } = useContext(StoreContext);

  return (
    <Layout>
      <Link to="/quiz" onClick={() => loadQuestions(dispatch)}>
        Начать тест
      </Link>
    </Layout>
  );
};
