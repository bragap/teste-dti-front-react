import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Reminder, initialState} from "../utils/interfaces.ts";


export const remindersSlice = createSlice({
	name: 'reminders',
	initialState,
	reducers: {
		addReminder: (state, action: PayloadAction<Reminder>) => {
			state.list.push(action.payload);
		},
		removeReminder: (state, action: PayloadAction<number>) => {
			state.list = state.list.filter((reminder) => reminder.id !== action.payload);
		},
		getAllReminder: (state, action: PayloadAction<Reminder[]>) => {
			state.list = action.payload;
		}
	},
});

export const { addReminder, removeReminder, getAllReminder } = remindersSlice.actions;
export default remindersSlice.reducer;
