import { formatDate } from './formatDate.ts'; // ajuste o caminho conforme necessário

describe('formatDate', () => {
	it('should format date from "YYYY-MM-DD" to "DD/MM/YYYY"', () => {
		const inputDate = '2024-09-10';
		const expectedOutput = '10/09/2024';

		const result = formatDate(inputDate);

		expect(result).toBe(expectedOutput);
	});

	it('should handle single digit day and month correctly', () => {
		const inputDate = '2024-03-05';
		const expectedOutput = '05/03/2024';

		const result = formatDate(inputDate);

		expect(result).toBe(expectedOutput);
	});

	it('should handle invalid date format', () => {
		const inputDate = 'invalid-date';

		expect(() => formatDate(inputDate));
	});
});
