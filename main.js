'use strict';

// var for NAVBARFUNCTION
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

const title = document.querySelector('#title');
const title__introduce = document.querySelector(".title__introduce");
const title__btn = document.querySelector(".title__image .btn");
const title__backbtn = document.querySelector(".title__back");

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
    '.project__section .project__active',
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
  mediaNav.querySelector(`[data-link="${id}"]`),
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

// Title img btn event
title__btn.addEventListener("click", () => {
  title__introduce.classList.add("mystory");
})
title__backbtn.addEventListener("click", () => {
  title__introduce.classList.remove("mystory");
})
window.addEventListener('wheel', handlewheel);
const observer = new IntersectionObserver(handleObserve, options);
for (let id in navItems) {
  observer.observe(navItems[id]);
}
