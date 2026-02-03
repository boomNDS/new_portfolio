/**
 * Utility functions for the portfolio application
 */

// ============================================
// Color Utilities
// ============================================

export interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Calculates the average RGB color from an image element
 * @param imgEl - The image element to analyze
 * @returns The average RGB values
 */
export function getAverageRGB(imgEl: HTMLImageElement): RGB {
  const blockSize = 5;
  const defaultRGB: RGB = { r: 0, g: 0, b: 0 };

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return defaultRGB;
  }

  const height = (canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height);
  const width = (canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width);

  context.drawImage(imgEl, 0, 0);

  let data: ImageData;
  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    // biome-ignore lint/suspicious/noConsole: keep error detail for image data failures
    console.error("Security error: Unable to access image data.", e);
    return defaultRGB;
  }

  const length = data.data.length;
  const rgb: RGB = { r: 0, g: 0, b: 0 };
  let count = 0;

  for (let i = 0; i < length; i += blockSize * 4) {
    count++;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  rgb.r = Math.floor(rgb.r / count);
  rgb.g = Math.floor(rgb.g / count);
  rgb.b = Math.floor(rgb.b / count);

  return rgb;
}

/**
 * Converts RGB values to a hex color string
 * @param rgb - The RGB values
 * @returns Hex color string (e.g., #ff0000)
 */
export function rgbToHex(rgb: RGB): string {
  const toHex = (n: number): string => {
    const hex = n.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

/**
 * Converts a hex color string to RGBA
 * @param hex - The hex color string
 * @param alpha - The alpha value (0-1)
 * @returns RGBA color string
 */
export function hexToRgba(hex: string, alpha = 1): string {
  const cleanHex = hex.replace("#", "");
  const bigint = Number.parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ============================================
// Date Utilities
// ============================================

/**
 * Formats a date to a relative time string
 * @param date - The date to format
 * @returns Relative time string (e.g., "2 days ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}

// ============================================
// String Utilities
// ============================================

/**
 * Truncates a string to a specified length
 * @param str - The string to truncate
 * @param length - The maximum length
 * @returns Truncated string with ellipsis if needed
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return `${str.slice(0, length).trim()}...`;
}

/**
 * Converts a string to kebab-case
 * @param str - The string to convert
 * @returns Kebab-case string
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

// ============================================
// Validation Utilities
// ============================================

/**
 * Validates an email address
 * @param email - The email to validate
 * @returns True if valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a URL
 * @param url - The URL to validate
 * @returns True if valid
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
