let loop;
let firstCard = '';
let secondCard = '';
let grid;
let timer;
let spanPlayer;

window.startTimer = () => {};
window.loadGame = () => {};

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.login__input');
  const login__button = document.querySelector('.login__button');
  const form = document.querySelector('.login-form');
  const gameArea = document.querySelector('main');
  const spanPlayer = document.querySelector('.player');
  const timer = document.querySelector('.timer');
  const grid = document.querySelector('.grid');
  let loop;

  window.startTimer = function () {
  if (loop) clearInterval(loop);
  loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

window.loadGame = function () {
  const characters = [
    'Cry_Baby', 'Whitney', 'Lady_Gaga', 'Rihanna',
    'Dua_Lipa', 'Ariana_Grande', 'Taylor_Swift',
    'Katy_Perry', 'Nicki_Minaj', 'Sza',
    'Demi_Lovato', 'Beyonce',
  ];

  const duplicateCharacters = [...characters, ...characters];
  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

  const characters = [
    'Cry_Baby', 
    'Whitney', 
    'Lady_Gaga', 
    'Rihanna', 
    'Dua_Lipa',
    'Ariana_Grande', 
    'Taylor_Swift', 
    'Katy_Perry', 
    'Nicki_Minaj', 
    'Sza',
    'Demi_Lovato',
    'Beyonce',
  ];

  const validateInput = ({ target }) => {
    if (target.value.trim().length > 0) {
      login__button.removeAttribute('disabled');
    } else {
      login__button.setAttribute('disabled', '');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    spanPlayer.innerHTML = input.value.trim();
    form.style.display = 'none';
    gameArea.style.display = 'flex';
    startTimer();
    loadGame();
  };

  const startTimer = () => {
    loop = setInterval(() => {
      const currentTime = +timer.innerHTML;
      timer.innerHTML = currentTime + 1;
    }, 1000);
  };

  const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
  };

  let firstCard = '';
  let secondCard = '';

  const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    if (disabledCards.length === 24) {
      clearInterval(loop);
      alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML} segundos.`);
    }
  };

  const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
      firstCard.firstChild.classList.add('disabled-card');
      secondCard.firstChild.classList.add('disabled-card');
      firstCard = '';
      secondCard = '';
      checkEndGame();
    } else {
      setTimeout(() => {
        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');
        firstCard = '';
        secondCard = '';
      }, 500);
    }
  };

  const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) return;

    if (firstCard === '') {
      target.parentNode.classList.add('reveal-card');
      firstCard = target.parentNode;
    } else if (secondCard === '') {
      target.parentNode.classList.add('reveal-card');
      secondCard = target.parentNode;
      checkCards();
    }
  };

  const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url(images/${character}.png)`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
  }; 

  const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
      const card = createCard(character);
      grid.appendChild(card);
    }); 
  };

  input.addEventListener('input', validateInput);
  form.addEventListener('submit', handleSubmit);
});

function reiniciarPagina() {
  location.reload();
}

window.reiniciarJogo = function () {
  if (typeof loop !== 'undefined') clearInterval(loop);
  if (document.querySelector('.timer')) {
    document.querySelector('.timer').innerHTML = '0';
  }
  const grid = document.querySelector('.grid');
  if (grid) {
    grid.innerHTML = '';
  }
  firstCard = '';
  secondCard = '';
  if (typeof startTimer === 'function') startTimer();
  if (typeof loadGame === 'function') loadGame();
};
