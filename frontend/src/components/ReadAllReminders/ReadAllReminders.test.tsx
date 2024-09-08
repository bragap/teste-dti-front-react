// @ts-expect-error: React é importado automaticamente com o runtime automático do JSX
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ReadAllReminders from './ReadAllReminders';
import { useReadReminder } from '../../hooks/useReadReminder/useReadReminder';
import { Reminder } from '../../utils/interfaces';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import getAllReminder from '../../redux/remindersSlice.ts';

jest.mock('../../hooks/useReadReminder/useReadReminder');

describe('ReadAllReminders Component', () => {
	const mockReminders: Reminder[] = [
		{ id: 1, name: 'Lembrete 1', date: '2024-10-10' },
		{ id: 2, name: 'Lembrete 2', date: '2024-10-12' },
		{ id: 3, name: 'Lembrete 3', date: '2024-10-10' }
	];

	const setupMocks = (options: { reminders?: Reminder[]; error?: string; loading?: boolean } = {}) => {
		(useReadReminder as jest.Mock).mockReturnValue({
			reminders: options.reminders || [],
			error: options.error || '',
			loading: options.loading || false,
		});
	};

	const renderWithRedux = (component: JSX.Element) => {
		const store = configureStore({ reducer: { reminders: getAllReminder } });
		return render(<Provider store={store}>{component}</Provider>);
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

		it('should show loading message when loading reminders', () => {
		setupMocks({ loading: true });
		render(<ReadAllReminders />);

		expect(screen.getByText(/Carregando lembretes.../i)).toBeInTheDocument();
	});

	it('should show error message when there is an error', () => {
		setupMocks({ error: 'Erro ao carregar lembretes' });
		render(<ReadAllReminders />);

		expect(screen.getByText(/Erro ao carregar lembretes/i)).toBeInTheDocument();
	});

	it('should render reminders when available', async () => {
		setupMocks({ reminders: mockReminders });
		renderWithRedux(<ReadAllReminders />);

		await waitFor(() => {
			expect(screen.getByText(/Lembretes criados/i)).toBeInTheDocument();
			expect(screen.getByText(/Lembrete 1/i)).toBeInTheDocument();
			expect(screen.getByText(/Lembrete 2/i)).toBeInTheDocument();
			expect(screen.getByText(/Lembrete 3/i)).toBeInTheDocument();
		});
	});

	it('should group reminders by date', async () => {
		setupMocks({ reminders: mockReminders });
		renderWithRedux(<ReadAllReminders />);

		await waitFor(() => {
			expect(screen.getByText(/10\/10\/2024/i)).toBeInTheDocument();
			expect(screen.getByText(/12\/10\/2024/i)).toBeInTheDocument();
		});
	});
});



