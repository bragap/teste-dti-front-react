// @ts-expect-error: React é importado automaticamente com o runtime automático do JSX
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import CreateNewReminder from './CreateNewReminder';
import { useCreateReminder } from '../../hooks/useCreateReminder/useCreateReminder';

jest.mock('../../hooks/useCreateReminder/useCreateReminder.ts');

describe('CreateNewReminder Component', () => {
  const mockCreateReminder = jest.fn();

  const setupMocks = (options: { error?: string; loading?: boolean; success?: boolean } = {}) => {
    (useCreateReminder as jest.Mock).mockReturnValue({
      createReminder: mockCreateReminder,
      error: options.error || '',
      loading: options.loading || false,
    });

    if (options.success !== undefined) {
      mockCreateReminder.mockResolvedValueOnce(options.success);
    }
  };

  const fillAndSubmitForm = async (name = 'Novo lembrete', date = '2024-09-10') => {
    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: name } });
    fireEvent.change(screen.getByLabelText(/Data/i), { target: { value: date } });
    fireEvent.submit(screen.getByRole('button'));
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the form correctly', () => {
    setupMocks();
    render(<CreateNewReminder />);

    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data/i)).toBeInTheDocument();
    expect(screen.getByText(/Criar/i)).toBeInTheDocument();
  });

  it('should call createReminder when the form is submitted', async () => {
    setupMocks({ success: true });
    render(<CreateNewReminder />);

    await act(async () => {
      await fillAndSubmitForm();
    });

    await waitFor(() => {
      expect(mockCreateReminder).toHaveBeenCalledWith('Novo lembrete', '2024-09-10');
      expect(screen.getByText(/Lembrete criado com sucesso!/i)).toBeInTheDocument();
    });
  });

  it('should show an error dialog when createReminder fails', async () => {
    setupMocks({ error: 'Erro ao criar lembrete', success: false });
    render(<CreateNewReminder />);

    await act(async () => {
      await fillAndSubmitForm();
    });

    await waitFor(() => {
      expect(mockCreateReminder).toHaveBeenCalledWith('Novo lembrete', '2024-09-10');
      expect(screen.getByText(/Erro ao criar lembrete/i)).toBeInTheDocument();
    });
  });

  it('should show a loading state when creating reminder', () => {
    setupMocks({ loading: true });
    render(<CreateNewReminder />);

    expect(screen.getByText(/Criando.../i)).toBeInTheDocument();
  });
});
