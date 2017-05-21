function backgroundPoints() {
	var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d');

	var width = canvas.width = document.body.clientWidth,
		height = canvas.height = document.body.clientHeight;
	var points = [],
		pointsCount;

	var userPos = {x: width/2, y: height/2},
		minDistance = 250;

	window.addEventListener('resize', canvas_onresize);

	function canvas_onresize() {
		width = canvas.width = document.body.clientWidth;
		height = canvas.height = document.body.clientHeight;
	}

	window.addEventListener('resize', changePointsCount);
	changePointsCount();

	function changePointsCount() {
		console.log(pointsCount);
		if(document.documentElement.clientWidth < 768) {
			pointsCount = 100;
		} else {
			pointsCount = 200;
			generatePoints();
		}
	}

	function getX() {
		return Math.round(Math.random() * width);
	}
	function getY() {
		return Math.round(Math.random() * height);
	}
	function getRandNum(max) {
		return Math.round(Math.random() * max * 1.5) - max + 0.4;
	}

	function xSort(a, b) {
		return a.x - b.x;
	}

	generatePoints();
	function generatePoints() {
		for (var i = 0; i < pointsCount; i++) {
			var point = {
				x: getX(),
				y: getY(),
				speedX: getRandNum(2),
				speedY: getRandNum(2),
				size: (Math.round(Math.random() * 5))
			};
			points.push(point);
		}
	}

	document.body.addEventListener('mousemove', function(event) {
		userPos.x = event.pageX;
		userPos.y = event.pageY;
	});

	update();

	function update() {
		ctx.globalAlpha = 0.2;
		ctx.clearRect(0, 0, width, height);
		var nearlyPoints = [];

		for (var i = 0; i < pointsCount; i++) {
			var point = points[i],
				d = Math.sqrt((point.x - userPos.x)*(point.x - userPos.x) + (point.y - userPos.y)*(point.y - userPos.y));



			if(point.x < 0) {
				point.x = width;
			}
			if(point.x > width) {
				point.x = 0;
			}
			if(point.y > height) {
				point.y = 1;
			}
			if(point.y < 0) {
				point.y = height;
			}

			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = '#000';
			ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();

			if(d < minDistance) {
				nearlyPoints.push(point);
			}
			point.x += point.speedX;
			point.y += point.speedY;
		}

		nearlyPoints.sort(xSort);

		ctx.beginPath();
		ctx.strokeStyle = 'red';
		ctx.lineWidth = .20;
		for (var i = 1; i < nearlyPoints.length; i++) {
			for (var j = 0; j < nearlyPoints.length; j++) {
				ctx.moveTo(nearlyPoints[i].x, nearlyPoints[i].y);
				ctx.lineTo(nearlyPoints[j].x, nearlyPoints[j].y);
			}
		}
		ctx.stroke();

		requestAnimationFrame(update);
	}
}

if(document.documentElement.clientWidth > 765) {
	backgroundPoints();
}

function settingSizes() {
	// Функция получает массив dom элементов
	// И задаём им высоту равной их ширине.
	function setHeightByWidth(elems) {
		elems.forEach = [].forEach;

		elems.forEach(function(e) {
			e.style.height = e.clientWidth + 'px';
		});
	}

	var stylesCards = document.querySelectorAll('.styles_card');
	setHeightByWidth(stylesCards);
}
settingSizes();

window.addEventListener('resize', menuSettings);

menuSettings();

function menuSettings() {
	var menu = getElementByClass('menuLine');
	
	setNeedenClassToMenu();

	window.addEventListener('scroll', function(event) {
		setNeedenClassToMenu();
	});

	function setNeedenClassToMenu() {
		if(this.scrollY > menu.clientHeight) {
			menu.classList.add('menuLine_dark');
		} else {
			menu.classList.remove('menuLine_dark');
		}
	}
	menuConfs();

	function menuConfs() {
		var menu_main = getElementByClass('menu'),
			menu_main_children = menu_main.querySelectorAll('a'),
			humburger = document.querySelector('.humburger'),
			humburgerInner = document.querySelector('.humburgerInner'),
			isMenuActive = false,
			menuMaxHeight;

		if(document.documentElement.clientWidth < 765) {
			menu_main.style.height = 'auto';
			menuMaxHeight = menu_main.clientHeight;
			menu_main.style.height = '35px';

			// Humburger Settings
			humburger.addEventListener('click', function() {
				if(isMenuActive) {
					isMenuActive = false;
					humburgerInner.classList.remove('activeHumburger');
					menu_main.style.height = '35px';
				} else {
					isMenuActive = true;
					humburgerInner.className += ' activeHumburger';
					menu_main.style.height = menuMaxHeight + 'px';
				}
			});
		}
		// Menu Elements Settings
		menu_main_children.forEach = [].forEach;
		menu_main_children.forEach(function(el) {
			el.addEventListener('click', function() {
				console.log('click');
				menu_main_children.forEach(function(el2) {
					el2.style.order = 0;
					el2.classList.remove('menu_activeElement');
				})
				if(document.documentElement.clientWidth < 765) {
					el.style.order = -1;
				}
				el.classList.add('menu_activeElement');
			});
		});

		//////////////////////////////////

		var sectionsOffsets = [
			{name: 'benefit', value: 0},
			{name: 'styles', value: 0},
			{name: 'aboutTeacher', value: 0},
			{name: 'gallery', value: 0},
			{name: 'contacts', value: 0},
		];

		sectionsOffsets.forEach(function(el) {
			var section = document.getElementById(el.name);
			temp = el.value = section.offsetTop - 10;
		});
		console.log(sectionsOffsets);

		window.addEventListener('scroll', function() {
			temp(0);
			function temp(i) {
				if(window.scrollY > sectionsOffsets[sectionsOffsets.length-1].value) {
					menu_main_children.forEach(function(el2) {
						el2.style.order = 0;
						el2.classList.remove('menu_activeElement');
					});
					if(document.documentElement.clientWidth < 765) {
						menu_main_children[menu_main_children.length-1].style.order = -1;
					}
					menu_main_children[menu_main_children.length-1].classList.add('menu_activeElement');
					return;
				} else if(window.scrollY > sectionsOffsets[i].value) {
					temp(++i);
				} else if(window.scrollY > sectionsOffsets[0].value) {
					menu_main_children.forEach(function(el2) {
						el2.style.order = 0;
						el2.classList.remove('menu_activeElement');
					});
					if(document.documentElement.clientWidth < 765) {
						menu_main_children[i-1].style.order = -1;
					}
					menu_main_children[i-1].classList.add('menu_activeElement');
				}
			}
		});
	}
}

function getElementByClass(className) {
return document.querySelector('.' + className) || document.getElementsByClassName(className)[0];
}