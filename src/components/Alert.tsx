import Swal, { SweetAlertResult } from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

type AlertOptions = {
  title: string;
  text: string;
  icon: 'success' | 'error' | 'warning' | 'info' | 'question';
  confirmButtonText: string;
};

type ConfirmationOptions = AlertOptions & {
  cancelButtonText: string;
};

const Alert = () => {
  const showAlert = ({ title, text, icon, confirmButtonText }: AlertOptions): Promise<SweetAlertResult<any>> => {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText,
    });
  };

  const showConfirmation = ({ title, text, icon, confirmButtonText, cancelButtonText }: ConfirmationOptions): Promise<SweetAlertResult<any>> => {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
    });
  };

  return { showAlert, showConfirmation };
};

export default Alert;
