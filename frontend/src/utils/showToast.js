import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const showToast = (message, type) => {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'right',
    offset: {
      x: 5,
      y: 50
    },
    style: {
      background: '#000', // Fondo negro
      color: '#fff', // Texto blanco
      fontWeight: 'bold', // Texto en negrita
      borderRadius: '5px', // Bordes redondeados
      padding: '10px'
    }
  }).showToast()
}
export default showToast
