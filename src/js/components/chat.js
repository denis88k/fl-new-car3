import { filterReset } from './filter.js';
import { addClass, closestElement, containsClass, removeClass, removeClassArray } from './helpers.js';
import { sliderReset } from './slider.js';
// import { yearsDefaultState } from './years.js';

// =========скроллы========
// скролл до начала сообщения от консультанта +10px вверх
const scrollMsg = msg => {
	window.scrollBy({
		top: msg.offsetHeight + 10, // скролл на высоту сообщения консультанта
		behavior: 'smooth',
	});
};

// прокрутка до определённого сообщения
const scrollIntoViewOptions = {
	behavior: 'smooth',
	block: 'end',
	inline: 'nearest',
};

// скролл до начала новой темы чата, после того, как все сообщения появились
const scrollChat = chat => {
	const elementPosition = chat.getBoundingClientRect().top; //расстояние от элемента до верхней части экрана
	const consultantSticky = document.querySelector('.consultant_sticky');
	// если consultantSticky виден, то скроллится с учётом высоты этого стики, если нет, то без учёта
	const offsetPosition = elementPosition - (consultantSticky ? consultantSticky.offsetHeight : 0); // насколько нужно скролить
	window.scrollBy({
		top: offsetPosition,
		behavior: 'smooth',
	});
};

// ===========сам GIGA CHATIC==========
// необходим, т.к. будем сравнивать текущий чат, с другой относительной позицией чата, чтобы вернуться к прошлому чату
let numberChat = 0;
let animShowChat;

const chatMain = document.querySelector('.chat');
const chats = document.querySelectorAll('.chat-messages');
const chatLength = chats.length; // длина блоков чата 8

// скролл к концу чата
const scrollEndChat = () => {
	chatMain.scrollIntoView(scrollIntoViewOptions);
};

// NOTE: последние чаты
// const chatBlock = chatMain.querySelectorAll('.chat__block');
const chatLastBlock = document.querySelector('.chat-last-block');
const promoFooterInner = document.querySelector('.promo__footer-inner');
const footer = document.querySelector('.footer');

const showLastChat = chat => {
	setTimeout(() => {
		addClass(chatLastBlock, 'msg-show'); // 6
		addClass(promoFooterInner, 'active');
		addClass(footer, 'active');
		scrollChat(chat);
		animShowChat = false;
	}, 3800);
};
const hiddenLastChat = () => {
	removeClass(chatLastBlock, 'msg-show'); // 6
	removeClass(promoFooterInner, 'active');
	removeClass(footer, 'active');
};

// NOTE: удаление активных классов с чатов, которые отображены,
// дальше той секции блока, в котором произошёл клик
const resetActiveAllBlock = currentNumber => {
	for (let i = currentNumber + 1; i < chatLength; i++) {
		// ====NOTE: chat__message-block====
		// ====получаем кол-во блоков сообщений: анимация печати + вопрос консультанта
		const msgBlocks = chats[i].querySelectorAll('.chat__message-block');
		// блоки с анимацией печатания и с сообщениями консультанта --- удаляем в них активные классы
		msgBlocks.forEach(msgBlock => {
			// анимация печатания
			const msgPrint = msgBlock.querySelector('.chat__message-print'); // анимация печатания
			// сообщение с вопросом консультанта
			// удаление активных классов
			removeClass(msgPrint, 'msg-print-show');
		});
		// NOTE: блок CHOICE
		const msgBlocksChoice = chats[i].querySelector('.chat__message-block-choice');
		if (msgBlocksChoice) {
			// блок с выборами
			removeClass(msgBlocksChoice, 'msg-show');
			// блоки с вариантами выбора
			const BlocksChoice = msgBlocksChoice.querySelectorAll('.block-choice');
			BlocksChoice && removeClassArray(BlocksChoice, 'active');
		}

		// сообщение ответа клиента
		const msgClient = chats[i].querySelector('.chat__message-client');
		removeClass(msgClient, 'msg-show');
		// console.log(i, 'i');

		// очистка filter
		if (i === 1) {
			filterReset();
		}

		// если тема чата это предпоследний чат, то нужно скрыть:
		//  два последних чата и actual-promo и footer
		if (i === 2) {
			hiddenLastChat();
		}
	}
};

// =====ЛОГИКА ЧАТА2=====
const chat3 = () => {
	// console.log(numberChat, 'numberChat');
	animShowChat = true;

	// получаем блок чата
	// ====NOTE: chat=№
	const chat = chats[numberChat];
	// ====NOTE: chat__message-block====
	// ====получаем кол-во блоков сообщений: анимация печати + вопрос консультанта
	const msgBlocks = chat.querySelectorAll('.chat__message-block');

	// NOTE: показ сообщений консультанта и печатание
	numberChat &&
		msgBlocks.forEach((msgBlock, index) => {
			// анимация печатания
			const msgPrint = msgBlock.querySelector('.chat__message-print');

			setTimeout(() => {
				// анимация 'Ольга печатает...', задержка появления в 500мс
				setTimeout(() => {
					addClass(msgPrint, 'msg-print-show');
					numberChat && msgPrint && scrollMsg(msgPrint);
				}, 600);
				// скрытие о печатании консультанта
				// показ вопроса от консультанта
				// с задержкой в 2,5с + 550мс
				setTimeout(() => {
					// удаление анимации печатания
					removeClass(msgPrint, 'msg-print-show');
					// console.log(msgConsult, msgConsult.offsetHeight);
				}, 2500);
			}, index * 2500 + 650);
			// 2500 + 550:
			//						--- 550(500) - с запасом взятое время появления анимации печати,
			//						--- 2500 - время удаления + появления вопроса консультанта
			// итого время показа одного блока сообщений консультанта "2500+550=3050мс"
		});
	if (numberChat === 1) {
		sliderReset();
	}
	// ====NOTE: если номер чата равен 2 (последний пункт),
	// то нужно показать эти блоки и выйти
	if (numberChat === 2) {
		showLastChat(chat);
		return;
	}
	if (numberChat === 0) {
		animShowChat = false;
	}

	// NOTE: СООБЩЕНИЯ КЛИЕНТА
	// сообщение ответ клиента
	const msgAnswer = chat.querySelector('.chat__message-client');
	// блок choice
	const msgBlockChoice = chat.querySelector('.chat__message-block-choice');

	// ====текущий чат, эта переменная необходима, чтобы она замкнулась в прослушке функции следящая за блоком выборов и для блоков с multi
	const currentNumber = Number(chat.dataset.chat);
	// const currentNumber = numberChat;
	numberChat &&
		setTimeout(() => {
			// блок с выборами появляется, если он есть в секции чата
			msgBlockChoice && addClass(msgBlockChoice, 'msg-show');
			setTimeout(() => {
				// плавный скролл до начала нового блока чата с отступом
				// console.log('вниз до нового блока чата');
				numberChat && scrollChat(chat);
			});
			// появление всех блоков завершено
			setTimeout(() => {
				animShowChat = false;
			});
		}, 2500 * msgBlocks.length + 950);

	// ======NOTE: "блок с выборами"
	if (msgBlockChoice) {
		// console.log('choice', choice);

		// блоки c вариантами выбора, за которыми нужно следить
		// родитель блоков выбора
		const blocksChoice = msgBlockChoice.querySelector('.blocks-choice');
		// сами блоки выбора
		const blockChoiceAll = msgBlockChoice.querySelectorAll('.block-choice');

		const blockChoiceClick = e => {
			// console.log(animShowChat, 'choice');
			// console.log(e.target, 'target');
			if (
				containsClass(e.target, 'choice-car__btn-buy') ||
				containsClass(e.target, 'choice-car__tel') ||
				containsClass(e.target, 'choice-car__btn-order')
			) {
				return;
			}

			// блок на который нажали
			const block = closestElement(e.target, 'block-choice');
			// если текущий чат совпадает с глобальным номером чата,
			// то есть нажали на выбор в последнем доступном чате, то:
			if (currentNumber === numberChat && block) {
				// console.log('currentNumber === numberChat');
				removeClassArray(blockChoiceAll, 'active');
				// доб. класс active на нажатый выбор
				addClass(block, 'active');
				// ответ берём из data блока на который нажали
				msgAnswer.innerText = block.dataset.choice;
				// показываем сообщение ответ клиента
				addClass(msgAnswer, 'msg-show');
				// прокрутка вниз, до сообщения с ответом клиента, т.е. внизу окажется сообщение ответ клиента
				// console.log('вниз до сообщения ответа клиента');
				scrollEndChat();
				// увеличиваем счётчик чата, чтобы запустить следующий чат
				numberChat++;
				chat3();
			} else {
				// NOTE: когда меняем ответ в чате
				// но нас не пустит, пока animShowChat не станет === false
				// он меняется выше, после появление последнего блока
				if (!animShowChat && block) {
					// срабатывает когда нажимаешь на блок с выборами, на другой вариант
					// и тогда удаляются все активные классы в других темах чата
					// console.log('заново choice');
					// ====скрываем сообщение ответ клиента:
					removeClass(msgAnswer, 'msg-show');
					msgAnswer.innerText = block.dataset.choice;

					// удаляем активные классы с данного choice
					removeClassArray(blockChoiceAll, 'active');
					// доб. активный класс на тот блок, который нажали
					addClass(block, 'active');

					// ====NOTE: пройдёмся по всем секциям чата, которые отображены, дальше той секции блока, в котором произошёл клик
					resetActiveAllBlock(currentNumber);

					setTimeout(() => {
						// появляется сообщение клиента
						addClass(msgAnswer, 'msg-show');
						// скролл до конца сообщения клиента
						// прокрутка вниз, до сообщения с ответом клиента
						// console.log(currentNumber, 'last');
						scrollEndChat();
						// NOTE:
						// запускаем секцию чата, в которой произошёл клик, заново
						numberChat = currentNumber + 1;
						// console.log(numberChat, 'новый счёт choice');
						chat3();
					}, 200);
				} else return;
			}
		};

		blocksChoice.addEventListener('click', blockChoiceClick);
	}
};

export { chat3 };
