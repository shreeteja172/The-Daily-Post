import { generateUploadDropzone } from "@uploadthing/react";

export const UploadDropzone = generateUploadDropzone({
  url: `${import.meta.env.VITE_BACKEND_URL}/api/uploadthing/blogs`,
});
