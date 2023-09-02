import { addClass, closestElement, containsClass, removeClass, removeClassArray, toggleClass } from './helpers.js';

const yearsShowSelect = () => {
	// let count = 0;

	const selects = document.querySelector('.years__selects');
	const inputTextFrom = document.querySelector('.input-text-from');

	selects.addEventListener('click', e => {
		const selectInput = closestElement(e.target, 'years__input');
		const YearsOption = closestElement(e.target, 'years__option');
		// если нажали на инпут год
		if (selectInput) {
			// console.log('selectInput====');
			// count++;
			const selector = selectInput.nextElementSibling; // блок со списком годов
			toggleClass(selectInput, 'active');
			toggleClass(selector, 'active');
			// console.log(selectFrom, '-', selectTo, 'count:', count);
		}

		// если выбран год
		if (YearsOption) {
			const selector = YearsOption.closest('.years__select');
			const options = selector.querySelectorAll('.option');
			removeClassArray(options, 'active');
			const selectInput = selector.previousElementSibling;
			const inputYears = selectInput.querySelector('.input-years'); // вписывается год при выборе года
			const optionContainsFrom = containsClass(YearsOption.parentElement, 'select-from');
			const optionContainsTo = containsClass(YearsOption.parentElement, 'select-to');
			const checkboxBlocks = document.querySelectorAll('.years__checkbox-block'); // блоки checkbox с поколениями
			// если нажали на год
			if (containsClass(YearsOption, 'option')) {
				// console.log('option====', YearsOption);
				// count++;
				const option = YearsOption.closest('.option');
				addClass(option, 'active');
				inputYears.innerHTML = option.dataset.value;

				if (optionContainsFrom) {
					inputTextFrom.innerHTML = 'до';
				}
			}
			// если нажали на "очистить"
			if (containsClass(YearsOption, 'clear')) {
				// console.log('optionClear====');
				// count++;
				inputTextFrom.innerHTML = 'Год до';
				inputYears.innerHTML = '';
			}
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
};

export { yearsDefaultState, yearsInit, yearsShowSelect };
