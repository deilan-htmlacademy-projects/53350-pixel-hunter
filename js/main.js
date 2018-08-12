"use strict";

const INITIAL_SLIDE = 0;

const mainEl = document.querySelector(`#main`);
const templateEls = document.querySelectorAll(`template`);

const paginator = window.createPaginator();
document.body.appendChild(paginator);

const slider = new window.Slider(mainEl, templateEls);

document.addEventListener(`keydown`, window.getSliderKeyboardHandler(slider));
const btns = paginator.querySelectorAll(`button`);
btns[0].addEventListener(`click`, slider.prev.bind(slider));
btns[1].addEventListener(`click`, slider.next.bind(slider));

slider.selectSlide(INITIAL_SLIDE);
