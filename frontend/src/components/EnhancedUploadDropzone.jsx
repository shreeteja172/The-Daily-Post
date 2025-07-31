import React, { useState, useCallback } from "react";
import { UploadDropzone } from "../lib/uploadthing";
import { toast } from "react-hot-toast";

const EnhancedUploadDropzone = ({
  onUploadComplete,
  onUploadError,
  uploadedImageUrl,
  onRemoveImage,
  className = "",
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  if (uploadedImageUrl) {
    return (
      <div className={`relative group ${className}`}>
        <div className="relative overflow-hidden rounded-lg border border-gray-200 p-2">
          <img
            src={uploadedImageUrl}
            alt="Uploaded preview"
            className="w-full h-48 object-cover rounded"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
            <button
              type="button"
              onClick={onRemoveImage}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Remove
            </button>
          </div>
        </div>
        <p className="text-sm text-green-600 mt-1 text-center">
          ✓ Image uploaded successfully
        </p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 transition-colors duration-200
          ${
            isDragOver
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }
          ${isUploading ? "pointer-events-none" : "cursor-pointer"}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isUploading && (
          <div className="absolute inset-0 bg-white/90 rounded-lg flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-gray-700 text-sm">Uploading...</p>
            </div>
          </div>
        )}

        <UploadDropzone
          endpoint="image"
          onClientUploadComplete={(res) => {
            setIsUploading(false);
            if (res && res[0]) {
              onUploadComplete(res[0].url);
              toast.success("Image uploaded successfully!");
            }
          }}
          onUploadError={(error) => {
            setIsUploading(false);
            onUploadError(error);
            toast.error(`Upload failed: ${error.message}`);
          }}
          onUploadBegin={() => {
            setIsUploading(true);
          }}
          appearance={{
            container: "w-full h-full border-none bg-transparent p-0",
            uploadIcon: "text-blue-500",
            label: "text-gray-700 font-medium",
            allowedContent: "text-gray-500 text-sm",
            button:
              "bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors",
          }}
          content={{
            uploadIcon: () => (
              <svg
                className="w-12 h-12 text-blue-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            ),
            label: () => (
              <p className="text-gray-700 font-medium mb-2">
                {isDragOver
                  ? "Drop your image here"
                  : "Click to upload or drag and drop"}
              </p>
            ),
            allowedContent: () => (
              <p className="text-gray-500 text-sm">PNG, JPG, GIF up to 4MB</p>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default EnhancedUploadDropzone;
