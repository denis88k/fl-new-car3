import { addClass, containsClass, removeClass } from './helpers.js';
// import modal from './modal.js';

const modalErrorDelete = modal => {
	modal.querySelectorAll('.form__input')?.forEach(input => {
		removeClass(input, 'just-validate-error-field');
	});
	modal.querySelectorAll('.just-validate-error-label')?.forEach(errorElement => errorElement.remove());
};

const choiceCarBlocks = document.querySelector('.choice-car__blocks');
choiceCarBlocks.addEventListener('click', e => {
	// console.log(e.target, 'target');
	const btnOpen = e.target;
	if (containsClass(btnOpen, 'choice-car__btn-buy') || containsClass(btnOpen, 'choice-car__btn-order')) {
		let modal;
		// кнопка купить
		if (containsClass(btnOpen, 'choice-car__btn-buy')) {
			modal = document.querySelector('.modal-btnUnderCar');
		}
		// кнопка забронировать
		if (containsClass(btnOpen, 'choice-car__btn-order')) {
			modal = document.querySelector('.modal-btnUnderCar-2');
		}
		const btnClose = document.querySelector('.modal-btnUnderCar .modal__close');
		const body = document.body;

		const removeActiveClassModal = () => {
			removeClass(body, '_lock');
			removeClass(modal, 'active');
			modalErrorDelete(modal);
			btnClose.removeEventListener('click', removeActiveClassModal);
		};
		// открытие модального окна
		e.preventDefault();
		addClass(body, '_lock');
		addClass(modal, 'active');

		// закрытие модального окна: по кнопке
		btnClose?.addEventListener('click', removeActiveClassModal, { once: true });
		// закрытие модального окна: по области вокруг модального окна
		// const removeActiveClassModalClick = e => {
		// 	if (e.target === modal) {
		// 		removeActiveClassModal();
		// 	}
		// };
		// modal?.addEventListener('click', removeActiveClassModalClick, { once: true });
		modal?.addEventListener(
			'click',
			e => {
				if (e.target === modal) {
					removeActiveClassModal();
				}
			},
			{ once: true },
		);
	}
});
