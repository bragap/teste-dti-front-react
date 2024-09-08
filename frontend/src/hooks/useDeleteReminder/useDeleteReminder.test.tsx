import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { useDeleteReminder } from './useDeleteReminder';
import api from '../../config/api';
import { removeReminder } from '../../redux/remindersSlice';

jest.mock('../../config/api');

describe('useDeleteReminder Hook', () => {
	const mockDispatch = jest.fn();
	store.dispatch = mockDispatch;

	it('should handle successful reminder deletion', async () => {
		(api.delete as jest.Mock).mockResolvedValue({});

		const { result } = renderHook(() => useDeleteReminder(), { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> });

			await act(async () => {
				const success = await result.current.deleteReminder(1);
				expect(success).toBe(true);
				expect(result.current.error).toBeNull();
				expect(mockDispatch).toHaveBeenCalledWith(removeReminder(1));
			});
		});
		});
