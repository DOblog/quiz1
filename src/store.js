import reducer from './reducer';

const resultsString = localStorage.getItem('results');

const initialState = {
  results: resultsString ? JSON.parse(resultsString) : []
};

export { reducer, initialState };
