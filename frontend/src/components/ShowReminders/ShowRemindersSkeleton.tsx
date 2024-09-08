import React from 'react';
import "../../styles/components/ShowRemindersSkeleton.scss";

const ShowRemindersSkeleton: React.FC = () => {
	return (
		<section className="show-container-skeleton" data-testid="show-reminders-skeleton">
			<div className="show-title-skeleton">
				<div className="title-skeleton"></div>
				<div className="counter-skeleton"></div>
			</div>

			<div className="show-reminders-skeleton">
				<div className="card-date-skeleton">
					<div className="date-skeleton"></div>
					<div className="reminder-card-skeleton"></div>
					<div className="reminder-card-skeleton"></div>
				</div>
			</div>
		</section>
	)
};

export default ShowRemindersSkeleton;
