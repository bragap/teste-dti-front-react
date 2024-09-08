import {useEffect, useState} from 'react';
import api from '../../config/api.ts';
import { useSelector, useDispatch } from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store.ts';
import { getAllReminder } from '../../redux/remindersSlice.ts';

export const useReadReminder = () => {
	const dispatch = useDispatch<AppDispatch>();
	const reminders = useSelector((state: RootState) => state.reminders.list);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const readReminder = async (): Promise<boolean> => {
		try {
			setLoading(true);
			const response = await api.get('/reminders');
			dispatch(getAllReminder(response.data));
			setError(null);
			return true;
		} catch (error) {
			setError(`Erro ao buscar lembretes: ${error}`);
			dispatch(getAllReminder([]));
			return false;
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		readReminder();
	}, [dispatch]);

	return { reminders, error, loading, readReminder };
}