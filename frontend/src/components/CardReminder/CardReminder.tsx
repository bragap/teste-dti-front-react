import { Trash } from "lucide-react"
import "../../styles/components/CardReminder.scss";
import {useDeleteReminder} from "../../hooks/useDeleteReminder/useDeleteReminder.ts";
import { CardReminderProps } from "../../utils/interfaces.ts";


export default function CardReminder({reminder}: CardReminderProps)  {
	const { deleteReminder } = useDeleteReminder();

	const handleDelete = () => {
		deleteReminder(reminder.id);
	};

	return(
		<section className="reminder-container">
			<div className="reminder-content">
				<div className="reminder-name">{reminder.name}</div>
				<button onClick={handleDelete}>
					<Trash strokeWidth={1.50}/>
				</button>
			</div>

		</section>
	)
}