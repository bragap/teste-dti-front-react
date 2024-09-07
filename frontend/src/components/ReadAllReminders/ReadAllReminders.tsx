import "../../styles/components/ShowReminder.scss";
import CardReminder from "../CardReminder/CardReminder.tsx";
import { useReadReminder } from '../../hooks/useReadReminder/useReadReminder.ts';
import { Reminder } from "../../utils/interfaces.ts";
import { formatDate } from "../../utils/formatDate/formatDate.ts";

const sortRemindersByDate = (reminders: Reminder[]) => {
	return [...reminders].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export default function ReadAllReminders() {
	const { reminders, error, loading } = useReadReminder();

	if (loading) return <p>Carregando lembretes...</p>;
	if (error) return <p className="create-remainder-error">Erro ao carregar lembretes. Tente novamente mais tarde.</p>;

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

			<div className="show-remainders">
				{Object.keys(groupedReminders).map(date => (
					<div key={date} className="card-date">
						<div>{date}</div>
						{groupedReminders[date].map(reminder => (
							<CardReminder key={reminder.id} reminder={reminder} />
						))}
					</div>
				))}
			</div>
		</section>
	);
}
