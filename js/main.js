import Keyboard from './keyboard.js';

const KEYBOARD = new Keyboard();

window.addEventListener('mousedown', (e) => {
  if (e.target.tagName === 'BUTTON') {
    KEYBOARD.press(e.target.dataset.code);
  }
});

window.addEventListener('mouseup', (e) => {
  if (e.target.tagName === 'BUTTON') {
    KEYBOARD.unpress(e.target.dataset.code);
  }
});

window.addEventListener('keydown', (e) => {
  KEYBOARD.press(e.code);
  e.preventDefault();
});

window.addEventListener('keyup', (e) => {
  KEYBOARD.unpress(e.code);
  e.preventDefault();
});
