export function formatDate(dateString: string): string {
	const [year, month, day] = dateString.split('-').map(Number);

	const date = new Date(year, month - 1, day);

	const formattedDay = date.getDate().toString().padStart(2, '0');
	const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
	const formattedYear = date.getFullYear();

	return `${formattedDay}/${formattedMonth}/${formattedYear}`;
}