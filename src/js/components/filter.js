import { yearsDefaultState, yearsInit } from './years.js';

yearsInit();

// кнопка "сбросить"
const filterBtnReset = () => {
	yearsDefaultState();
	document.querySelectorAll('.mileage__input').forEach(input => (input.value = ''));
};
export const filter = () => {
	document.querySelector('.filter__btn-reset').addEventListener('click', filterBtnReset);
};
