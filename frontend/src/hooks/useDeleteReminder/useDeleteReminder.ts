import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';
import { removeReminder } from '../../redux/remindersSlice.ts';
import { useState } from 'react';
import api from '../../config/api.ts';

export const useDeleteReminder = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const deleteReminder = async (id: number): Promise<boolean> => {
		try {
			setLoading(true);
			await api.delete(`/reminders/${id}`);

			dispatch(removeReminder(id));
			setError(null);
			return true;
		} catch (error) {
			setError(`Erro ao deletar lembrete: ${error}`);
			return false;
		} finally {
			setLoading(false);
		}
	};

	return { deleteReminder, error, loading };
};
