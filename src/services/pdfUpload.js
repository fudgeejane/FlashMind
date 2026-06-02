export async function uploadPdfToCloudinary(file) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to .env.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("resource_type", "raw");

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Cloudinary PDF upload failed.");
  }

  return response.json();
}

export function canUploadPdfToCloudinary() {
  return Boolean(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME && import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
}

export function getCloudinarySecurityNote() {
  return "Cloudinary browser uploads need VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET. The API key alone is not enough for unsigned browser upload.";
}
