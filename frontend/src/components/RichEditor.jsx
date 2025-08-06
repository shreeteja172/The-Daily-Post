import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const TOOLBAR_OPTIONS = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }],
  ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"],
];

const RichEditor = ({
  value = "",
  onChange,
  placeholder = "   Write something...",
  outputFormat = "html",
}) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Custom image handler with upload placeholder
  const imageHandler = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        const quill = quillRef.current;
        const range = quill.getSelection(true);
        if (range) {
          quill.insertEmbed(range.index, "image", base64Image, "user");
          quill.setSelection(range.index + 1);
        }
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  useEffect(() => {
    let quill;
    if (editorRef.current && !quillRef.current && !editorRef.current.__quill) {
      quill = new Quill(editorRef.current, {
        theme: "snow",
        placeholder,
        modules: {
          toolbar: {
            container: TOOLBAR_OPTIONS,
            handlers: {
              image: imageHandler,
            },
          },
        },
      });

      quill.on("text-change", () => {
        if (onChange) {
          if (outputFormat === "delta") {
            onChange(quill.getContents());
          } else if (outputFormat === "both") {
            onChange({
              html: quill.root.innerHTML,
              delta: quill.getContents(),
            });
          } else {
            onChange(quill.root.innerHTML);
          }
        }
      });

      if (value) {
        if (outputFormat === "delta" && typeof value === "object") {
          quill.setContents(value);
        } else if (outputFormat === "both" && value?.delta) {
          quill.setContents(value.delta);
        } else {
          quill.root.innerHTML = value;
        }
      }

      quill.root.addEventListener("focus", () => setIsFocused(true));
      quill.root.addEventListener("blur", () => setIsFocused(false));

      quillRef.current = quill;
    }
    return () => {
      if (quillRef.current) {
        quillRef.current.off && quillRef.current.off();
        if (quillRef.current.root) {
          quillRef.current.root.removeEventListener("focus", () =>
            setIsFocused(true)
          );
          quillRef.current.root.removeEventListener("blur", () =>
            setIsFocused(false)
          );
        }
        if (quillRef.current.destroy) {
          quillRef.current.destroy();
        }
        quillRef.current = null;
      }
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;
    if (outputFormat === "delta" && typeof value === "object") {
      if (JSON.stringify(quill.getContents()) !== JSON.stringify(value)) {
        quill.setContents(value);
      }
    } else if (outputFormat === "both" && value?.delta) {
      if (JSON.stringify(quill.getContents()) !== JSON.stringify(value.delta)) {
        quill.setContents(value.delta);
      }
    } else if (outputFormat === "html" && value !== quill.root.innerHTML) {
      const selection = quill.getSelection();
      quill.root.innerHTML = value || "";
      if (selection) {
        quill.setSelection(selection.index, selection.length);
      }
    }
  }, [value, outputFormat]);

  return (
    <div
      style={{
        border: isFocused ? "2px solid #4f8cff" : "1px solid #ddd",
        borderRadius: "12px",
        background: "linear-gradient(135deg, #f8fafc 0%, #e9f0fb 100%)",
        boxShadow: isFocused
          ? "0 4px 16px 0 rgba(79,140,255,0.10)"
          : "0 1px 4px rgba(0,0,0,0.05)",
        overflow: "hidden",
        transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
        margin: "0 auto",
        maxWidth: 700,
        width: "100%",
      }}
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      {uploading && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.7)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            color: "#4f8cff",
            fontSize: 18,
          }}
        >
          Uploading image...
        </div>
      )}
      <div
        ref={editorRef}
        style={{
          minHeight: "240px",
          padding: "16px 12px 32px 12px",
          fontSize: "1.08rem",
          lineHeight: "1.7",
          fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
          background: "transparent",
          outline: "none",
          transition: "box-shadow 0.2s cubic-bezier(.4,2,.6,1)",
        }}
        tabIndex={0}
        aria-label="Rich text editor"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default RichEditor;
