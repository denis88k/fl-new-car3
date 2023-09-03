import { yearsDefaultState, yearsInit } from './years.js';

yearsInit();

// сброс всех значений в фильтре
export const filterReset = () => {
	yearsDefaultState();
	document.querySelectorAll('.mileage__input').forEach(input => (input.value = ''));
};

// кнопка "сбросить"
export const filter = () => {
	document.querySelector('.filter__btn-reset').addEventListener('click', filterReset);
};
