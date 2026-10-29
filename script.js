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

const scene = document.querySelector('a-scene');
let ar;

scene.addEventListener('loaded', () => {
  ar = scene.systems['mindar-image-system'];
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
    // Fuerza a A-Frame/MindAR a recalcular tamaños una vez visible el video
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
    console.log('targetFound', i, 'visible =', el.object3D.visible);
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

/* MODO PRUEBA: abre la página con ?debug=1 al final de la URL
   y aparecerá un cubo rojo giratorio sobre cada tarjeta.
   Ejemplo: https://TU-USUARIO.github.io/ALTAR_RA_DIA_DE_MUERTOS/?debug=1 */
if (new URLSearchParams(location.search).get('debug') === '1') {
  document.querySelectorAll('[mindar-image-target]').forEach((el) => {
    const cubo = document.createElement('a-box');
    cubo.setAttribute('position', '0 0 0.3');
    cubo.setAttribute('width', '0.4');
    cubo.setAttribute('height', '0.4');
    cubo.setAttribute('depth', '0.4');
    cubo.setAttribute('material', 'shader: flat; color: red');
    cubo.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 3000; easing: linear');
    el.appendChild(cubo);
  });
}
