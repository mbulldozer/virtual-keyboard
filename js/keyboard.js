import KEYS from './keys.js';

class Keyboard {
  constructor() {
    this.keys = KEYS;
    this.container = null;
    this.textarea = null;
    this.keyboard = null;
    this.pressed = [];
    this.keyNodes = [];
    this.lang = localStorage.getItem('lang') || 'eng';

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
      keyNode.innerHTML = key[this.lang];
      key.classes.forEach((el) => keyNode.classList.add(el));

      this.keyNodes.push(keyNode);
      this.keyboard.append(keyNode);
    });

    this.textarea.focus();
    this.textarea.addEventListener('blur', () => {
      this.textarea.focus();
    });
  }

  chnageLang() {
    if (this.pressed.includes('ShiftLeft') && this.pressed.includes('AltLeft')) {
      this.lang = this.lang === 'eng' ? 'ru' : 'eng';
      localStorage.setItem('lang', this.lang);
    }
  }

  isShiftPressed() {
    return this.pressed.includes('ShiftLeft') || this.pressed.includes('ShiftRight');
  }

  isCapsLockPressed() {
    return this.pressed.includes('CapsLock');
  }

  getValue(key) {
    if (this.isShiftPressed() && this.isCapsLockPressed() && !key.controlKey) {
      return key[`${this.lang}_add`]
          ? key[`${this.lang}_add`]
          : key[this.lang];
    } else if (this.isShiftPressed() && !this.isCapsLockPressed() && !key.controlKey) {
      return key[`${this.lang}_add`]
          ? key[`${this.lang}_add`]
          : key[this.lang].toUpperCase();
    } else if (this.isCapsLockPressed() && !key.controlKey) {
      return key[this.lang].toUpperCase();
    } else {
      return key[this.lang];
    }
  }

  update() {
    this.keyNodes.forEach((keyNode) => {
      const key = this.keys.find((el) => el.code === keyNode.dataset.code);
      keyNode.innerHTML = this.getValue(key);
    });
  }

  updateText(code) {
    const key = this.keys.find((el) => el.code === code);
    if (!key.controlKey) {
      this.textarea.value += this.getValue(key);
    }
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
    this.updateText(code);
    this.chnageLang();
    this.update();
  }

  unpressKey(code) {
    const node = this.keyNodes.find((el) => el.dataset.code === code);
    if (node) {
      this.pressed = this.pressed.filter((el) => el !== code);
      node.classList.remove('pressed');
    }
    this.update();
  }

  unpress(code) {
    this.unpressKey(code);
  }
}

export default Keyboard;
