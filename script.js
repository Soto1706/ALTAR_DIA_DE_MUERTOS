const start = document.getElementById('start');
const estado = document.getElementById('estado');
const intro = document.getElementById('intro');
const hud = document.getElementById('hud');
const nombre = document.getElementById('nombre');
const mensaje = document.getElementById('mensaje');

const datos = [
  ['Cempasúchil', 'Sus pétalos simbolizan el camino que guía a las almas.'],
  ['Veladoras', 'Su luz representa esperanza y guía para quienes regresan.'],
  ['Mariposa monarca', 'En algunas tradiciones se relaciona con el regreso de las almas.'],
  ['La Catrina', 'Personaje icónico de la cultura popular mexicana.'],
  ['Pan de muerto', 'Ofrenda que recuerda y honra a nuestros seres queridos.'],
  ['Calavera', 'Representa una manera mexicana de recordar la vida y la muerte.']
];

// Color del resplandor de cada tarjeta (combina con su marco de papel picado)
const COLORES = ['#ff8b00', '#a020f0', '#ff8b00', '#a020f0', '#ff1a8c', '#ff8b00'];

const scene = document.querySelector('a-scene');
let ar;

/* ---------- Utilidades ---------- */
function rand(a, b) { return a + Math.random() * (b - a); }

function crear(tag, attrs, parent) {
  const e = document.createElement(tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}

/* ---------- Construye la experiencia de cada tarjeta ---------- */
function construirEscenario(el) {
  const i = Number(el.dataset.index);
  const color = COLORES[i];

  // Proporción real de la imagen (el ancho del target en MindAR siempre es 1)
  const img = document.getElementById('im' + i);
  const h = (img && img.naturalWidth) ? img.naturalHeight / img.naturalWidth : 0.62;

  // Quita los textos antiguos (ahora hay un letrero propio)
  Array.from(el.children)
    .filter(c => c.tagName === 'A-TEXT')
    .forEach(c => el.removeChild(c));

  // La figura 3D se vuelve pequeña y flota en la esquina inferior derecha
  // (la mariposa se queda grande: vuela por encima de toda la tarjeta)
  const figura = el.children[0];
  if (figura && i !== 2) {
    figura.setAttribute('position', `${0.36} ${(-h / 2 + 0.15).toFixed(3)} 0.28`);
    figura.setAttribute('scale', '0.36 0.36 0.36');
  }

  // Grupo que flota suavemente y se inclina un poco (efecto de profundidad)
  const flota = crear('a-entity', {
    animation: 'property: position; from: 0 0 0.04; to: 0 0 0.11; dir: alternate; loop: true; dur: 2200; easing: easeInOutSine',
    animation__tilt: 'property: rotation; from: -3 -5 0; to: 3 5 0; dir: alternate; loop: true; dur: 3600; easing: easeInOutSine'
  }, el);

  // Resplandor pulsante detrás de la imagen
  crear('a-plane', {
    width: 1.12,
    height: (h + 0.12).toFixed(3),
    position: '0 0 -0.01',
    material: `shader: flat; color: ${color}; transparent: true; opacity: 0.4`,
    animation: 'property: material.opacity; from: 0.2; to: 0.8; dir: alternate; loop: true; dur: 1300; easing: easeInOutSine'
  }, flota);

  // LA IMAGEN ESCANEADA, que aparece con efecto "pop"
  el.plano = crear('a-plane', {
    width: 1,
    height: h.toFixed(3),
    position: '0 0 0.01',
    scale: '0.2 0.2 0.2',
    material: `shader: flat; src: #im${i}; transparent: true; opacity: 0`,
    animation__pop: 'property: scale; from: 0.2 0.2 0.2; to: 1 1 1; dur: 800; easing: easeOutBack; startEvents: pop',
    animation__fade: 'property: material.opacity; from: 0; to: 1; dur: 500; easing: linear; startEvents: pop'
  }, flota);

  // Letrero con el nombre debajo de la tarjeta
  const yLetrero = (-h / 2 - 0.11).toFixed(3);
  crear('a-plane', {
    width: 0.96,
    height: 0.13,
    position: `0 ${yLetrero} 0.03`,
    material: 'shader: flat; color: #270c3e; transparent: true; opacity: 0.88'
  }, flota);
  crear('a-text', {
    value: datos[i][0].toUpperCase(),
    align: 'center',
    color: '#ffb02e',
    width: 1.7,
    position: `0 ${yLetrero} 0.04`
  }, flota);

  // Destellos dorados que suben
  for (let k = 0; k < 10; k++) {
    const x = rand(-0.55, 0.55);
    const z = rand(0.12, 0.3);
    crear('a-sphere', {
      radius: rand(0.008, 0.016).toFixed(3),
      position: `${x.toFixed(3)} ${(-h / 2).toFixed(3)} ${z.toFixed(3)}`,
      material: 'shader: flat; color: #ffd54f; transparent: true; opacity: 0.9',
      animation: `property: position; from: ${x.toFixed(3)} ${(-h / 2).toFixed(3)} ${z.toFixed(3)}; to: ${(x + rand(-0.1, 0.1)).toFixed(3)} ${(h / 2 + 0.1).toFixed(3)} ${z.toFixed(3)}; dur: ${Math.round(rand(2500, 5000))}; delay: ${Math.round(rand(0, 3000))}; loop: true; easing: linear`
    }, flota);
  }

  // Pétalos de cempasúchil que caen
  for (let k = 0; k < 8; k++) {
    const x = rand(-0.5, 0.5);
    const z = rand(0.1, 0.25);
    const dur = Math.round(rand(3500, 6500));
    crear('a-circle', {
      radius: 0.02,
      scale: '1 1.6 1',
      position: `${x.toFixed(3)} ${(h / 2 + 0.1).toFixed(3)} ${z.toFixed(3)}`,
      material: `shader: flat; color: ${k % 2 ? '#ff9d00' : '#ffb74d'}; side: double`,
      animation: `property: position; from: ${x.toFixed(3)} ${(h / 2 + 0.1).toFixed(3)} ${z.toFixed(3)}; to: ${(x + rand(-0.2, 0.2)).toFixed(3)} ${(-h / 2 - 0.05).toFixed(3)} ${z.toFixed(3)}; dur: ${dur}; delay: ${Math.round(rand(0, 3000))}; loop: true; easing: linear`,
      animation__rot: `property: rotation; from: 0 0 0; to: 180 360 90; dur: ${Math.round(rand(1500, 3000))}; loop: true; easing: linear`
    }, flota);
  }
}

/* ---------- Eventos de la escena ---------- */
scene.addEventListener('loaded', () => {
  ar = scene.systems['mindar-image-system'];
  document.querySelectorAll('[mindar-image-target]').forEach(construirEscenario);
  estado.textContent = 'Listo. Presiona Iniciar cámara.';
  start.disabled = false;
});

scene.addEventListener('arError', (e) => {
  estado.textContent = 'No se pudo iniciar la cámara o cargar targets.mind. Revisa permisos, HTTPS y consola.';
  console.error(e);
});

start.addEventListener('click', async () => {
  try {
    start.disabled = true;
    estado.textContent = 'Abriendo cámara…';
    await ar.start();
    intro.style.display = 'none';
    hud.hidden = false;
    setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
  } catch (e) {
    console.error(e);
    estado.textContent = 'Error al iniciar. Comprueba targets.mind, conexión, HTTPS y permisos de cámara.';
    start.disabled = false;
  }
});

document.querySelectorAll('[mindar-image-target]').forEach((el) => {
  el.addEventListener('targetFound', () => {
    const i = Number(el.dataset.index);
    nombre.textContent = ' ' + datos[i][0];
    mensaje.textContent = datos[i][1];
    mensaje.hidden = false;
    if (el.plano) el.plano.emit('pop');   // la imagen "salta" al aparecer
  });
  el.addEventListener('targetLost', () => {
    nombre.textContent = 'Apunta hacia una imagen del altar';
    mensaje.hidden = true;
  });
});

document.getElementById('info').addEventListener('click', () => {
  mensaje.textContent = 'Enfoca de frente una de las seis tarjetas, con buena luz y sin reflejos.';
  mensaje.hidden = !mensaje.hidden;
});

/* MODO PRUEBA: agrega ?debug=1 a la URL y aparece un cubo rojo sobre cada tarjeta. */
if (new URLSearchParams(location.search).get('debug') === '1') {
  scene.addEventListener('loaded', () => {
    document.querySelectorAll('[mindar-image-target]').forEach((el) => {
      crear('a-box', {
        position: '0 0 0.5', width: 0.3, height: 0.3, depth: 0.3,
        material: 'shader: flat; color: red',
        animation: 'property: rotation; to: 0 360 0; loop: true; dur: 3000; easing: linear'
      }, el);
    });
  });
}
