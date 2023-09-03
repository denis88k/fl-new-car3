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

// choice-car
import './components/modalChoiceCar.js';
