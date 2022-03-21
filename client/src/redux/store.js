
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loginReducer from "./loginSlice"
import userReducer from "./userSlice"
import cartReducer from "./cartSlice"
import historyReducer from './historySlice';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'


  const persistConfig = {
    key: 'root',
    version: 1,
    storage,  
  }
  const rootReducer = combineReducers({   
    login:loginReducer,
    user:userReducer,
    cart:cartReducer,
    history:historyReducer,
  
  })
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  
  export const store = configureStore({
      
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  
  export let persistor = persistStore(store);
     /*  export default  configureStore({
          reducer:{
              login:loginReducer,
              user:userReducer,
              cart:cartReducer,
          }
      })  */

     