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
        <div className="relative overflow-hidden rounded-xl border border-emerald-500/30 bg-black/20 backdrop-blur-sm">
          <img
            src={uploadedImageUrl}
            alt="Uploaded preview"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
            <button
              type="button"
              onClick={onRemoveImage}
              className="bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 hover:scale-105"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span>Remove</span>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center mt-3">
          <div className="flex items-center space-x-2 text-emerald-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-sm font-medium">Image uploaded successfully</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          relative border-2 border-dashed rounded-xl transition-all duration-300 overflow-hidden
          ${
            isDragOver
              ? "border-emerald-400 bg-emerald-500/10 scale-[1.02]"
              : "border-emerald-500/30 hover:border-emerald-500/50 bg-black/20"
          }
          ${isUploading ? "pointer-events-none" : "cursor-pointer"}
          backdrop-blur-sm
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

        {isUploading && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md rounded-xl flex items-center justify-center z-10">
            <div className="text-center">
              <div className="relative">
                <div className="w-12 h-12 border-2 border-emerald-500/30 rounded-full"></div>
                <div className="absolute top-0 left-0 w-12 h-12 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-emerald-100 text-sm font-medium mt-4">
                Uploading image...
              </p>
              <div className="w-32 h-1 bg-emerald-500/20 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
              </div>
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
            container:
              "w-full h-full border-none bg-transparent p-8 cursor-pointer",
            uploadIcon: "text-emerald-400",
            label: "text-emerald-100 font-medium cursor-pointer",
            allowedContent: "text-emerald-100/60 text-sm cursor-pointer",
            button:
              "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transform cursor-pointer",
          }}
          content={{
            uploadIcon: () => (
              <div className="relative mb-6 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-xl"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                  <svg
                    className="w-8 h-8 text-white"
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
                </div>
              </div>
            ),
            label: () => (
              <div className="text-center mb-4 pointer-events-none">
                <p className="text-emerald-100 font-medium text-lg mb-2">
                  {isDragOver
                    ? "Drop your image here"
                    : "Click to upload or drag and drop"}
                </p>
                {isDragOver && (
                  <p className="text-emerald-400 text-sm animate-pulse">
                    Release to upload
                  </p>
                )}
              </div>
            ),
            allowedContent: () => (
              <div className="flex items-center justify-center space-x-4 text-emerald-100/60 text-sm pointer-events-none">
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>PNG, JPG, GIF</span>
                </div>
                <div className="w-px h-4 bg-emerald-500/30"></div>
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                    />
                  </svg>
                  <span>Up to 4MB</span>
                </div>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default EnhancedUploadDropzone;
