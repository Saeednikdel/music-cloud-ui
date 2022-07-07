import { combineReducers } from 'redux';
import auth from './auth';
import cloud from './cloud';

export default combineReducers({
  auth, ///this was like this auth: auth
  cloud,
});
