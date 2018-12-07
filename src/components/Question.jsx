import React, { useContext } from 'react';

import { StoreContext } from '../context';

import Button from './Button';

import loadQuestionData from '../actions/loadQuestionData';

export const stateTypes = Object.freeze({
  RIGHT: 'RIGHT',
  WRONG: 'WRONG',
  NOT_SELECTED: 'NOT_SELECTED'
});

const selectOption = (dispatch, selectedAnswer, questionId) => () => {
  loadQuestionData(dispatch, selectedAnswer, questionId);
};

const Question = ({
  id,
  question,
  options,
  selectedAnswer,
  rightAnswer,
  loading,
  comment
}) => {
  const { dispatch } = useContext(StoreContext);

  return (
    <div>
      <p>Что вернет этот код?</p>
      <div dangerouslySetInnerHTML={{ __html: question }} />
      <div className="options">
        {options.map((option, index) => {
          let buttonState = stateTypes.NOT_SELECTED;
          if (index === rightAnswer) {
            buttonState = stateTypes.RIGHT;
          }
          if (index === selectedAnswer && selectedAnswer !== rightAnswer) {
            buttonState = stateTypes.WRONG;
          }

          return (
            <Button
              key={index}
              disabled={selectedAnswer !== undefined || loading}
              state={buttonState}
              onClick={selectOption(dispatch, index, id)}
              loading={loading && selectedAnswer === index}
            >
              {option}
            </Button>
          );
        })}
      </div>
      {comment && <div>{comment}</div>}
      <hr />
    </div>
  );
};

export default Question;
