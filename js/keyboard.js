const CONTAINER = document.createElement('div');
const TEXTAREA = document.createElement('textarea');
const KEYBOARD = document.createElement('div');

CONTAINER.classList.add('container');
TEXTAREA.classList.add('textarea');
TEXTAREA.setAttribute('cols',30);
TEXTAREA.setAttribute('rows', 10);
KEYBOARD.classList.add('keyboard');
document.body.append(CONTAINER);
CONTAINER.append(TEXTAREA, KEYBOARD);

KEYS.forEach(key => {
  console.log(KEYBOARD);
  let keyNode = document.createElement('div');
  keyNode.innerText=key.eng.toUpperCase();
  key.classes.forEach(el => keyNode.classList.add(el));
  KEYBOARD.append(keyNode);
});

