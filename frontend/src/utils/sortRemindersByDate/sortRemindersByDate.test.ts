import { sortRemindersByDate } from './sortRemindersByDate.ts';
import { Reminder } from '../interfaces';

describe('sortRemindersByDate', () => {
	it('should sort reminders in ascending order by date', () => {
		const reminders: Reminder[] = [
			{ id: 1, name: 'Lembrete 1', date: '2024-10-10' },
			{ id: 2, name: 'Lembrete 2', date: '2024-09-12' },
			{ id: 3, name: 'Lembrete 3', date: '2024-08-01' }
		];

		const sortedReminders = sortRemindersByDate(reminders);

		expect(sortedReminders[0].date).toBe('2024-08-01');
		expect(sortedReminders[1].date).toBe('2024-09-12');
		expect(sortedReminders[2].date).toBe('2024-10-10');
	});

	it('should handle an empty array', () => {
		const reminders: Reminder[] = [];

		const sortedReminders = sortRemindersByDate(reminders);

		expect(sortedReminders).toEqual([]);
	});

	it('should not modify the original array', () => {
		const reminders: Reminder[] = [
			{ id: 1, name: 'Lembrete 1', date: '2024-10-10' },
			{ id: 2, name: 'Lembrete 2', date: '2024-09-12' }
		];

		const originalReminders = [...reminders];
		sortRemindersByDate(reminders);

		expect(reminders).toEqual(originalReminders);
	});

	it('should handle reminders with the same date', () => {
		const reminders: Reminder[] = [
			{ id: 1, name: 'Lembrete 1', date: '2024-10-10' },
			{ id: 2, name: 'Lembrete 2', date: '2024-10-10' }
		];

		const sortedReminders = sortRemindersByDate(reminders);

		expect(sortedReminders[0].date).toBe('2024-10-10');
		expect(sortedReminders[1].date).toBe('2024-10-10');
	});
});
