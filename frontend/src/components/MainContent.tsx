import CreateNewReminder from "./CreateNewReminder.tsx";


//import useState from "react";
import ReadAllReminders from "./ReadAllReminders.tsx";

export default function MainContent(){

	//const [remainders, setRemainders] = useState([]);

	return(
		<div>
			<CreateNewReminder/>
            <ReadAllReminders/>
		</div>
	)
}