const inicio = document.getElementById("inicio");
const regalo = document.getElementById("regalo");
const florInicial = document.getElementById("florInicial");
const musicaFondo = document.getElementById("musicaFondo");
const ramo = document.getElementById("ramo");
const volver = document.getElementById("volver");
const floresPrincipales = [...document.querySelectorAll(".flor-principal")];
const modal = document.getElementById("mensajeModal");
const movimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)");

let animando = false;
let florAbierta = null;

// Un mensaje de apoyo para cada una de las cuatro flores.
const mensajes = [
  {
    etiqueta: "UN DETALLE PARA TI",
    titulo: "Un jardín para ti 💜",
    texto: "Hice este pequeño jardín pensando en ti, para regalarte un ratito de calma y algo bonito que mirar. Eres linda y tienes muchas cosas buenas… entre ellas, un repertorio de malas palabras que merece su propio diccionario 😂. Tenía que reconocer ese talento también."
  },
  {
    etiqueta: "LO QUE QUERÍA DECIRTE",
    titulo: "A tu ritmo 🌷",
    texto: "No tienes que poder con todo ni estar siempre de buen ánimo. Un día difícil no borra tus cualidades ni las cosas bonitas que hay en ti. Puedes descansar y tomarte tu tiempo; no tienes que demostrar nada para merecer cariño."
  },
  {
    etiqueta: "UN RECORDATORIO",
    titulo: "Por si hoy lo necesitas ✨",
    texto: "Hay muchas cosas bonitas en ti: tu forma de ser, el cariño que eres capaz de dar y esa manera tan tuya de hacer las cosas. A veces cuesta reconocer lo bueno de una misma. Ojalá estas flores te ayuden a recordarlo un poquito."
  },
  {
    etiqueta: "CON CARIÑO",
    titulo: "Aquí estoy 🌸",
    texto: "Si necesitas hablar, distraerte o simplemente tener compañía, puedes contar conmigo. No necesitas estar alegre ni saber qué decir para escribirme. Y hoy intenta tratarte bonito y descansar un poco… hazme caso por una vez, para variar 😂."
  }
];

// Cada SVG tiene identificadores propios: sus degradados no se mezclan.
function dibujoFlor(id, variante = 0) {
  const colores = [
    ["#f5e7ff", "#bc8ae9", "#7441ad"],
    ["#ffedf5", "#d7a0cb", "#96598f"],
    ["#f4efff", "#beb0e9", "#8070b5"],
    ["#faeaff", "#c48fda", "#8a4a9d"]
  ][variante % 4];

  return `
    <svg viewBox="0 0 120 96" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="${id}" cx="32%" cy="24%" r="88%">
          <stop stop-color="${colores[0]}"/>
          <stop offset=".52" stop-color="${colores[1]}"/>
          <stop offset="1" stop-color="${colores[2]}"/>
        </radialGradient>
      </defs>
      <path d="M60 78 C22 89 4 59 16 33 C24 13 46 15 60 39 C72 13 98 14 107 36 C120 64 94 87 60 78Z"
        fill="url(#${id})" stroke="${colores[2]}" stroke-width=".8"/>
      <path d="M59 74 C32 69 22 42 38 23 C53 10 68 27 66 49Z" fill="${colores[1]}"/>
      <path d="M61 74 C88 69 98 42 82 23 C67 10 52 27 54 49Z" fill="${colores[0]}" opacity=".9"/>
      <path d="M25 59 C21 41 39 33 51 44 C45 54 49 65 60 73 C41 78 29 71 25 59Z" fill="${colores[0]}" opacity=".86"/>
      <path d="M95 59 C99 41 81 33 69 44 C75 54 71 65 60 73 C79 78 91 71 95 59Z" fill="${colores[2]}" opacity=".6"/>
      <path d="M40 61 C33 46 50 34 63 45 C52 52 57 64 67 67 C55 75 44 70 40 61Z" fill="${colores[0]}"/>
      <path d="M80 61 C87 46 70 34 57 45 C68 52 63 64 53 67 C65 75 76 70 80 61Z" fill="${colores[1]}"/>
      <path d="M54 62 C44 51 57 40 67 48 C77 56 65 67 58 66Z" fill="${colores[2]}"/>
      <path d="M53 55 Q58 45 66 49" fill="none" stroke="${colores[0]}" stroke-width="1.4" stroke-linecap="round"/>
    </svg>`;
}

const decorativas = Array.from({ length: 30 }, (_, indice) => ({
  x: 4 + ((indice * 29) % 93),
  y: 38 + ((indice * 17) % 43),
  tamano: 42 + (indice % 5) * 8,
  giro: (indice % 7) * 5 - 15,
  espera: (indice % 6) * .09,
  opacidad: .36 + (indice % 4) * .13
}));

// Se crean una sola vez; cada punto tiene su propio ritmo de brillo.
function prepararEstrellas() {
  const cielo = document.getElementById("estrellas");

  for (let indice = 0; indice < 240; indice++) {
    const estrella = document.createElement("span");
    estrella.className = "estrella";
    estrella.style.setProperty("--x", `${1 + Math.random() * 98}%`);
    estrella.style.setProperty("--y", `${2 + Math.random() * 94}%`);
    estrella.style.setProperty("--tamano", `${.6 + Math.random() * 1.2}px`);
    estrella.style.setProperty("--brillo", (.25 + Math.random() * .55).toFixed(2));
    estrella.style.setProperty("--duracion", `${4 + Math.random() * 5}s`);
    estrella.style.setProperty("--desfase", `${-Math.random() * 9}s`);
    cielo.append(estrella);
  }
}

function prepararJardin() {
  const fondo = document.getElementById("floresDecorativas");

  decorativas.forEach((datos, indice) => {
    const flor = document.createElement("div");
    flor.className = "flor-decorativa";
    flor.style.setProperty("--x", `${datos.x}%`);
    flor.style.setProperty("--y", `${datos.y}%`);
    flor.style.setProperty("--tamano", `${datos.tamano}px`);
    flor.style.setProperty("--giro", `${datos.giro}deg`);
    flor.style.setProperty("--espera", `${datos.espera + .3}s`);
    flor.style.setProperty("--opacidad", datos.opacidad);
    flor.innerHTML = dibujoFlor(`fondo-${indice}`, indice % 3);
    fondo.append(flor);
  });

  floresPrincipales.forEach((flor, indice) => {
    flor.querySelector(".flor-visual").innerHTML = dibujoFlor(`principal-${indice}`, indice);
    flor.addEventListener("click", () => abrirMensaje(flor, indice));
  });
}

// Las hojas se colocan sobre la curva de cada tallo, no en el centro del ramo.
function plantaSVG(x, y, base, principal, indice, espera) {
  const curva = indice % 2 === 0 ? 35 : -35;
  const puntos = [
    [base, 744],
    [base + curva, 570],
    [x + curva, y + 110],
    [x, y]
  ];
  const puntoEnCurva = (t) => {
    const u = 1 - t;
    return [0, 1].map(eje =>
      u ** 3 * puntos[0][eje] + 3 * u ** 2 * t * puntos[1][eje]
      + 3 * u * t ** 2 * puntos[2][eje] + t ** 3 * puntos[3][eje]
    );
  };

  let hojas = "";
  [.28, .46, .65].forEach((t, numero) => {
    const [px, py] = puntoEnCurva(t);
    const lado = (numero + indice) % 2 ? 1 : -1;
    const largo = principal ? 54 : 33;
    hojas += `<path d="M${px} ${py} Q${px + lado * largo * .6} ${py - 3} ${px + lado * largo} ${py - 43} Q${px + lado * 7} ${py - 38} ${px} ${py}Z"
      fill="${principal ? '#53794f' : '#304d38'}" opacity="${principal ? '.85' : '.7'}"/>`;
    hojas += `<path d="M${px} ${py} L${px + lado * largo * .85} ${py - 34}" stroke="#a3bf813d" stroke-width="1"/>`;
  });

  return `<g class="planta" style="--espera:${espera}s">
    <path class="tallo-jardin" d="M${base} 744 C${puntos[1].join(' ')} ${puntos[2].join(' ')} ${x} ${y}"
      stroke="${principal ? '#72906b' : '#3f6047'}" stroke-width="${principal ? '3.2' : '1.8'}"/>
    ${hojas}
  </g>`;
}

function dibujarTallos() {
  const alto = ramo.clientHeight;
  if (!alto) return;

  let plantas = decorativas.map((flor, indice) =>
    plantaSVG(flor.x * 10, flor.y * 7.2 + 10, flor.x * 10 + (indice % 2 ? 55 : -55), false, indice, flor.espera)
  ).join("");

  floresPrincipales.forEach((flor, indice) => {
    const estilo = getComputedStyle(flor);
    const x = parseFloat(estilo.getPropertyValue("--x")) * 10;
    const y = parseFloat(estilo.getPropertyValue("--y")) * 7.2;
    const puntoUnion = y + (flor.clientHeight * .27 / alto) * 720;
    plantas += plantaSVG(x, puntoUnion, x + (indice % 2 ? -65 : 65), true, indice, indice * .12);
  });

  document.getElementById("tallosJardin").innerHTML = plantas;
}

// Un fundido solapado evita saltos y esperas entre las pantallas.
function esperarFundido(elemento) {
  if (movimientoReducido.matches) return Promise.resolve();
  return new Promise(resolve => {
    let temporizador;
    const terminar = () => {
      clearTimeout(temporizador);
      elemento.removeEventListener("transitionend", escuchar);
      resolve();
    };
    const escuchar = evento => {
      if (evento.target === elemento && evento.propertyName === "opacity") terminar();
    };
    elemento.addEventListener("transitionend", escuchar);
    temporizador = setTimeout(terminar, 1350);
  });
}

async function cambiarPantalla(destino) {
  if (animando) return;
  animando = true;
  const origen = destino === regalo ? inicio : regalo;
  const finalizaFundido = esperarFundido(destino);

  if (destino === regalo) {
    soltarPetalos();
    ramo.classList.add("florecido");
  }

  destino.inert = false;
  destino.setAttribute("aria-hidden", "false");
  destino.classList.add("activa");
  const foco = destino === regalo ? document.getElementById("invitacion") : florInicial;
  foco.focus({ preventScroll: true });

  origen.inert = true;
  origen.setAttribute("aria-hidden", "true");
  origen.classList.remove("activa");

  await finalizaFundido;
  if (origen === regalo) ramo.classList.remove("florecido");
  animando = false;
}

function soltarPetalos() {
  if (movimientoReducido.matches) return;
  const svg = florInicial.querySelector("svg");
  const matriz = svg.getScreenCTM();
  if (!matriz) return;
  const punto = new DOMPoint(100, 115).matrixTransform(matriz);

  for (let indice = 0; indice < 12; indice++) {
    const petalo = document.createElement("span");
    petalo.className = "petalo-caido";
    petalo.setAttribute("aria-hidden", "true");
    petalo.style.left = `${punto.x}px`;
    petalo.style.top = `${punto.y}px`;
    document.body.append(petalo);
    const lado = indice % 2 ? -1 : 1;
    const animacion = petalo.animate([
      { opacity: 0, transform: "translate(0, 0) rotate(0deg)" },
      { opacity: .75, offset: .2 },
      { opacity: 0, transform: `translate(${lado * (25 + indice * 7)}px, ${90 + indice * 6}px) rotate(${lado * 100}deg)` }
    ], { duration: 1400, delay: indice * 35, easing: "ease-out", fill: "both" });
    animacion.finished.then(() => petalo.remove(), () => petalo.remove());
  }
}

function abrirMensaje(flor, indice) {
  const mensaje = mensajes[indice];
  florAbierta = flor;
  document.getElementById("etiquetaMensaje").textContent = mensaje.etiqueta;
  document.getElementById("tituloMensaje").textContent = mensaje.titulo;
  document.getElementById("textoMensaje").textContent = mensaje.texto;
  flor.classList.add("leida");
  modal.showModal();
  document.getElementById("cerrarMensaje").focus({ preventScroll: true });
}

document.getElementById("cerrarMensaje").addEventListener("click", () => modal.close());
document.getElementById("guardarMensaje").addEventListener("click", () => modal.close());
modal.addEventListener("click", evento => {
  const limites = modal.getBoundingClientRect();
  if (evento.target === modal && (
    evento.clientX < limites.left || evento.clientX > limites.right ||
    evento.clientY < limites.top || evento.clientY > limites.bottom
  )) modal.close();
});
modal.addEventListener("close", () => florAbierta?.focus({ preventScroll: true }));

florInicial.addEventListener("click", () => {
  // Se inicia directamente con el toque para permitir la reproducción en el celular.
  if (musicaFondo.paused) {
    musicaFondo.play().catch(() => {
      console.warn("No se pudo iniciar la música. Puedes intentarlo al volver a pulsar la flor.");
    });
  }
  cambiarPantalla(regalo);
});
volver.addEventListener("click", () => cambiarPantalla(inicio));

prepararEstrellas();
prepararJardin();
let ajustePendiente;
new ResizeObserver(() => {
  cancelAnimationFrame(ajustePendiente);
  ajustePendiente = requestAnimationFrame(dibujarTallos);
}).observe(ramo);
dibujarTallos();
