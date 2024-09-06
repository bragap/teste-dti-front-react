import { configureStore } from '@reduxjs/toolkit';
import remindersReducer from './remindersSlice';

export const store = configureStore({
	reducer: {
		reminders: remindersReducer,
	},
});


export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
