import { combineReducers } from 'redux';
import mbti from './modules/mbti';
import todo from './modules/todo';
import weight from './modules/weight';
import user from './modules/user';

export default combineReducers({
  todo,
  weight,
  mbti,
  user,
});
