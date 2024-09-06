import CreateNewReminder from "../components/CreateNewReminder.tsx";
import ReadAllReminders from "../components/ReadAllReminders.tsx";
import Header from "../components/Header.tsx";
import "../styles/pages/MainContent.scss";

export default function MainContent(){

	return(
		<main className="container">
			<Header/>
			<CreateNewReminder/>
			<ReadAllReminders/>
		</main>
	)
}