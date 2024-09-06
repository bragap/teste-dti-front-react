import "../styles/components/ShowReminder.scss";
import CardReminder from "./CardReminder.tsx";
import { useReadReminder } from '../hooks/useReadReminder';


export default function ReadAllReminders(){
	const { reminders, error, loading } = useReadReminder();

	console.log(reminders,"reminders")
	if (loading) return <p>Carregando lembretes...</p>;
	if (error) return <p>Erro ao carregar lembretes: {error}</p>;

	return (
		<section className="show-container">
			<div className="show-title">
				<h3>Lembretes criados</h3>
				<div className="show-counter">{reminders.length}</div>
			</div>

			<div className="show-remainders">
				{reminders.map((reminder, index) => (
					<div key={index} className="card-date">
						<div>Data: {new Date(reminder.date).toLocaleDateString()}</div>
						<CardReminder reminder={reminder} />
					</div>
				))}
			</div>
		</section>
	);
}