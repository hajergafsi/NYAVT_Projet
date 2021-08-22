import { toast } from "react-toastify"

toast.configure()

export const toastSuccess = (message, timer = 3000) => {
  toast.success(message, {
    position: 'bottom-center',
    autoClose: timer,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false
  })
}

export const toastError = (message, timer = 3000) => {
  toast.error(message, {
    position: 'bottom-center',
    autoClose: timer,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false
  })
}