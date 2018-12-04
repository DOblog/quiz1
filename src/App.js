import React, { useReducer } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { StoreContext } from './context';
import { history } from './history';
import { reducer, initialState } from './store';

import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ dispatch, state }}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/quiz" component={Quiz} />
          <Route exact path="/result" component={Result} />
        </Switch>
      </Router>
    </StoreContext.Provider>
  );
};
