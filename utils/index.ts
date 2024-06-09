// Define an interface for RGB color
interface RGB {
  r: number;
  g: number;
  b: number;
}

// Function to get the average RGB value from an image element
export function getAverageRGB(imgEl: HTMLImageElement): RGB {
  const blockSize = 5; // Only visit every 5 pixels
  const defaultRGB: RGB = { r: 0, g: 0, b: 0 }; // Default RGB for non-supporting environments

  // Create a canvas element and get its 2D context
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // If context is not available, return the default RGB
  if (!context) {
    return defaultRGB;
  }

  // Set canvas dimensions to match the image element's dimensions
  const height = (canvas.height =
    imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height);
  const width = (canvas.width =
    imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width);

  // Draw the image on the canvas
  context.drawImage(imgEl, 0, 0);

  let data: ImageData;
  try {
    // Get the image data from the canvas
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    // Handle security error for images from a different domain
    console.error("Security error: Unable to access image data.");
    return defaultRGB;
  }

  // Initialize variables to accumulate RGB values
  const length = data.data.length;
  const rgb: RGB = { r: 0, g: 0, b: 0 };
  let count = 0;

  // Iterate through the pixel data in blocks
  for (let i = 0; i < length; i += blockSize * 4) {
    count++;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  // Calculate the average RGB values
  rgb.r = Math.floor(rgb.r / count);
  rgb.g = Math.floor(rgb.g / count);
  rgb.b = Math.floor(rgb.b / count);

  return rgb;
}

export function rgbToHex(rgb: RGB): string {
  const componentToHex = (c: number): string => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${componentToHex(rgb.r)}${componentToHex(rgb.g)}${componentToHex(rgb.b)}`;
}

export function hexToRgba(hex: string, alpha: number = 1): string {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r},${g},${b},${alpha})`;
}
