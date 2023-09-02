import { checkboxComponent } from './checkbox.js';
import { addClass, closestElement, containsClass, removeClass, removeClassArray, resetAnswer, toggleClass } from './helpers.js';
import { blockVisible, btnShowMoreClick } from './visibleBlockAndBtnShowMore.js';

const yearsShowSelect = () => {
	let selectFrom = 0;
	let selectTo = 0;
	let isBetween = () => false;
	// let count = 0;

	const selects = document.querySelector('.years__selects');

	selects.addEventListener('click', e => {
		const selectInput = closestElement(e.target, 'years__input');
		const YearsOption = closestElement(e.target, 'years__option');

		if (selectInput) {
			// console.log('selectInput====');
			// count++;
			const selector = selectInput.nextElementSibling; // блок со списком годов
			toggleClass(selectInput, 'active');
			toggleClass(selector, 'active');
			// console.log(selectFrom, '-', selectTo, 'count:', count);
		}

		if (YearsOption) {
			const selector = YearsOption.closest('.years__select');
			const options = selector.querySelectorAll('.option');
			removeClassArray(options, 'active');
			const selectInput = selector.previousElementSibling;
			const inputYears = selectInput.querySelector('.input-years'); // вписывается год при выборе года
			const optionContainsFrom = containsClass(YearsOption.parentElement, 'select-from');
			const optionContainsTo = containsClass(YearsOption.parentElement, 'select-to');
			const checkboxBlocks = document.querySelectorAll('.years__checkbox-block'); // блоки checkbox с поколениями
			if (containsClass(YearsOption, 'option')) {
				// console.log('option====', YearsOption);
				// count++;
				const option = YearsOption.closest('.option');
				addClass(option, 'active');
				inputYears.innerHTML = option.dataset.value;

				// if (optionContainsFrom) {
				// 	selectFrom = Number(option.dataset.value);
				// }
				// if (optionContainsTo) {
				// 	selectTo = Number(option.dataset.value);
				// }

				// updateCheckboxActive(checkboxBlocks, selectFrom, selectTo, answerMessage);
				// console.log(selectFrom, '-', selectTo, 'count:', count);
			}

			if (containsClass(YearsOption, 'clear')) {
				// console.log('optionClear====');
				// count++;

				inputYears.innerHTML = '';
				// if (optionContainsFrom) {
				// 	selectFrom = 0;
				// 	updateCheckboxActive(checkboxBlocks, selectFrom, selectTo, answerMessage);
				// }
				// if (optionContainsTo) {
				// 	selectTo = 0;
				// 	updateCheckboxActive(checkboxBlocks, selectFrom, selectTo, answerMessage);
				// }
				// console.log(selectFrom, '-', selectTo, 'count:', count);
			}
			// если есть selectFrom, selectTo, то 1-2
		}
		return;
	});

	// ====спрятать список годов====
	document.addEventListener('click', function (e) {
		if (!e.target.closest('.years__input')) {
			// console.log(e.target, selectInput);
			document.querySelectorAll('.years__input').forEach(selectInput => {
				removeClass(selectInput, 'active');
				removeClass(selectInput.nextElementSibling, 'active');
			});
			// console.log('глобал ин');
		}
		// console.log('глобал');
	});
};

const yearsInit = () => {
	yearsShowSelect();
	// checkboxComponent('years');
	// const textOpen = 'Показать все поколения';
	// document.querySelector('.years__show-more').addEventListener('click', btnShowMoreClick.bind(null, '.years__checkbox-block', 6, textOpen));
};

const yearsDefaultState = () => {
	document.querySelectorAll('.years__input').forEach(selectInput => {
		removeClass(selectInput, 'active');
		const selector = selectInput.nextElementSibling;
		removeClass(selector, 'active');
		const option = selector.querySelectorAll('.option');
		removeClassArray(option, 'active');
	});
	document.querySelector('.select-from>.clear').click();
	document.querySelector('.select-to>.clear').click();

	// const textOpen = 'Показать все поколения';
	// blockVisible('.years__checkbox-block', '.years__show-more', 6, textOpen);
	// resetAnswer('years__block', 'Любой год');
};

// const resetYears = () => {
// const textOpen = 'Показать все поколения';
// blockVisible('.years__checkbox-block', '.years__show-more', 6, textOpen);
// };

export { yearsDefaultState, yearsInit, yearsShowSelect };
