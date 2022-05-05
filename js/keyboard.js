import KEYS from './keys.js';

class Keyboard {
  constructor() {
    this.keys = KEYS;
    this.container = null;
    this.textarea = null;
    this.keyboard = null;
    this.pressed = [];
    this.keyNodes = [];

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
      keyNode.dataset.code = key.code;
      keyNode.innerHTML = key.eng;
      key.classes.forEach((el) => keyNode.classList.add(el));

      this.keyNodes.push(keyNode);
      this.keyboard.append(keyNode);
    });

    this.textarea.focus();
    this.textarea.addEventListener('blur', () => {
      this.textarea.focus();
    });
  }

  pressKey(code) {
    const node = this.keyNodes.find((el) => el.dataset.code === code);
    if (node) {
      this.pressed.push(code);
      node.classList.add('pressed');
    }
  }

  press(code) {
    this.pressKey(code);
  }

  unpressKey(code) {
    const node = this.keyNodes.find((el) => el.dataset.code === code);
    if (node) {
      this.pressed = this.pressed.filter((el) => el !== code);
      node.classList.remove('pressed');
    }
  }

  unpress(code) {
    this.unpressKey(code);
  }
}

export default Keyboard;
