const scenes = [...document.querySelectorAll('.scene')];
const progress = document.querySelector('#progressFill');
const pageCount = document.querySelector('#pageCount');
const music = document.querySelector('#music');
const soundButton = document.querySelector('#sound');
const soundIcon = document.querySelector('#soundIcon');
const soundLabel = document.querySelector('#soundLabel');
let currentScene = 0;

function showScene(index) {
  currentScene = (index + scenes.length) % scenes.length;

  scenes.forEach((scene, sceneIndex) => {
    const isActive = sceneIndex === currentScene;
    scene.classList.toggle('active', isActive);
    scene.setAttribute('aria-hidden', String(!isActive));
  });

  progress.style.width = `${((currentScene + 1) / scenes.length) * 100}%`;
  pageCount.textContent = `${String(currentScene + 1).padStart(2, '0')} / ${String(scenes.length).padStart(2, '0')}`;
}

document.querySelectorAll('.next').forEach((button) => {
  button.addEventListener('click', () => showScene(currentScene + 1));
});

document.querySelectorAll('.back').forEach((button) => {
  button.addEventListener('click', () => showScene(currentScene - 1));
});

document.querySelector('#restart').addEventListener('click', () => showScene(0));

soundButton.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      soundButton.setAttribute('aria-pressed', 'true');
      soundIcon.textContent = '♫';
      soundLabel.textContent = 'Pausar música';
    } catch {
      soundLabel.textContent = 'Añade music.mp3';
    }
    return;
  }

  music.pause();
  soundButton.setAttribute('aria-pressed', 'false');
  soundLabel.textContent = 'Activar música';
});

showScene(0);
