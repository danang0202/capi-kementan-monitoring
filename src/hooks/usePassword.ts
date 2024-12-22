export const usePassword = () => {
  const updatePassword = async (oldPassword: string, newPassword: string, confirmNewPassword: string) => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${API_URL}auth/update-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ oldPassword, newPassword, confirmNewPassword }),
      });
      return response.json();
    } catch (error) {
      console.error('update password error:', error);
      throw error;
    }

    return;
  };

  const forgotPassword = async (email: string) => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${API_URL}auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      return response.json();
    } catch (error) {
      console.error('send reset passwoord link error:', error);
      throw error;
    }

    return;
  };

  const resetPassword = async (email: string, newPassword: string, confirmNewPassword: string, token: string) => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${API_URL}auth/reset-password?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword, confirmNewPassword }),
      });
      return response.json();
    } catch (error) {
      console.error('reset password error:', error);
      throw error;
    }

    return;
  };

  const checkResetToken = async (token: string) => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${API_URL}auth/check-token-reset-password?token=${token}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      return response.json();
    } catch (error) {
      console.error('check reset token error:', error);
      throw error;
    }

    return;
  };

  return { updatePassword, forgotPassword, resetPassword, checkResetToken };
};
