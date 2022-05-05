import KEYS from './keys.js';

class Keyboard {
  constructor() {
    this.keys = KEYS;
    this.container = null;
    this.textarea = null;
    this.keyboard = null;

    this.init();
  }

  init() {
    this.container = document.createElement('div');
    this.container.classList.add('container');

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('textarea');
    this.textarea.setAttribute('cols', 30);
    this.textarea.setAttribute('rows', 10);

    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');

    document.body.append(this.container);
    this.container.append(this.textarea, this.keyboard);

    this.keys.forEach((key) => {
      const keyNode = document.createElement('button');
      keyNode.setAttribute('type', 'button');
      keyNode.innerHTML = key.classes.includes('letter') ? key.eng.toUpperCase() : key.eng;
      key.classes.forEach((el) => keyNode.classList.add(el));

      this.keyboard.append(keyNode);
    });

    this.textarea.focus();
    this.textarea.addEventListener('blur', () => {
      this.textarea.focus();
    });
  }
}

export default Keyboard;
