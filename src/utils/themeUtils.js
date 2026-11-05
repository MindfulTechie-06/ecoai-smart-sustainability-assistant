/**
 * Checks if current local hour is night time (6:00 PM to 6:00 AM)
 */
export function getIsNightByTime() {
  if (typeof window === 'undefined') return false;
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6;
}

/**
 * Returns formatted local time string, e.g. "4:30 PM"
 */
export function getFormattedLocalTime() {
  if (typeof window === 'undefined') return '';
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

