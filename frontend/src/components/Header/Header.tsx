
import lembreLogo from '/lembre.svg';
import "../../styles/components/Header.scss";


export default function Header(){
	return(
		<header>
			<div className="header-content">
					<img src={lembreLogo} alt="lembre" />
					<h1>lembre</h1>
			</div>
		</header>
	)
}