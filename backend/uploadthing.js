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
    // console.log("✅ File uploaded:", file);
    return { fileUrl: file.url };
  }),
};
