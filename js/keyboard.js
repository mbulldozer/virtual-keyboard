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
    this.capslockCount = 0;

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

    const info = document.createElement('div');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    p1.innerText = 'Клавиатура создана в операционной системе Windows';
    p2.innerText = 'Для переключения языка комбинация: левыe ctrl + alt';
    p3.innerText = 'Discord: @Aliaksandr Pauliukavets#8238';
    info.classList.add('info');
    info.append(p1, p2, p3);

    document.body.append(this.container);
    this.container.append(this.textarea, this.keyboard, info);

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

  changeLang(code) {
    const conditionOne = this.pressed.includes('ControlLeft') && this.pressed.includes('AltLeft');
    const conditionTwo = code === 'ControlLeft' || code === 'AltLeft';
    if (conditionOne && conditionTwo) {
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
    } if (this.isShiftPressed() && !this.isCapsLockPressed() && !key.controlKey) {
      return key[`${this.lang}_add`]
        ? key[`${this.lang}_add`]
        : key[this.lang].toUpperCase();
    } if (this.isCapsLockPressed() && !key.controlKey) {
      return key[this.lang].toUpperCase();
    }
    return key[this.lang];
  }

  update() {
    this.keyNodes.forEach((keyNode) => {
      const node = keyNode;
      const key = this.keys.find((el) => el.code === node.dataset.code);
      node.innerHTML = this.getValue(key);
    });
  }

  changePosition(value) {
    this.textarea.selectionStart = value;
    this.textarea.selectionEnd = value;
  }

  getSubStr(start, end = this.textarea.value.length) {
    return this.textarea.value.substring(start, end);
  }

  updateText(code) {
    const start = this.textarea.selectionStart;
    const end = this.textarea.selectionEnd;
    const key = this.keys.find((el) => el.code === code);
    if (!key.controlKey) {
      this.textarea.value = this.getSubStr(0, start) + this.getValue(key) + this.getSubStr(end);
      this.changePosition(start + 1);
    } else if (code === 'Tab' || code === 'Enter' || code === 'Space') {
      let s = code === 'Tab' ? '\t' : '\n';
      switch (code) {
        case 'Tab':
          s = '\t';
          break;
        case 'Enter':
          s = '\n';
          break;
        case 'Space':
          s = ' ';
          break;
        default:
          break;
      }
      this.textarea.value = this.getSubStr(0, start) + s + this.getSubStr(end);
      this.changePosition(start + 1);
    } else if (code === 'Backspace') {
      if (start === end) {
        this.textarea.value = this.getSubStr(0, start - 1) + this.getSubStr(end);
        this.changePosition(start !== 0 ? start - 1 : 0);
      } else {
        this.textarea.value = this.getSubStr(0, start) + this.getSubStr(end);
        this.changePosition(start);
      }
    } else if (code === 'Delete') {
      if (start === end && end !== this.textarea.value.length) {
        this.textarea.value = this.getSubStr(0, start) + this.getSubStr(end + 1);
      } else {
        this.textarea.value = this.getSubStr(0, start) + this.getSubStr(end);
      }
      this.changePosition(start);
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
    this.update();
  }

  unpressKey(code) {
    this.changeLang(code);
    const node = this.keyNodes.find((el) => el.dataset.code === code);
    if (code === 'CapsLock') {
      this.capslockCount += 1;
      if (this.capslockCount === 2) {
        this.pressed = this.pressed.filter((el) => el !== code);
        node.classList.remove('pressed');
        this.capslockCount = 0;
      }
    } else if (node) {
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
