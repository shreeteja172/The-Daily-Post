// import React, { useState } from "react";
// import { ProfileUploadDropzone } from "../lib/uploadthing";
// import { toast } from "react-hot-toast";

// export default function ProfileImageUploader({ onUploadComplete }) {
//   const [uploadedImage, setUploadedImage] = useState("");

//   return (
//     <div className="flex flex-col items-center gap-4">
//       {/* Preview */}
//       {uploadedImage && (
//         <img
//           src={uploadedImage}
//           alt="Profile Preview"
//           className="w-24 h-24 rounded-full object-cover border border-gray-300"
//         />
//       )}

//       {/* Upload */}
//       <ProfileUploadDropzone
//         onClientUploadComplete={(res) => {
//           if (res?.[0]?.url) {
//             setUploadedImage(res[0].url);
//             if (onUploadComplete) onUploadComplete(res[0].url);
//             toast.success("Profile image uploaded!");
//           }
//         }}
//         onUploadError={(err) => {
//           toast.error(`Upload failed: ${err.message}`);
//         }}
//       />
//     </div>
//   );
// }
