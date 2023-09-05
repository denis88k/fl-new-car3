import { Carousel } from '@fancyapps/ui/dist/carousel/carousel.esm.js';

const sliderCarousel = document.querySelector('.choice-car__wrapper');
const choiceSlide = sliderCarousel.querySelectorAll('.choice-car__slide');
const choiceSlideImg = choiceSlide[0].querySelector('img');

const options = {
	Dots: false,
	infinite: true,
	transition: 'slide',
};

export const sliderStart = () => {
	if (window.innerWidth <= 800) {
		const sliderCarousel = document.querySelectorAll('.choice-car__wrapper');
		sliderCarousel.forEach(slider => {
			new Carousel(slider, options);
		});
	}
};
// если есть картинка при первой загрузки страницы, то инициализируется слайдер
// для git
// if (window.innerWidth === 800) {
// 	if (choiceSlideImg.dataset.lazySrc) {
// 		new Carousel(sliderCarousel, options);
// 	}
// }

// для прод
// export const sliderReset = () => {
// 	sliderStart();
// };
