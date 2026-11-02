/**
 * LA MAIA Date & Timezone Utilities
 * Timezone standard: Asia/Kolkata (IST = UTC+5:30)
 */

export const IST_TIMEZONE = 'Asia/Kolkata';

/**
 * Returns formatted date string in Indian standard representation.
 */
export function formatISTDate(date: Date | string | number, options: Intl.DateTimeFormatOptions = {}): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: IST_TIMEZONE,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...options,
  }).format(d);
}

/**
 * Returns formatted date & time string in IST.
 */
export function formatISTDateTime(date: Date | string | number): string {
  return formatISTDate(date, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Checks if a batch or promotional credit has expired relative to current IST time.
 */
export function isExpired(expiryDate: Date | string): boolean {
  const expiry = new Date(expiryDate).getTime();
  const now = Date.now();
  return expiry <= now;
}

