import { combineReducers, configureStore, EnhancedStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import { Reducer } from 'redux';

import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE, Persistor } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './api';
import authReducer from 'src/features/auth/reducers/auth.reducer'
import logoutReducer from 'src/features/auth/reducers/logout.reducer'
import buyerReducer from 'src/features/buyer/reducer/buyer.reducer'
import sellerReducer from 'src/features/seller/reducers/seller.reducer'
import headerReducer from 'src/shared/header/reducer/header.reducer'
import categoryReducer from 'src/shared/header/reducer/category.reducer'
const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['clientApi', '_persist']
};

export const combineReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth :authReducer,
  logout:logoutReducer,
  buyer:buyerReducer,
  seller:sellerReducer,
  header: headerReducer,
  showCategoryContainer: categoryReducer,
});

export const rootReducers: Reducer<RootState> = (state, action) => {
  // this is to reset the state to default when user logs out
  if (action.type === 'logout/logout') {
    state = {} as RootState;
  }

  return combineReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store: EnhancedStore = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(apiSlice.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor: Persistor = persistStore(store);
