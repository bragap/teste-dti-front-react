import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { useReadReminder } from './useReadReminder';
import api from '../../config/api';

jest.mock('../../config/api');

describe('useReadReminder Hook', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should fetch reminders and update state correctly', async () => {
		const mockReminders = [{ id: 1, name: 'Test Reminder', date: '2024-12-31' }];
		(api.get as jest.Mock).mockResolvedValue({ data: mockReminders });

		const { result } = renderHook(() => useReadReminder(), { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> });

		await act(async () => {
			await result.current.readReminder();
		});

		expect(result.current.reminders).toEqual(mockReminders);
		expect(result.current.error).toBeNull();
		expect(result.current.loading).toBe(false);
	});

	it('should handle API errors', async () => {
		(api.get as jest.Mock).mockRejectedValue(new Error('API Error'));

		const { result } = renderHook(() => useReadReminder(), { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> });

		await act(async () => {
			await result.current.readReminder();
		});

		expect(result.current.reminders).toEqual([]);
		expect(result.current.error).toBe('Erro ao buscar lembretes: Error: API Error');
		expect(result.current.loading).toBe(false);
	});
});
