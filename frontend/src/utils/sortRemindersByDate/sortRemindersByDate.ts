import {Reminder} from "../interfaces.ts";

export const sortRemindersByDate = (reminders: Reminder[]) => {
	return [...reminders].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
