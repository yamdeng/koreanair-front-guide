import { toast } from 'react-toastify';

class ToastService {
  success(message) {
    toast.success(message);
  }
  error(message) {
    toast.error(message);
  }
  warn(message) {
    toast.warn(message);
  }
  info(message) {
    toast.info(message);
  }
}

export default new ToastService();
