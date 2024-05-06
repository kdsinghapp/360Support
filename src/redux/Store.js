

import AuthReducer from "./feature/authSlice";
import FeatureReducer from "./feature/featuresSlice";
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';



const reducers = combineReducers({
   
    auth:AuthReducer,
    feature:FeatureReducer
  
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth','Get_UserProfile','Updated_UserInfo','Updated_ChildInfo'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

const persistor = persistStore(store);
export {store, persistor};
