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

showPage(0);
