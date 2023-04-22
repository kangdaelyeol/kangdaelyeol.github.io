'use strict';

// var for NAVBARFUNCTION
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

const title = document.querySelector('#title');
const title__introduce = document.querySelector('.title__introduce');
const title__btn = document.querySelector('.title__image .btn');
const title__video = document.querySelector('.title__video');
const video__src = title__video.querySelector("video");

const nav__item = document.querySelector('.nav__navbar');

const navbaritem = navbar.querySelectorAll('.navbar__item');

const contactBtn = document.querySelector('.title__button');

const arrowBtn = document.querySelector('.arrow');
let arrowSetTime = null;

const mediaNav = document.querySelector('.nav__ul');
const hamburger = document.querySelector('.nav__btn');

const scrollbar = document.querySelectorAll('.scrollbar');

// 해당 노드(DOM)을 받고 window.scrollTo해주는 함수
const scrollhandler = (DOM) => {
	const ItemHeight = DOM.offsetTop;
	// DOM.scrollIntoView({behavior:"smooth"});
	window.scrollTo({
		behavior: 'smooth',
		top: ItemHeight - navbarHeight,
	});
};

// id만 받고 nav__border 교체 해주는 함수
const navbarhandler = (id) => {
	const curnav = mediaNav.querySelector('.item__active');
	const changenav = mediaNav.querySelector(`[data-link="${id}"]`);
	curnav.classList.remove('item__active');
	changenav.classList.add('item__active');
};

// for scroll -> item height
// console.log(scrollbar[3].offsetTop);
let navbarItemHeight = [];
Array.from(scrollbar).forEach((e) => {
	navbarItemHeight.push(e.offsetTop);
});

// scrollNav
const handleNav = (e) => {
	const targetData = e.target.dataset.link;
	if (!targetData) return;
	const targetNode = document.querySelector(targetData);
	scrollhandler(targetNode);

	mediaNav.classList.remove('nav-media__active'); // for media

	navbarhandler(targetData);
};

nav__item.addEventListener('click', handleNav);

// FIXnav
const handleScroll = () => {
	const titleRect = title.getBoundingClientRect().bottom;
	const scrollPosition = window.scrollY;
	const opacity = (titleRect - scrollPosition + 400) / titleRect;
	title.style.opacity = opacity;
	if (navbarHeight < scrollPosition) {
		navbar.classList.add('navbar__active');
	} else {
		navbar.classList.remove('navbar__active');
	}

	// arrowBtn
	if (scrollPosition > 200) {
		arrowBtn.classList.remove('arrow__none');
	} else {
		arrowBtn.classList.add('arrow__none');
	}

	// navbar__item - active
};

document.addEventListener('scroll', handleScroll);

// CONTACTbutton
const handleContactBtn = (e) => {
	const contact = document.querySelector('#contact');
	scrollhandler(contact);
	navbarhandler('#contact');
};

contactBtn.addEventListener('click', handleContactBtn);

const handlearrow = () => {
	scrollhandler(navbaritem[0]);
	navbarhandler('#title');
};

arrowBtn.addEventListener('click', handlearrow);

// WORK BTN

const projectBtn = document.querySelector('.project__section');
const projectBtnList = projectBtn.querySelectorAll('.project__btn');
const projectLayout = document.querySelector('.project__layout');
const projectImgList = projectLayout.querySelectorAll('.project__img');

const handleProjectBtn = (e) => {
	const data = e.target.dataset.project || e.target.parentNode.dataset.project;
	if (!data) return;
	const currentActiveBtn = document.querySelector(
		'.project__section .project__active'
	);
	let btnNode;
	if (
		e.target.nodeName === 'SPAN'
			? (btnNode = e.target.parentNode)
			: (btnNode = e.target)
	);
	if (btnNode === currentActiveBtn) return;
	else {
		currentActiveBtn.classList.remove('project__active');
		btnNode.classList.add('project__active');
	}

	projectLayout.classList.add('project__invisible');
	setTimeout(() => {
		Array.from(projectImgList).forEach((e) => {
			if (e.dataset.filter === data || data === 'all') {
				e.classList.remove('project__img-invisible');
			} else {
				e.classList.add('project__img-invisible');
			}
		});
		projectLayout.classList.remove('project__invisible');
	}, 200);
};

projectBtn.addEventListener('click', handleProjectBtn);

// nav event

const handlemedia = (e) => {
	mediaNav.classList.toggle('nav-media__active');
};

hamburger.addEventListener('click', handlemedia);

const navIds = [
	'#title',
	'#about',
	'#skills',
	'#work',
	'#certificates',
	'#contact',
];

const navItems = navIds.map((id) => document.querySelector(id));

const navBtnItems = navIds.map((id) =>
	mediaNav.querySelector(`[data-link="${id}"]`)
);

const options = {
	root: null,
	rootmargin: '0px',
	threshold: 0.4,
};

let changeNavId = '#title';
const handleObserve = (entries, observe) => {
	entries.forEach((e) => {
		if (!e.isIntersecting && e.intersectionRatio > 0) {
			let itemIndex = navItems.indexOf(e.target);
			if (e.boundingClientRect.y < 0)
				itemIndex = navItems.indexOf(e.target) + 1;
			else itemIndex = navItems.indexOf(e.target) - 1;
			changeNavId = navIds[itemIndex];
		}
	});
};

const handlewheel = () => {
	if (window.scrollY === 0) changeNavId = navIds[0];
	else if (
		Math.ceil(window.scrollY + window.innerHeight) ===
		document.body.clientHeight
	)
		changeNavId = navIds[navIds.length - 1];
	navbarhandler(changeNavId);
};

// setTitleHeight

const setTitleHeight = () =>{
  const innerHeight = window.innerHeight;
  title.style.height = `${innerHeight}px`
}




/* 
  setVideoSize
  videoSource(what shown to client literally) 크기는 이후 변경되는 video node(element)의 크기에 따라 맞춰지지 않음
  , 따라서 초기 설정겂, 비율을 그대로 유지 해야함.
 */

const vh = 1080;
const vw = 1920;
const vR = vw/vh;

const setVideoSize = () => {
  const sh = window.innerHeight;
  const sw = document.body.offsetWidth;
  // 가로대 세로 비율
  const sR = sw/sh;
  if(sR > vR) {
    // 스크린이 더 길쭉 -> video width 조정 -> videoHeight 초과
    const newVw = sw;
    const newVh = sw * vh/sw;
    video__src.style.width = `${newVw}px`;
    video__src.style.height = `${newVh}px`;
    
    // set Video location
    // height 초과 -> 초과분의 절반을 위로 이동 -> 중앙 정렬
    const movingHeight = (newVh - sh) / 2;
    video__src.style.transform = `translateY(-${movingHeight}px)`;
  } else {
    // 비디오가 더 길쭉 -> video height 조정 -> videoWidth 초과
    const newVh = sh;
    const newVw = sh * vw/vh;
    video__src.style.height = `${newVh}px`;
    video__src.style.width = `${newVw}px`;

    // set Video location
    // width초과 -> 초과분의 절반을 왼쪽으로 이동 -> 중앙 정렬
    const movingWidth = (newVw - sw) / 2;
    video__src.style.transform = `translateX(-${movingWidth}px)`;
  }

}

const setSize = () => {
	setTitleHeight()
  setVideoSize();
};

const resizingElements = (e) => {
	setTitleHeight();
  setVideoSize();
};

// Title img btn event
title__btn.addEventListener('click', () => {
	title__introduce.classList.add('mystory');
});
title__video.addEventListener('click', () => {
	title__introduce.classList.remove('mystory');
});
window.addEventListener('wheel', handlewheel);
const observer = new IntersectionObserver(handleObserve, options);
for (let id in navItems) {
	observer.observe(navItems[id]);
}

window.addEventListener('load', setSize);
window.addEventListener('resize', resizingElements);
