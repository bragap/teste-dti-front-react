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