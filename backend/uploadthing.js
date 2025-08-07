import { createUploadthing } from "uploadthing/express";

const f = createUploadthing();

export const uploadRouter = {
  image: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
      allowedFileTypes: ["image/jpeg", "image/png", "image/gif"],
    },
  }).onUploadComplete(async (file) => {
    return { fileUrl: file.url };
  }),

  profilePicture: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
      allowedFileTypes: ["image/jpeg", "image/png"],
    },
  }).onUploadComplete(async (file) => {
    return { profileUrl: file.url };
  }),
};
