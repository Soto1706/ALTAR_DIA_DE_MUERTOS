# Ejecuta: pip install qrcode[pil]
# Luego: python generar_qr.py https://TU-USUARIO.github.io/ALTAR_RA_DIA_DE_MUERTOS/
import sys
import qrcode
if len(sys.argv)<2 or not sys.argv[1].startswith('https://'):
    raise SystemExit('Uso: python generar_qr.py https://direccion-publicada/')
qrcode.make(sys.argv[1]).save('QR_FUNCIONAL.png')
print('Creado QR_FUNCIONAL.png')
