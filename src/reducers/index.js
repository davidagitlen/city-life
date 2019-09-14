import { combineReducers } from 'redux';
import { cityInfoReducer } from './cityInfoReducer';

export const rootReducer = combineReducers({
  cityInfo: cityInfoReducer
});