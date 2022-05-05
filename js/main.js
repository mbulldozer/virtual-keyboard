import Keyboard from './keyboard.js';

const KEYBOARD = new Keyboard();

window.addEventListener('mousedown', (e) => {
  if (e.target.tagName === 'BUTTON') {
    e.target.classList.add('pressed');
  }
});

window.addEventListener('mouseup', (e) => {
  if (e.target.tagName === 'BUTTON') {
    e.target.classList.remove('pressed');
  }
});
