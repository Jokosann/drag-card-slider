const container = document.querySelector('.container');
const carousel = document.querySelector('.carousel');
const arrowBtn = document.querySelectorAll('.container i');
const firstCardwidth = document.querySelector('.card').offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false,
	startX,
	startscrollLeft,
	timeOutId;
// jumlah card yang ditampilkan dilayar manapun
let cardPerView = Math.round(carousel.offsetWidth / firstCardwidth);

carouselChildrens
	.slice(-cardPerView)
	.reverse()
	.forEach((card) => {
		carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
	});

carouselChildrens.slice(0, cardPerView).forEach((card) => {
	carousel.insertAdjacentHTML('beforeend', card.outerHTML);
});

// animasi scroll sendiri selama 2.5s
const autoPlay = () => {
	if (window.offsetWidth < 800) return;
	timeOutId = setTimeout(() => (carousel.scrollLeft += firstCardwidth), 2500);
};

autoPlay();

const dragStart = (e) => {
	isDragging = true;
	carousel.classList.add('dragging');
	startX = e.pageX;
	startscrollLeft = carousel.scrollLeft;
};

const dragEnd = () => {
	isDragging = false;
	carousel.classList.remove('dragging');
};

const dragging = (e) => {
	if (!isDragging) return; //true
	carousel.scrollLeft = startscrollLeft - (e.pageX - startX);
};

// membuat scroll tak terbatas dan melampauinya
const infiniteScroll = () => {
	if (carousel.scrollLeft === 0) {
		// ? menghilangkan transisi pindahnya
		carousel.classList.add('no-transition');
		// jika scroll mentok kiri maka akan otomatis ke ujung kanan
		carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
		carousel.classList.remove('no-transition');
	} else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
		carousel.classList.add('no-transition');
		// jika scroll mentok kanan maka akan otomatis ke ujung kiri
		carousel.scrollLeft = carousel.offsetWidth;
		carousel.classList.remove('no-transition');
	}

	clearTimeout(timeOutId);
	if (!container.matches(':hover')) autoPlay();
};

arrowBtn.forEach((btn) => {
	btn.addEventListener('click', () => {
		carousel.scrollLeft += btn.id === 'left' ? -firstCardwidth : firstCardwidth;
	});
});

function test() {
	alert('ok');
}

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', dragEnd);
carousel.addEventListener('scroll', infiniteScroll);
container.addEventListener('mouseenter', () => clearTimeout(timeOutId));
container.addEventListener('mouseleave', autoPlay);
