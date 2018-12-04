import data from '../data.json';
import {QUESTIONS_PER_PAGE} from '../constants';

export const getQuestions = () => {
  const shuffled = [...data].sort(() => 0.5 - Math.random());
  const mapped = shuffled
    .slice(0, QUESTIONS_PER_PAGE)
    .map(({ id, question, options }) => ({ id, question, options }));

  return new Promise(resolve => setTimeout(() => resolve(mapped), 500));
};

export const getQuestionData = id =>
  new Promise((resolve, reject) => {
    const item = data.find(obj => obj.id === id);

    if (item) {
      setTimeout(() => {
        resolve(item);
      }, 500);
    } else {
      setTimeout(() => {
        resolve({ error: 'Нет такого вопроса' });
      }, 500);
    }
  });
