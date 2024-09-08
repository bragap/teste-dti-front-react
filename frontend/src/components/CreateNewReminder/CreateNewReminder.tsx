import "../../styles/components/CreateNewReminder.scss";
import { useCreateReminder } from '../../hooks/useCreateReminder/useCreateReminder.ts';
import { useEffect, useState } from 'react';

export default function CreateNewReminder() {
	const { createReminder, error, loading } = useCreateReminder();
	const [name, setName] = useState<string>('');
	const [date, setDate] = useState<string>('');
	const [success, setSuccess] = useState<boolean>(false);
	const [showError, setShowError] = useState<boolean>(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSuccess(false);
		setShowError(false);

		if (await createReminder(name, date)) {
			setName('');
			setDate('');
			setSuccess(true);
		} else {
			setShowError(true);
		}
	};

	useEffect(() => {
		let timer: NodeJS.Timeout;

		if (success) {
			timer = setTimeout(() => {
				setSuccess(false);
			}, 2000);
		}

		return () => clearTimeout(timer);
	}, [success]);

	useEffect(() => {
		let timer: NodeJS.Timeout;

		if (showError) {
			timer = setTimeout(() => {
				setShowError(false);
			}, 2000);
		}

		return () => clearTimeout(timer);
	}, [showError]);

	return (
		<section className="create-remainder-container">
			<form className="create-remainder-content" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="remainderTitle">Nome*</label>
					<input
						type="text"
						id="remainderTitle"
						placeholder="Insira o nome do lembrete"
						name="remainderTitle"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="remainderDate">Data*</label>
					<input
						type="date"
						id="remainderDate"
						name="remainderDate"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
				</div>
				<button type="submit">
					{loading ? 'Criando...' : 'Criar'}
				</button>
			</form>
			{showError && (
				<dialog open className="error-dialog">
					{error}
				</dialog>
			)}
			{success && (
				<dialog open className="success-dialog">
					Lembrete criado com sucesso!
				</dialog>
			)}
		</section>
	);
}
