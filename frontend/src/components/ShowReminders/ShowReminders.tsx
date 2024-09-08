import "../../styles/components/ShowReminders.scss";
import CardReminder from "../CardReminder/CardReminder.tsx";
import { useReadReminder } from '../../hooks/useReadReminder/useReadReminder.ts';
import { Reminder } from "../../utils/interfaces.ts";
import { formatDate } from "../../utils/formatDate/formatDate.ts";
import { sortRemindersByDate } from "../../utils/sortRemindersByDate/sortRemindersByDate.ts";
import ShowRemindersSkeleton from "./ShowRemindersSkeleton.tsx";


export default function ShowReminders() {
	const { reminders, error, loading } = useReadReminder();

	if (loading) return <ShowRemindersSkeleton />;
	if (error) return <p className="error-fetching-data">Erro ao carregar lembretes. Tente novamente mais tarde.</p>;

	const sortedReminders = sortRemindersByDate(reminders);


	const groupedReminders = sortedReminders.reduce((groups, reminder) => {
		const date = formatDate(reminder.date);
		if (!groups[date]) {
			groups[date] = [];
		}
		groups[date] = [...groups[date], reminder];
		return groups;
	}, {} as { [key: string]: Reminder[] });

	return (
		<section className="show-container">
			<div className="show-title">
				<h3>Lembretes criados</h3>
				<div className="show-counter">{reminders.length}</div>
			</div>

			{reminders.length === 0 ? (
				<p className="no-reminders">Nenhum lembrete encontrado. Adicione um novo lembrete para começar.</p>
			) : (
				<div className="show-reminders">
					{Object.keys(groupedReminders).map(date => (
						<div key={date} className="card-date">
							<div>{date}</div>
							{groupedReminders[date].map(reminder => (
								<CardReminder key={reminder.id} reminder={reminder} />
							))}
						</div>
					))}
				</div>
			)}
		</section>
	)
}
