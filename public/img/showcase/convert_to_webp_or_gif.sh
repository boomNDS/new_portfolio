#!/bin/bash

# Function to convert images to WebP
convert_image_to_webp() {
  local input_file="$1"
  local output_file="${input_file%.*}.webp"
  cwebp -exact -q 100 "$input_file" -o "$output_file"
  echo "Converted $input_file to $output_file"
}

# Function to convert GIF to MP4
convert_gif_to_mp4() {
  local input_file="$1"
  local output_file="${input_file%.*}.mp4"
  ffmpeg -i "$input_file" -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" "$output_file"
  echo "Converted $input_file to $output_file"
}

# Loop over all files in the current directory
for file in *; do
  # Skip directories
  if [ -d "$file" ]; then
    continue
  fi

  # Get the file extension
  extension="${file##*.}"

  # Convert based on file extension
  case "$extension" in
    png|jpg|jpeg|tiff)
      convert_image_to_webp "$file"
      ;;
    gif)
      convert_gif_to_mp4 "$file"
      ;;
    *)
      echo "Skipping $file (unsupported format)"
      ;;
  esac
done
