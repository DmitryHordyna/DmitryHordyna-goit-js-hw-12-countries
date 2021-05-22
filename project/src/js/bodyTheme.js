const colors = [
  '#FFFFFF',
  '#2196F3',
  '#4CAF50',
  '#FF9800',
  '#009688',
  '#795548',
  '#000000',
  '#00FFFF',
  '#008080',
  '#000000',
  '#FF00FF',
  '#FF0000',
  '#800080',
  '#808000',
  '#000080',
  '#FFFF00',
];

const DAILY = 1000;
const firstElColors = 0;
const lastElColors = colors.length;

let randomColor = null;
let timerId = null;

refs = {
  start: document.querySelector('button[data-action=start]'),
  stop: document.querySelector('button[data-action=stop]'),
  body: document.body.querySelector('.box-change'),
};

const currentTheme = localStorage.getItem('ThemeBody') || colors[0];

refs.body.style.backgroundColor = currentTheme;

refs.start.addEventListener('click', startRandomChangeTheme);
refs.stop.addEventListener('click', stopChangeColorTheme);

function startRandomChangeTheme() {
  refs.start.setAttribute('disabled', true);
  timerId = setInterval(changeThemeBody, DAILY);
}

function changeThemeBody() {
  randomColor = colors[randomIntegerFromInterval(firstElColors, lastElColors)];
  refs.body.style.backgroundColor = randomColor;
  localStorageTheme(randomColor);
}

function stopChangeColorTheme(e) {
  clearInterval(timerId);
  refs.start.removeAttribute('disabled');
}

function randomIntegerFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function localStorageTheme(color) {
  if (undefined === color) {
    return;
  }
  localStorage.setItem('ThemeBody', color);
}
