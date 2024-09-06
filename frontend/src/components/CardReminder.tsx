import { Trash } from "lucide-react"
import "../styles/components/CardReminder.scss";
import { Reminder } from "../utils/interfaces.ts";
import {useDeleteReminder} from "../hooks/useDeleteReminder.ts";

interface CardReminderProps {
	reminder: Reminder;
}

export default function CardReminder({reminder}: CardReminderProps)  {

	const { deleteReminder } = useDeleteReminder();


	const handleDelete = () => {
		deleteReminder(reminder.id);
	};

	return(
		<section className="remainder-container">
			<div className="remainder-content">
				<div className="remainder-name">{reminder.name}</div>
				<button onClick={handleDelete}>
					<Trash strokeWidth={1.50}/>
				</button>
			</div>
		</section>
	)
}