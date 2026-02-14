import dayjs from "dayjs";

/**
 * Format date to readable string (e.g., "February 14, 2026")
 */
export function formatDate(date: string | Date | undefined): string {
  if (!date) return "";
  return dayjs(date).format("MMMM D, YYYY");
}

/**
 * Format date to short string (e.g., "Feb 14")
 */
export function formatDateShort(date: string | Date | undefined): string {
  if (!date) return "";
  return dayjs(date).format("MMM D");
}

/**
 * Format date with time (e.g., "February 14, 2026 at 2:30 PM")
 */
export function formatDateTime(date: string | Date | undefined): string {
  if (!date) return "";
  return dayjs(date).format("MMMM D, YYYY [at] h:mm A");
}

/**
 * Get relative time (e.g., "2 days ago")
 */
export function formatRelative(date: string | Date | undefined): string {
  if (!date) return "";
  return dayjs(date).fromNow();
}

/**
 * Check if date is valid
 */
export function isValidDate(date: string | Date | undefined): boolean {
  if (!date) return false;
  return dayjs(date).isValid();
}
