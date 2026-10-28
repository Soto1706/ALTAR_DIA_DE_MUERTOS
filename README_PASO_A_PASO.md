# ALTAR RA — INSTALACIÓN PASO A PASO

## Qué incluye
- 6 tarjetas JPG en `imagenes/`, también en `IMAGENES_PARA_IMPRIMIR.pdf`.
- `index.html`, `style.css`, `script.js`: aplicación web con seis animaciones tridimensionales sencillas realizadas con primitivas A-Frame.
- `generar_qr.py`: crea el QR real cuando tengas la URL publicada.

**IMPORTANTE:** Falta `targets.mind`, que debes generar en el compilador de MindAR; no se puede sustituir por un JPG. El QR de la ilustración anterior NO es funcional. Las animaciones son figuras 3D simplificadas, no modelos profesionales descargados.

## 1. Preparar VS Code
1. Descomprime el ZIP.
2. Abre Visual Studio Code > Archivo > Abrir carpeta > selecciona `ALTAR_RA_DIA_DE_MUERTOS`.
3. Instala la extensión **Live Server** (Ritwick Dey) si quieres probar en tu computadora.
4. No abras `index.html` con doble clic como `file://`: usa un servidor web.

## 2. Generar `targets.mind` (OBLIGATORIO)
1. Abre en Chrome de computadora: https://hiukim.github.io/mind-ar-js-doc/tools/compile/
2. Selecciona/carga las seis imágenes JPG en el siguiente orden EXACTO:
   0 `imagenes/cempasuchil.jpg`
   1 `imagenes/veladoras.jpg`
   2 `imagenes/mariposa.jpg`
   3 `imagenes/catrina.jpg`
   4 `imagenes/pan_muerto.jpg`
   5 `imagenes/calavera.jpg`
3. Espera a que termine el análisis de las imágenes. Si el compilador indica pocas características, utiliza tarjetas más detalladas y recompila.
4. Descarga el archivo generado (usualmente `targets.mind`).
5. Muévelo a la raíz del proyecto, junto a `index.html`.
6. Comprueba que el nombre sea exactamente `targets.mind` y no `targets.mind.txt`.
7. Si cambias cualquier tarjeta, vuelve a generar el archivo y reimprime esa tarjeta.

## 3. Prueba local en computadora
1. Clic derecho en `index.html` > Open with Live Server.
2. Debe abrir algo como `http://127.0.0.1:5500`.
3. Pulsa **Iniciar cámara** y concede permiso.
4. Muestra las tarjetas impresas frente a la cámara. Verás objetos 3D sobre las imágenes reconocidas.
5. Abre F12 > Consola para ver errores.

## 4. Publicar para el celular con GitHub Pages (HTTPS)
1. En https://github.com crea una cuenta o inicia sesión.
2. Pulsa New repository. Nombre sugerido: `ALTAR_RA_DIA_DE_MUERTOS`; visibilidad Public.
3. En el repositorio elige **Add file > Upload files**.
4. Sube **el contenido de la carpeta**: `index.html`, `style.css`, `script.js`, `targets.mind`, `imagenes/` con sus JPG. No subas solo el ZIP.
5. Haz Commit changes.
6. Ve a **Settings > Pages**. En Build and deployment selecciona **Deploy from a branch**, rama `main`, carpeta `/(root)` y pulsa Save.
7. Espera unos minutos. La dirección será del estilo `https://TU-USUARIO.github.io/ALTAR_RA_DIA_DE_MUERTOS/` (respeta mayúsculas).
8. Abre esa URL desde Chrome en Android o Safari en iPhone. Concede permiso a la cámara.
9. Si no aparece, revisa la ruta de `targets.mind`, la consola y que la página se haya publicado correctamente.

## 5. Crear el QR real
1. Instala Python si no lo tienes.
2. Abre Terminal > New Terminal en VS Code.
3. Ejecuta `python -m pip install "qrcode[pil]"`.
4. Ejecuta `python generar_qr.py https://TU-USUARIO.github.io/ALTAR_RA_DIA_DE_MUERTOS/` reemplazando por TU URL real.
5. Imprime el archivo `QR_FUNCIONAL.png` que se generará.
6. Verifica el QR con otro celular antes de colocarlo en el altar.

## 6. Imprimir y armar altar
1. Abre `IMAGENES_PARA_IMPRIMIR.pdf` e imprime a tamaño real / 100%, sin ajustar si quieres conservar el tamaño previsto.
2. Recorta las seis tarjetas sin cortar sus ilustraciones.
3. Monta en cartón rígido; evita papel brillante y reflejos.
4. NIVEL INFERIOR (izq. a der.): cempasúchil, veladoras, mariposa.
5. NIVEL MEDIO (izq. a der.): Catrina, pan de muerto.
6. NIVEL SUPERIOR: calavera.
7. Coloca el QR en un letrero al lado del altar (NO dentro de las tarjetas).
8. Ilumina de forma uniforme y enfoca las tarjetas completas, de frente, a una distancia aproximada de 20 a 60 cm; ajusta según cámara e impresión.

## 7. Solución de problemas
- **Pantalla en negro:** revisa permisos de cámara, HTTPS y si hay otra app usando la cámara.
- **No reconoce tarjetas:** recompila `targets.mind` con las mismas imágenes y en el mismo orden; mejora iluminación y evita brillos.
- **404 en targets.mind:** archivo ausente, mal nombrado o no subido a GitHub.
- **Error al abrir desde celular:** `localhost` del PC no sirve desde otro dispositivo; usa GitHub Pages.
- **Librerías no cargan:** requiere conexión a Internet para A-Frame y MindAR desde CDN.
- **Animaciones no aparecen:** mira F12/Consola en PC y verifica que la cámara encuentre el marcador.
- **El reconocimiento es inestable:** imprime en mate, usa tarjetas planas y separadas, no las tapes con adornos.

## Recomendación de presentación
Muestra primero el QR, permite que el público lo escanee y después que enfoque cada tarjeta por separado. La aplicación reconoce imágenes; el QR solo abre el sitio web.
