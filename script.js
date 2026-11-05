const pages = [...document.querySelectorAll('.page')];
const progressBar = document.querySelector('#progressBar');
const pageCount = document.querySelector('#pageCount');
const pageDots = document.querySelector('#pageDots');
const music = document.querySelector('#music');
const musicButton = document.querySelector('#musicButton');
const musicLabel = document.querySelector('#musicLabel');
const modal = document.querySelector('#noteModal');
let currentPage = 0;

const notes = {
  smile: {
    flower: '🌻',
    title: 'Tu sonrisa',
    text: 'Tiene esa manera suya de cambiar un poquito el día. Ojalá hoy algo bonito te regale una de esas sonrisas.'
  },
  being: {
    flower: '🌷',
    title: 'Tu forma de ser',
    text: 'Me gusta que seas tú, con tus ocurrencias, tus maneras y todo eso que quizá ni notas, pero te hace tan especial.'
  },
  heart: {
    flower: '🌼',
    title: 'Tu corazón',
    text: 'Se nota el cariño que pones en las personas y las cosas. No olvides reservar un poquito de esa ternura para ti también.'
  },
  details: {
    flower: '🪻',
    title: 'Tus pequeños detalles',
    text: 'A veces son las cosas pequeñas las que más se quedan: una palabra, una mirada, una forma tuya de estar. Yo sí las guardo.'
  }
};

pageDots.innerHTML = pages.map((_, index) =>
  `<i class="${index === 0 ? 'active' : ''}"></i>`
).join('');

function showPage(index) {
  currentPage = (index + pages.length) % pages.length;

  pages.forEach((page, pageIndex) => {
    const active = pageIndex === currentPage;
    page.classList.toggle('active', active);
    page.setAttribute('aria-hidden', String(!active));
  });

  progressBar.style.width = `${((currentPage + 1) / pages.length) * 100}%`;
  pageCount.innerHTML = `${String(currentPage + 1).padStart(2, '0')} <span>/ ${String(pages.length).padStart(2, '0')}</span>`;

  [...pageDots.children].forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === currentPage);
  });

  if (currentPage > 0) makePetal();
}

function openNote(key) {
  const note = notes[key];
  if (!note) return;

  document.querySelector('#modalFlower').textContent = note.flower;
  document.querySelector('#modalTitle').textContent = note.title;
  document.querySelector('#modalText').textContent = note.text;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.querySelector('#closeModal').focus();
}

function closeNote() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('[data-next]').forEach((button) => {
  button.addEventListener('click', () => showPage(currentPage + 1));
});

document.querySelectorAll('.flower-card').forEach((card) => {
  card.addEventListener('click', () => openNote(card.dataset.note));
});

document.querySelector('#closeModal').addEventListener('click', closeNote);
document.querySelector('#modalOkay').addEventListener('click', closeNote);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeNote();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeNote();
  if (event.key === 'ArrowRight' && !modal.classList.contains('open')) showPage(currentPage + 1);
  if (event.key === 'ArrowLeft' && !modal.classList.contains('open')) showPage(currentPage - 1);
});

document.querySelector('#homeButton').addEventListener('click', () => showPage(0));
document.querySelector('#restartButton').addEventListener('click', () => showPage(0));

musicButton.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.classList.add('playing');
      musicButton.setAttribute('aria-pressed', 'true');
      musicLabel.textContent = 'pausar música';
    } catch {
      musicLabel.textContent = 'añade music.mp3';
    }
    return;
  }

  music.pause();
  musicButton.classList.remove('playing');
  musicButton.setAttribute('aria-pressed', 'false');
  musicLabel.textContent = 'pon música';
});

function makePetal() {
  const petal = document.createElement('span');
  const symbols = ['✿', '✽', '❋', '✧'];
  petal.className = 'petal';
  petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.setProperty('--drift', `${Math.random() * 140 - 70}px`);
  petal.style.animationDuration = `${7 + Math.random() * 5}s`;
  document.querySelector('#petals').append(petal);
  window.setTimeout(() => petal.remove(), 13000);
}

window.setInterval(() => {
  if (!document.hidden && Math.random() > 0.45) makePetal();
}, 1700);

const starNotes = {
  one: ['Tu luz', 'Incluso en los días nublados, sigues teniendo una luz muy tuya.'],
  two: ['A tu ritmo', 'No hay apuro. Puedes ir despacio y cuidarte como necesitas.'],
  three: ['Aquí estoy', 'Cuando quieras compañía, puedes contar conmigo.'],
  four: ['Lo que eres', 'Tu manera de ser hace más bonito el mundo de quienes te queremos.'],
  five: ['Un abrazo', 'Te mando un abrazo de esos que no necesitan muchas palabras.'],
  six: ['Una cosita', 'Ojalá esta noche te regale un momento de calma.']
};

document.querySelectorAll('[data-star]').forEach((star) => {
  star.addEventListener('click', () => {
    const [title, text] = starNotes[star.dataset.star];
    document.querySelector('#modalFlower').textContent = '✦';
    document.querySelector('#modalTitle').textContent = title;
    document.querySelector('#modalText').textContent = text;
    const modal = document.querySelector('#noteModal');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.querySelector('#closeModal').focus();
  });
});

const gardenFloor = document.querySelector('#gardenFloor');
const gardenFlowerMarks = ['✿', '❀', '✽', '❋', '✿', '❀', '✽', '✿', '❋', '✽', '❀', '✿'];
gardenFlowerMarks.forEach((mark, index) => {
  const flower = document.createElement('span');
  flower.className = 'garden-flower';
  flower.dataset.bloom = String(index + 1);
  flower.style.left = `${4 + index * 8.2}%`;
  flower.style.transitionDelay = `${(index % 4) * 90}ms`;
  flower.innerHTML = `<span class="flower-head">${mark}</span><span class="stem-line"></span>`;
  gardenFloor.append(flower);
});

for (let blade = 0; blade < 17; blade += 1) {
  const grass = document.createElement('span');
  grass.className = 'grass';
  grass.textContent = blade % 2 ? '⌁' : '⌇';
  grass.style.left = `${blade * 6.2}%`;
  grass.style.transform = `rotate(${blade % 2 ? 18 : -18}deg)`;
  gardenFloor.append(grass);
}

function growGarden(sceneIndex) {
  document.querySelectorAll('.garden-flower').forEach((flower, index) => {
    flower.classList.toggle('visible', index < Math.min(12, 1 + sceneIndex * 2));
  });
}

const originalShowPage = showPage;
showPage = function (index) {
  originalShowPage(index);
  growGarden(currentPage);
};

document.querySelector('#finalMusicButton').addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.classList.add('playing');
      musicButton.setAttribute('aria-pressed', 'true');
      musicLabel.textContent = 'pausar música';
      document.querySelector('#finalMusicButton').textContent = 'Ⅱ Pausar';
    } catch {
      document.querySelector('#finalMusicButton').textContent = 'Añade music.mp3';
    }
    return;
  }

  music.pause();
  musicButton.classList.remove('playing');
  musicButton.setAttribute('aria-pressed', 'false');
  musicLabel.textContent = 'pon música';
  document.querySelector('#finalMusicButton').textContent = '▶ Escuchar';
});
showPage(0);


