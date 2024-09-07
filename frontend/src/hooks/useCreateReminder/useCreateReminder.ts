import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';
import { addReminder } from '../../redux/remindersSlice.ts';
import { useState } from 'react';
import api from '../../config/api.ts';

export const useCreateReminder = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const createReminder = async (name: string, date: string): Promise<boolean> => {
		if (!name || !date) {
			setError('Nome e data são obrigatórios!');
			return false;
		}

		const selectedDate = new Date(date);
		const today = new Date();
		if (selectedDate <= today) {
			setError('A data deve estar no futuro!');
			return false;
		}

		try {
			setLoading(true);
			const response = await api.post('/reminders', { name, date });
			dispatch(addReminder(response.data));
			setError(null);
			return true;
		} catch (error) {
			setError(`Falha ao criar lembrete: ${error}`);
			return false;
		} finally {
			setLoading(false);
		}
	};

	return { createReminder, error, loading };
};
