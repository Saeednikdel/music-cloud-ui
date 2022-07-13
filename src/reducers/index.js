import auth from './auth';
import cloud from './cloud';
import { combineReducers } from 'redux';

export default combineReducers({
  auth, ///this was like this auth: auth
  cloud,
});
