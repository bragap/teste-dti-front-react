import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { useCreateReminder } from './useCreateReminder';
import api from '../../config/api';

jest.mock('../../config/api');

describe('useCreateReminder Hook', () => {
	const mockDispatch = jest.fn();
	store.dispatch = mockDispatch;

	it('should handle validation errors', async () => {
		const { result } = renderHook(() => useCreateReminder(), { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> });

		await act(async () => {
			const success = await result.current.createReminder('', '');
			expect(success).toBe(false);
			await new Promise((resolve) => setTimeout(resolve, 0));
		});


		expect(result.current.error).toBe('Nome e data são obrigatórios!');
	});

	it('should handle date validation errors', async () => {
		const { result } = renderHook(() => useCreateReminder(), { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> });

		await act(async () => {
			const success = await result.current.createReminder('Test Reminder', '2024-01-01');
			expect(success).toBe(false);
			await new Promise((resolve) => setTimeout(resolve, 0));
		});

		expect(result.current.error).toBe('A data deve estar no futuro!');
	});

	it('should handle API errors', async () => {
		(api.post as jest.Mock).mockRejectedValue(new Error('API Error'));

		const { result } = renderHook(() => useCreateReminder(), { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> });

		await act(async () => {
			const success = await result.current.createReminder('Test Reminder', '2024-12-31');
			expect(success).toBe(false);
			await new Promise((resolve) => setTimeout(resolve, 0));
		});

		expect(result.current.error).toBe('Falha ao criar lembrete: Error: API Error');
	});
});
