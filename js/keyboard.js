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
TEXTAREA.focus();

KEYS.forEach(key => {
  let keyNode = document.createElement('div');
  keyNode.innerHTML=key.classes.includes("letter")?key.eng.toUpperCase():key.eng;
  key.classes.forEach(el => keyNode.classList.add(el));
  KEYBOARD.append(keyNode);
});

TEXTAREA.addEventListener("blur", () => {
    TEXTAREA.focus();
});

