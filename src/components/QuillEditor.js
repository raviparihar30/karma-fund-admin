import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

// Import the image upload module for Quill
const Image = Quill.import("formats/image");
Image.className = "quill-image";
Quill.register(Image, true);

const QuillEditor = ({ value, onChange }) => {
  const handleEditorChange = (content, _, __, editor) => {
    onChange(editor.getHTML());
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleEditorChange}
      modules={{
        toolbar: {
          container: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["link", "image"], // Add the "image" option to the toolbar
            ["clean"],
          ],
        },
      }}
      formats={[
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "align",
        "link",
        "image",
      ]} // Include the 'image' format
      theme="snow"
      className="quill-container"
    />
  );
};

export default QuillEditor;
