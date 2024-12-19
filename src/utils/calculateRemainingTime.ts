export const calculateRemainingTime = (endDate: Date): { days: number; hours: number } => {
  const now = new Date();
  const end = new Date(endDate);

  if (end < now) {
    return { days: 0, hours: 0 }; // Jika endDate sudah lewat
  }

  const diffInMilliseconds = end.getTime() - now.getTime();
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const days = Math.floor(diffInHours / 24);
  const hours = diffInHours % 24;

  return { days, hours };
};
