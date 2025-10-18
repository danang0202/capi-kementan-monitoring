type AlertOptions = {
  title: string;
  text: string;
  icon: 'success' | 'error' | 'warning' | 'info' | 'question';
  confirmButtonText: string;
};

type ConfirmationOptions = AlertOptions & {
  cancelButtonText: string;
};

export type { AlertOptions, ConfirmationOptions };
