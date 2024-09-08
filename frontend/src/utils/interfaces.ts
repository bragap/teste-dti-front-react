export interface Reminder {
	id: number;
	name: string;
	date: string;
}

export interface RemindersState {
	list: Reminder[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

export interface CardReminderProps {
	reminder: Reminder;
}

export const initialState: RemindersState = {
	list: [],
	status: 'idle',
	error: null,
};

