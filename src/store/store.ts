import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import cartSlice from './slices/cartSlice'

const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({
  cart: cartSlice,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useDispatch = () => useDispatchBase<AppDispatch>()

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector)
