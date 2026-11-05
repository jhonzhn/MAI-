
const inicio = document.getElementById("inicio");
const regalo = document.getElementById("regalo");
const florInicial = document.getElementById("florInicial");
const ramo = document.getElementById("ramo");
const volver = document.getElementById("volver");

let animando = false;

function soltarPetalos() {
  const rect = florInicial.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height * 0.38;

  for (let i = 0; i < 42; i++) {
    const petalo = document.createElement("span");
    petalo.className = "petalo-caido";

    const angulo = (Math.PI * 2 * i) / 42;
    const distancia = 100 + Math.random() * 230;

    petalo.style.left = `${x + (Math.random() - .5) * 40}px`;
    petalo.style.top = `${y + (Math.random() - .5) * 30}px`;

    petalo.style.setProperty("--ancho", `${8 + Math.random() * 10}px`);
    petalo.style.setProperty("--alto", `${15 + Math.random() * 13}px`);

    petalo.style.setProperty(
      "--dx",
      `${Math.cos(angulo) * distancia + (Math.random() - .5) * 80}px`
    );

    petalo.style.setProperty(
      "--dy",
      `${Math.abs(Math.sin(angulo)) * distancia + 100 + Math.random() * 120}px`
    );

    petalo.style.setProperty(
      "--giro-final",
      `${Math.random() * 900 - 450}deg`
    );

    petalo.style.setProperty(
      "--duracion",
      `${1.5 + Math.random() * 1.5}s`
    );

    document.body.appendChild(petalo);
    petalo.addEventListener("animationend", () => petalo.remove());
  }
}

function crearFlor(x, y, tamano, espera, inclinacion) {
  const flor = document.createElement("div");
  flor.className = "flor-ramo";

  flor.style.setProperty("--x", `${x}%`);
  flor.style.setProperty("--y", `${y}%`);
  flor.style.setProperty("--tamano", `${tamano}px`);
  flor.style.setProperty("--espera", `${espera}s`);
  flor.style.transform += ` rotate(${inclinacion}deg)`;

  flor.innerHTML = `
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="lila${Math.random().toString(36).slice(2)}"
                        cx="30%" cy="20%" r="90%">
          <stop stop-color="#f5e7ff"/>
          <stop offset=".35" stop-color="#d1a5ff"/>
          <stop offset=".72" stop-color="#9e63df"/>
          <stop offset="1" stop-color="#582b83"/>
        </radialGradient>
      </defs>
      <path d="M60 75 C18 82 5 51 20 28 C34 8 53 17 60 36
               C67 12 92 9 105 31 C119 58 93 79 60 75Z"
            fill="#a979dd"/>
      <path d="M27 65 C19 44 39 22 55 39 C44 48 48 61 60 69
               C39 75 29 72 27 65Z" fill="#e2c4ff"/>
      <path d="M93 65 C101 44 81 22 65 39 C76 48 72 61 60 69
               C81 75 91 72 93 65Z" fill="#9d60d7"/>
      <path d="M42 64 C34 47 51 32 63 43 C52 50 59 61 67 64
               C57 72 47 70 42 64Z" fill="#f0ddff"/>
      <path d="M78 64 C86 47 69 32 57 43 C68 50 61 61 53 64
               C63 72 73 70 78 64Z" fill="#8749c2"/>
      <path d="M54 61 C43 49 59 38 68 47 C76 55 65 65 58 65Z"
            fill="#6d389c"/>
    </svg>
  `;

  ramo.appendChild(flor);
}

function crecerRamo() {
  ramo.querySelectorAll(".tallo-ramo, .flor-ramo, .hoja-ramo")
      .forEach(elemento => elemento.remove());

  const tallos = [
    { x: 50, altura: 44, giro: 0, espera: .2 },
    { x: 42, altura: 36, giro: -12, espera: .4 },
    { x: 58, altura: 38, giro: 12, espera: .55 },
    { x: 32, altura: 29, giro: -20, espera: .7 },
    { x: 68, altura: 31, giro: 20, espera: .85 },
    { x: 46, altura: 35, giro: -6, espera: 1 },
    { x: 55, altura: 33, giro: 7, espera: 1.15 }
  ];

  tallos.forEach((dato, indice) => {
    const tallo = document.createElement("div");
    tallo.className = "tallo-ramo";

    tallo.style.left = `${dato.x}%`;
    tallo.style.setProperty("--altura", `${dato.altura}%`);
    tallo.style.setProperty("--inclinacion", `${dato.giro}deg`);
    tallo.style.setProperty("--espera", `${dato.espera}s`);

    ramo.appendChild(tallo);

    for (let i = 0; i < 2; i++) {
      const hoja = document.createElement("div");
      hoja.className = "hoja-ramo";
      hoja.style.setProperty("--base", `${22 + indice * 6 + i * 8}%`);
      hoja.style.setProperty("--giro", `${i === 0 ? -35 : 135}deg`);
      hoja.style.setProperty("--espera", `${dato.espera + .4 + i * .15}s`);
      ramo.appendChild(hoja);
    }
  });

  const flores = [
    [50, 23, 105, .8, 0],
    [39, 31, 88, 1.05, -12],
    [61, 30, 91, 1.2, 12],
    [28, 41, 76, 1.4, -18],
    [72, 40, 79, 1.55, 18],
    [44, 16, 77, 1.7, -8],
    [58, 17, 78, 1.85, 8]
  ];

  flores.forEach(datos => crearFlor(...datos));
}

florInicial.addEventListener("click", () => {
  if (animando) return;

  animando = true;
  florInicial.disabled = true;

  soltarPetalos();

  setTimeout(() => {
    crecerRamo();
    regalo.classList.add("activa");
    inicio.classList.remove("activa");
  }, 900);
});

volver.addEventListener("click", () => {
  regalo.classList.remove("activa");

  setTimeout(() => {
    inicio.classList.add("activa");
    florInicial.disabled = false;
    animando = false;
  }, 300);
});
