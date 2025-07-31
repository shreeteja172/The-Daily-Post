"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Undo,
  Redo,
  ChevronDown,
} from "lucide-react";

const ToolbarButton = ({
  onClick,
  isActive = false,
  disabled = false,
  children,
  title,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        flex items-center justify-center w-8 h-8 rounded transition-colors duration-200
        ${
          isActive
            ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/40"
            : "text-emerald-300 hover:bg-emerald-500/20 border border-transparent hover:border-emerald-500/30"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

const Dropdown = ({
  value,
  onChange,
  options,
  placeholder,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(placeholder);

  useEffect(() => {
    const selected = options.find((opt) => opt.value === value);
    if (selected) {
      setSelectedLabel(selected.label);
    }
  }, [value, options]);

  const handleSelect = (option) => {
    onChange(option.value);
    setSelectedLabel(option.label);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-1.5 text-sm bg-black/40 border border-emerald-500/30 rounded text-emerald-300 hover:bg-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 z-20 w-full mt-1 bg-black/90 border border-emerald-500/30 rounded shadow-lg max-h-60 overflow-auto backdrop-blur-sm">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className="w-full px-3 py-2 text-left text-sm text-emerald-300 hover:bg-emerald-500/20 focus:outline-none focus:bg-emerald-500/20"
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const RichTextEditor = ({ value = "", onChange, className = "" }) => {
  const editorRef = useRef(null);
  const [fontSize, setFontSize] = useState("3");
  const [headingType, setHeadingType] = useState("div");
  const [isEditorEmpty, setIsEditorEmpty] = useState(!value);

  const fontSizeOptions = [
    { label: "12px", value: "1" },
    { label: "14px", value: "2" },
    { label: "16px", value: "3" },
    { label: "18px", value: "4" },
    { label: "24px", value: "5" },
    { label: "32px", value: "6" },
    { label: "48px", value: "7" },
  ];

  const headingOptions = [
    { label: "Paragraph", value: "div" },
    { label: "Heading 1", value: "h1" },
    { label: "Heading 2", value: "h2" },
    { label: "Heading 3", value: "h3" },
  ];

  const executeCommand = useCallback((command, value) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  }, []);

  const handleUndo = () => executeCommand("undo");
  const handleRedo = () => executeCommand("redo");

  const handleBold = () => executeCommand("bold");
  const handleItalic = () => executeCommand("italic");
  const handleUnderline = () => executeCommand("underline");
  const handleStrikethrough = () => executeCommand("strikeThrough");

  const handleAlignLeft = () => executeCommand("justifyLeft");
  const handleAlignCenter = () => executeCommand("justifyCenter");
  const handleAlignRight = () => executeCommand("justifyRight");

  const handleBulletList = () => executeCommand("insertUnorderedList");
  const handleNumberedList = () => executeCommand("insertOrderedList");

  const handleInlineCode = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();

      if (selectedText) {
        const codeElement = document.createElement("code");
        codeElement.className =
          "bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-red-600";
        codeElement.textContent = selectedText;

        range.deleteContents();
        range.insertNode(codeElement);

        selection.removeAllRanges();
      }
    }
  };

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
    executeCommand("fontSize", newSize);
  };

  const handleHeadingChange = (tag) => {
    setHeadingType(tag);
    executeCommand("formatBlock", tag);
  };

  const handleInsertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      const textContent = editorRef.current.textContent?.trim() || "";
      const isEmpty = textContent === "";

      setIsEditorEmpty(isEmpty);

      if (isEmpty) {
        editorRef.current.innerHTML = "";
      }

      if (onChange) {
        onChange(content);
      }
    }
  };

  const isCommandActive = (command) => {
    try {
      return document.queryCommandState(command);
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
      setIsEditorEmpty(!value || value.trim() === "");
    }
  }, [value]);

  useEffect(() => {
    if (editorRef.current) {
      setIsEditorEmpty(!value || editorRef.current.textContent?.trim() === "");
    }
  }, [value]);

  return (
    <div
      className={`w-full h-full bg-black/40 border border-emerald-500/30 rounded-xl shadow-lg backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-2 p-4 border-b border-emerald-500/20 bg-black/20 rounded-t-xl flex-wrap">
        <div className="flex items-center gap-1">
          <ToolbarButton onClick={handleUndo} title="Undo (Ctrl+Z)">
            <Undo className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton onClick={handleRedo} title="Redo (Ctrl+Y)">
            <Redo className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <div className="w-px h-6 bg-emerald-500/30" />

        <Dropdown
          value={fontSize}
          onChange={handleFontSizeChange}
          options={fontSizeOptions}
          placeholder="16px"
          className="w-20"
        />

        <Dropdown
          value={headingType}
          onChange={handleHeadingChange}
          options={headingOptions}
          placeholder="Paragraph"
          className="w-28"
        />

        <div className="w-px h-6 bg-emerald-500/30" />

        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={handleBold}
            isActive={isCommandActive("bold")}
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={handleItalic}
            isActive={isCommandActive("italic")}
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={handleUnderline}
            isActive={isCommandActive("underline")}
            title="Underline (Ctrl+U)"
          >
            <Underline className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={handleStrikethrough}
            isActive={isCommandActive("strikeThrough")}
            title="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton onClick={handleInlineCode} title="Inline Code">
            <Code className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <div className="w-px h-6 bg-emerald-500/30" />

        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={handleAlignLeft}
            isActive={isCommandActive("justifyLeft")}
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={handleAlignCenter}
            isActive={isCommandActive("justifyCenter")}
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={handleAlignRight}
            isActive={isCommandActive("justifyRight")}
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <div className="w-px h-6 bg-emerald-500/30" />

        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={handleBulletList}
            isActive={isCommandActive("insertUnorderedList")}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={handleNumberedList}
            isActive={isCommandActive("insertOrderedList")}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <div className="w-px h-6 bg-emerald-500/30" />

        <ToolbarButton onClick={handleInsertLink} title="Insert Link (Ctrl+K)">
          <Link className="h-4 w-4" />
        </ToolbarButton>
      </div>

      <div className="relative flex-1">
        <div
          ref={editorRef}
          contentEditable
          className="min-h-[600px] h-full p-8 focus:outline-none prose prose-lg max-w-none text-white prose-headings:text-emerald-300 prose-p:text-gray-200 prose-strong:text-white prose-em:text-gray-300"
          onInput={handleEditorInput}
          style={{
            lineHeight: "1.8",
          }}
          suppressContentEditableWarning={true}
        />

        {isEditorEmpty && (
          <div className="absolute top-8 left-8 text-gray-400 pointer-events-none select-none text-lg">
            Start writing your content here...
          </div>
        )}
      </div>

      <div className="px-8 py-3 border-t border-emerald-500/20 bg-black/20 rounded-b-xl">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Rich Text Editor</span>
          <span>Click and start typing</span>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
