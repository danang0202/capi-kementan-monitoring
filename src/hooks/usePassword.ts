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

  return { updatePassword, forgotPassword };
};
