document.addEventListener('DOMContentLoaded', () => {
	const daysVal = document.querySelector('.timer__day');
	const hoursVal = document.querySelector('.timer__hour');
	const minutesVal = document.querySelector('.timer__min');

	const daysText = document.querySelector('.timer__day-text');
	const hoursText = document.querySelector('.timer__hour-text');
	const minutesText = document.querySelector('.timer__min-text');

	function declOfNum(number, titles) {
		let cases = [2, 0, 1, 1, 1, 2];
		return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
	}

	const timeCount = () => {
		const now = new Date();
		const dayWeek = new Date().getDay(); // день недели
		let dayLeft = 8 - dayWeek; // дней осталось до пн
		dayLeft === 8 && (dayLeft = 1); // если вс, то 1 день остался до пн
		// console.log(dayLeft);

		const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + dayLeft); // пн след недели

		// console.log(monday.getDate(), 'дата');
		// console.log(monday.getHours(), 'часы');
		// console.log(monday.getMinutes(), 'минуты');
		// console.log(monday.toLocaleString());

		const leftUntil = monday - now; // осталось до конца недели
		// console.log(leftUntil);

		let days = Math.floor(leftUntil / 1000 / 60 / 60 / 24);
		let hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24;
		let minutes = (Math.floor(leftUntil / 1000 / 60) % 60) + 1;

		daysVal.textContent = days;
		hoursVal.textContent = hours;
		minutesVal.textContent = minutes;

		daysText.textContent = declOfNum(days, ['день', 'дня', 'дней']);
		hoursText.textContent = declOfNum(hours, ['час', 'часа', 'часов']);
		minutesText.textContent = declOfNum(minutes, ['минута', 'минуты', 'минут']);
		// console.log(days, hours, minutes);
	};

	timeCount();

	setInterval(timeCount, 60000);
});
