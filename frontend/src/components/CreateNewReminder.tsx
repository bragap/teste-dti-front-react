import "../styles/components/CreateNewReminder.scss";
import { useCreateReminder } from '../hooks/useCreateReminder';
import { useState } from 'react';



export default function CreateNewReminder(){
	const { createReminder, error, loading } = useCreateReminder();
	const [name, setName] = useState<string>('');
	const [date, setDate] = useState<string>('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (await createReminder(name, date)) {
			setName('');
			setDate('');
		} else {
			return;
		}

	};
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
			{error && <small className="create-remainder-error">{error}</small>}
		</section>
	);
};