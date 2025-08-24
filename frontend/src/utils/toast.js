import Swal from 'sweetalert2'

const baseToast = ({ icon, title, timer = 2000 }) => {
  return Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer,
    icon,
    title,
    customClass: {
      popup: 'custom-toast',
      title: 'custom-title'
    }
  })
}

export const toastSuccess = (msg, timer) => baseToast({ icon: 'success', title: msg, timer })
export const toastError = (msg, timer) => baseToast({ icon: 'error', title: msg, timer })
export const toastWarning = (msg, timer) => baseToast({ icon: 'warning', title: msg, timer })
export const toastInfo = (msg, timer) => baseToast({ icon: 'info', title: msg, timer })

export const modalConfirm = (options = {}) => {
  const { title = '¿Estás seguro?', text = '', confirmButtonText = 'Confirmar', cancelButtonText = 'Cancelar', icon = 'warning', confirmColor = '#5E4631' } = options
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    focusCancel: true,
    buttonsStyling: false,
    width: '40rem',
    customClass: {
      popup: 'swal2-custom-modal',
      title: 'swal2-custom-modal-title',
      htmlContainer: 'swal2-custom-modal-text',
      confirmButton: 'swal2-btn-confirm',
      cancelButton: 'swal2-btn-cancel'
    },
    didOpen: (el) => {
      const confirm = el.querySelector('.swal2-btn-confirm')
      const cancel = el.querySelector('.swal2-btn-cancel')
      if (confirm) confirm.style.setProperty('--btn-color', confirmColor)
      if (cancel) cancel.style.setProperty('--btn-color', '#888')
    }
  })
}

export default {
  toastSuccess,
  toastError,
  toastWarning,
  toastInfo,
  modalConfirm
}
