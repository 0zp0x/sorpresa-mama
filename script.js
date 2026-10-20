/* ELEMENTOS DE LA PÁGINA */

const botonSorpresa = document.getElementById("botonSorpresa");
const bienvenida = document.querySelector(".bienvenida");
const pantallaSorpresa = document.getElementById("pantallaSorpresa");

const botonCarta = document.getElementById("botonCarta");
const sobreContenedor = document.getElementById("sobreContenedor");
const sobre = document.getElementById("sobre");
const indicacionSobre = document.getElementById("indicacionSobre");
const carta = document.getElementById("carta");

const botonCerrarCarta = document.getElementById("botonCerrarCarta");

const botonInicio = document.getElementById("botonInicio");

const fraseFinal = document.getElementById("fraseFinal");

/* ABRIR LA SORPRESA */

botonSorpresa.addEventListener("click", function () {
  botonSorpresa.disabled = true;

  // Mostramos la segunda pantalla
  pantallaSorpresa.hidden = false;

  // Preparamos la transición
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      bienvenida.classList.add("ocultando");
      pantallaSorpresa.classList.add("visible");
    });
  });

  // Ocultamos la bienvenida al terminar
  bienvenida.addEventListener("transitionend", function finalizar(evento) {
    if (evento.propertyName !== "opacity") {
      return;
    }

    // Solo ocultamos la bienvenida si la sorpresa sigue abierta
    if (pantallaSorpresa.classList.contains("visible")) {
      bienvenida.hidden = true;
      bienvenida.classList.remove("ocultando");
    }

    bienvenida.removeEventListener("transitionend", finalizar);
  });
});

/* CORAZONES FLOTANTES */

let intervaloPetalos;

function crearPetalo() {
  if (pantallaSorpresa.hidden) {
    return;
  }

  const petalo = document.createElement("span");

  petalo.classList.add("petalo");
  petalo.textContent = "♥";
  petalo.setAttribute("aria-hidden", "true");

  // Posición horizontal aleatoria
  petalo.style.left = Math.random() * 100 + "vw";

  // Tamaño y velocidad aleatorios
  petalo.style.fontSize = 12 + Math.random() * 12 + "px";
  petalo.style.animationDuration = 5 + Math.random() * 3 + "s";

  document.body.appendChild(petalo);

  // Eliminamos cada corazón al terminar
  petalo.addEventListener("animationend", function () {
    petalo.remove();
  });
}

// Iniciamos los corazones al abrir la sorpresa
botonSorpresa.addEventListener("click", function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  if (intervaloPetalos) {
    return;
  }

  intervaloPetalos = setInterval(crearPetalo, 700);
});

/* MOSTRAR EL SOBRE */

botonCarta.addEventListener("click", function () {
  sobreContenedor.hidden = false;
  botonCarta.hidden = true;
});

/* ABRIR Y CERRAR LA CARTA */

sobre.addEventListener("click", function () {
  // Si la carta ya está abierta, no hacemos nada
  if (sobre.classList.contains("abierto")) {
    return;
  }

  // Abrimos el sobre
  sobre.classList.add("abierto");

  indicacionSobre.textContent = "Una carta escrita con mucho amor ❤️";

  // Mostramos la carta al terminar la animación
  setTimeout(function () {
    fraseFinal.hidden = true;
    carta.hidden = false;
    indicacionSobre.hidden = true;
  }, 800);
});

// Cerramos la carta y volvemos a mostrar el sobre
botonCerrarCarta.addEventListener("click", function () {
  carta.hidden = true;

  // Cerramos el sobre
  sobre.classList.remove("abierto");

  // Restauramos la indicación
  indicacionSobre.textContent = "Tocá el sobre para abrirlo";
  indicacionSobre.hidden = false;

  // Mostramos la frase especial
  fraseFinal.hidden = true;
  // Iniciamos la lluvia especial
  iniciarLluviaEspecial();
});

/* VOLVER AL INICIO */

botonInicio.addEventListener("click", function () {
  // Detenemos las animaciones de corazones
  clearInterval(intervaloPetalos);
  intervaloPetalos = null;

  // Eliminamos los corazones que quedaron en pantalla
  document.querySelectorAll(".petalo").forEach(function (petalo) {
    petalo.remove();
  });

  // Ocultamos la segunda pantalla
  pantallaSorpresa.classList.remove("visible");
  pantallaSorpresa.hidden = true;

  // Reiniciamos la primera pantalla
  bienvenida.hidden = false;
  bienvenida.classList.remove("ocultando");

  // Restauramos el estado inicial del botón
  botonSorpresa.disabled = false;

  // Reiniciamos el sobre y la carta
  sobreContenedor.hidden = true;
  sobre.classList.remove("abierto");
  carta.hidden = true;

  // Restauramos la indicación
  indicacionSobre.textContent = "Tocá el sobre para abrirlo";
  indicacionSobre.hidden = false;

  // Volvemos a mostrar el botón de la carta
  botonCarta.hidden = false;
  detenerLluviaEspecial();
});
/* LLUVIA ESPECIAL DE CORAZONES */

let temporizadorLluvia;
let corazonesEspeciales = [];

function iniciarLluviaEspecial() {
  detenerLluviaEspecial();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // Creamos muchos corazones en varias oleadas
  let cantidad = 0;
  const cantidadMaxima = 160;

  function crearCorazon() {
    if (cantidad >= cantidadMaxima) {
      clearInterval(intervaloOleadas);
      return;
    }

    const corazon = document.createElement("span");

    corazon.classList.add("corazon-especial");
    corazon.textContent = "♥";
    corazon.setAttribute("aria-hidden", "true");

    corazon.style.left = Math.random() * 100 + "vw";
    corazon.style.fontSize = 22 + Math.random() * 30 + "px";
    corazon.style.animationDuration = 4 + Math.random() * 3 + "s";
    corazon.style.animationDelay = "0s";

    corazon.style.color = [
      "#e75480",
      "#ff7da7",
      "#c44569",
      "#f09aba",
      "#ff4f87",
    ][Math.floor(Math.random() * 5)];

    document.body.appendChild(corazon);
    corazonesEspeciales.push(corazon);
    cantidad++;

    corazon.addEventListener("animationend", function () {
      corazon.remove();

      corazonesEspeciales = corazonesEspeciales.filter(function (elemento) {
        return elemento !== corazon;
      });
    });
  }

  // Primera oleada inmediata
  for (let i = 0; i < 45; i++) {
    crearCorazon();
  }

  // Seguimos creando corazones durante varios segundos
  const intervaloOleadas = setInterval(function () {
    for (let i = 0; i < 15; i++) {
      crearCorazon();
    }
  }, 500);

  // Detenemos la lluvia después de 9 segundos
  temporizadorLluvia = setTimeout(function () {
    clearInterval(intervaloOleadas);
    detenerLluviaEspecial();
    // Dejamos que los corazones restantes se desvanezcan
    finalizarLluviaEspecial();
    // Mostramos la frase cuando termina la lluvia
    fraseFinal.hidden = false;
  }, 9000);
}

function detenerLluviaEspecial() {
  clearTimeout(temporizadorLluvia);

  corazonesEspeciales.forEach(function (corazon) {
    corazon.remove();
  });

  corazonesEspeciales = [];
}

// Dejamos que los corazones desaparezcan gradualmente

function finalizarLluviaEspecial() {
  corazonesEspeciales.forEach(function (corazon) {
    corazon.classList.add("terminando");
  });

  // Esperamos a que los corazones se desvanezcan
  setTimeout(function () {
    detenerLluviaEspecial();

    // Preparamos el mensaje sin mostrarlo todavía
    fraseFinal.classList.remove("visible");
    fraseFinal.hidden = false;
    fraseFinal.style.opacity = "0";

    // Damos tiempo al navegador para aplicar el estado inicial

    requestAnimationFrame(function () {
      fraseFinal.style.opacity = "";
      fraseFinal.classList.add("visible");
    });
  }, 2500);
}
