import { chat3 } from './components/chat.js';
import { filter } from './components/filter.js';
// import { mileageInit } from './components/mileage.js';
// import { ownerInit } from './components/owner.js';
// import { sliderMethod } from './components/report.js';
import stickyConsultant from './components/stickyConsultant.js';
// import { blockVisible, btnShowMoreClick } from './components/visibleBlockAndBtnShowMore.js';
// import { yearsInit } from './components/years.js';

// NOTE:===========CHAT start===========
chat3();
// ========= sticky consultant при скролле страницы=========
window.addEventListener('scroll', stickyConsultant);

// =============FILTER==================
filter();

// NOTE: =================MODEL CHOICE===============
// ========================================

// NOTE: =================YEARS===============

// yearsInit();
//* yearsShowSelect();
// ====== обнуление инпута года выпуска/поколений ======
// // resetYears()
// ====== блоки с выбором года выпуска (поколений) ======
//* checkboxComponent('years');
// ====КНОПКА "ПОКАЗАТЬ ВСЕ ПОКОЛЕНИЯ"=====
//* blockVisible('.years__checkbox-block', '.years__show-more', 6, 'Показать все поколения');
//* document
//* 	.querySelector('.years__show-more')
//* 	.addEventListener('click', btnShowMoreClick.bind(null, '.years__checkbox-block', 6, 'Показать все поколения'));

// // ======обнуление кнопки "ПОКАЗАТЬ ВСЕ ПОКОЛЕНИЯ"======
// // для обнуления вызывать: =>
// // blockVisible('years__checkbox-block', 'years__show-more', 6, 'Показать все сведения');
// // =============================

// // NOTE: ========CHOICE CAR=============
// // =============swiper============
// заменён на fancy box-carousel
// sliderMethod.init();
// // ==========================
