import { KEY_STORE } from 'constants/keyStore';
import { combineReducers } from '@reduxjs/toolkit';
import localStorage from 'redux-persist/es/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import authReducer from './auth-reducer';
import companyReducer from './company-reducer';

export const hallPersistConfig = {
  key: KEY_STORE.TOKEN,
  storage: localStorage,
  whitelist: ['accessToken', 'type', 'authInfo', 'companyIdLeague'],
};

const rootReducer = combineReducers({
  auth: persistReducer(hallPersistConfig, authReducer),
  company: companyReducer,
});

export default rootReducer;
