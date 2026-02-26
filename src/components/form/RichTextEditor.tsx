"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
  maxHeight?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Enter your content...",
  className = "",
  minHeight = "200px",
  maxHeight = "600px",
}) => {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["link", "image"],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "script",
    "indent",
    "align",
    "link",
    "image",
    "color",
    "background",
  ];

  return (
    <>
      <style jsx global>{`
        .rich-text-editor .ql-container {
          min-height: ${minHeight};
          max-height: none;
          overflow-y: visible;
          font-size: 14px;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }
        .rich-text-editor .ql-editor {
          min-height: ${minHeight};
          color: #667085;
        }
        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          border-color: #d0d5dd;
        }
        .rich-text-editor .ql-container {
          border-color: #d0d5dd;
        }
        .dark .rich-text-editor .ql-toolbar {
          background-color: #1d2939;
          border-color: #344054;
        }
        .dark .rich-text-editor .ql-container {
          background-color: #0c111d;
          border-color: #344054;
        }
        .dark .rich-text-editor .ql-editor {
          color: #98a2b3;
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: #98a2b3;
          font-style: normal;
        }
      `}</style>
      <div className={`rich-text-editor ${className}`}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default RichTextEditor;

