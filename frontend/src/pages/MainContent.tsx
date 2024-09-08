import CreateNewReminder from "../components/CreateNewReminder/CreateNewReminder.tsx";
import ShowReminders from "../components/ShowReminders/ShowReminders.tsx";
import Header from "../components/Header/Header.tsx";
import "../styles/pages/MainContent.scss";

export default function MainContent(){

	return(
		<main className="container">
			<Header/>
			<CreateNewReminder/>
			<ShowReminders/>
		</main>
	)
}