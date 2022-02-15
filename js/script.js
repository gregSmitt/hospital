window.addEventListener('load', () => {


	//=======================================For WEBP-format=======================================

	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}


	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});
	//=======================================Sidebar=======================================
	let burger = document.querySelector('.burger');
	let aside = document.querySelector('.sidebar');
	let closeAside = aside.querySelector('.sidebar__close');
	let menu = document.querySelector('.menu');
	let wall = document.querySelector('.wall');
	let YOffset;
	let container = document.querySelector('.container');



	burger.addEventListener('click', (e) => {
		YOffset = window.pageYOffset;
		if (!aside.classList.contains('active')) {
			opacityOn(wall, 300);
			opacityOn(aside, 300);
			document.querySelector('body').classList.add('overflow-hidden');
			container.style.top = -YOffset + 'px';
		}
	});

	closeAside.addEventListener('click', (e) => {
		opacityOff(aside, 300);
		opacityOff(wall, 300);
		document.querySelector('body').classList.remove('overflow-hidden');
		container.style.top = 0;
		window.scrollTo(0, YOffset);
	})
	aside.addEventListener('click', (e) => {
		// console.log();
		if (e.target.classList.contains('sidebar__container')) {
			opacityOff(aside, 300);
			opacityOff(wall, 300);
			document.querySelector('body').classList.remove('overflow-hidden');
			container.style.top = 0;
			window.scrollTo(0, YOffset);
		}
	})

	function opacityOn(element, time) {
		element.classList.add('active');
		element.animate([
			{
				opacity: 0,
			},
			{
				opacity: 1,
			}
		], { duration: time });
	}

	function opacityOff(element, time) {
		let animate = element.animate([
			{
				opacity: 1
			},
			{
				opacity: 0
			}
		], { duration: time });
		animate.addEventListener('finish', function () {
			element.classList.remove('active');
		});
	}


	//добавляю и убираю класс .active пункту меню и анимирую появление/исчезновение списков
	menu.addEventListener('click', (e) => {
		let menuPoint = e.target.parentNode.parentNode;
		let thisClassList = menuPoint.classList;
		let pointList = menuPoint.querySelector('.menu__links');
		if (thisClassList.contains('menu__point')) {
			if (pointList !== null) {
				if (!thisClassList.contains('active')) {
					thisClassList.add('active');
					pointList.animate([
						{
							width: 0,
							height: 0,
							opacity: 0,
							padding: 0
						},
						{
							width: pointList.clientWidth + 'px',
							height: pointList.clientHeight + 'px',
							opacity: 1
						}
					], { duration: 300 });
				} else {
					let animate = pointList.animate([
						{
							width: pointList.clientWidth + 'px',
							height: pointList.clientHeight + 'px',
							opacity: 1
						},
						{
							width: 0,
							height: 0,
							opacity: 0,
							padding: 0
						}
					], { duration: 300 });
					animate.addEventListener('finish', function () {
						thisClassList.remove('active');
					});
				}
			}
		}
	})







	//=======================================Footer=======================================


	let windowWidth = window.innerWidth;
	if (windowWidth < 568) {
		let footer = document.querySelector('.footer');
		footer.addEventListener('click', (e) => {
			if (e.target.classList.contains('block__title')) {
				toggleSpoiler(e.target, 300);
			}

		});
	}

	function toggleSpoiler(title, time) {
		let spoiler = title.nextSibling.nextElementSibling;
		if (!spoiler.classList.contains('active')) {
			unrollSpoiler(spoiler, time);
			title.classList.add('active');
		} else {
			title.classList.remove('active');
			rollSpoiler(spoiler, time);
		}
	}

	function unrollSpoiler(spoiler, time) {

		spoiler.classList.add('active');
		spoiler.animate([
			{
				height: 0,
				// padding: 0
			},
			{
				height: spoiler.clientHeight + 'px',
			}
		], { duration: time });
	}

	function rollSpoiler(spoiler, time) {
		let animate = spoiler.animate([
			{
				height: spoiler.clientHeight + 'px',
			},
			{
				height: 0,
				// padding: 0
			}
		], { duration: time });
		animate.addEventListener('finish', function () {
			spoiler.classList.remove('active');
		});
	}

	//===================================Slider=====================================
	new Swiper('.slider__container', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		// loop: true,
		// slidesPerGroup: 1,
		// loadPrevNext: false,
		slidesPerView: 3,
		breakpoints: {
			200: {
				slidesPerView: 1,
				spaceBetween: 30
			},
			568: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			// 968: {
			// },
			1228: {
				slidesPerView: 3,
				spaceBetween: 30
			}
		},
	});

	//=======================================form=====================================

	let sectionForm = document.querySelector('.form');
	sectionForm.addEventListener('focusin', (e) => {
		if (e.target.classList.contains('is-input')) {
			let lable = e.target.nextSibling.nextElementSibling;
			if (!lable.classList.contains('none')) {
				lable.classList.add('none');
			}
			e.target.addEventListener('focusout', () => {
				if (e.target.value == '') {
					lable.classList.remove('none');
				}
			})
		}
	})


	//=========================================section__links==========================

	if (windowWidth >= 568) {
		let sectionLinksArea = document.querySelector('.section__links');
		if (sectionLinksArea) {
			let sectionLinks = sectionLinksArea.querySelectorAll('.section__link');
			//Раскидываю ссылки по двум колонкам
			sectionLinks.forEach((elem, id) => {
				if ((sectionLinks.length % 2) == 0) { //для четного числа ссылок
					if ((id + 1) > (sectionLinks.length / 2)) {
						elem.classList.add('col2');
					}
				} else if ((id + 1) > (sectionLinks.length / 2 + 1)) { //для нечетного числа ссылок
					elem.classList.add('col2');
				} else elem.classList.add('col1');
			});

			//передвигаю второй столбец вверх (отключи и посмотри как выглядит без этого - полный пиздец)
			let elemsOfCol2 = sectionLinksArea.querySelectorAll('.col2');
			elemsOfCol2.forEach((elem, id) => {
				elem.style.gridRowStart = id + 1;
			});
		}
	}

});




