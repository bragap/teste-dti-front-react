import CreateNewReminder from "../components/CreateNewReminder/CreateNewReminder.tsx";
import ReadAllReminders from "../components/ReadAllReminders/ReadAllReminders.tsx";
import Header from "../components/Header/Header.tsx";
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