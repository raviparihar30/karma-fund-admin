import { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const defaultFonts = [
  "Arial",
  "Comic Sans MS",
  "Courier New",
  "Impact",
  "Georgia",
  "Tahoma",
  "Trebuchet MS",
  "Verdana",
];

const sortedFontOptions = [
  "Logical",
  "Salesforce Sans",
  "Garamond",
  "Sans-Serif",
  "Serif",
  "Times New Roman",
  "Helvetica",
  ...defaultFonts,
].sort();

const SunEditorComponent = ({ value, onChange }) => {
  // const [value, onChange] = useState("");
  // const [fieldValue, setFieldValue] = useState("");

  return (
    <SunEditor
      setContents={value}
      onChange={(newInput) => {
        onChange(newInput);
        // setFieldValue("settlementNotes", newInput);
        const container = document.createElement("div");
        container.innerHTML = newInput;
        if (container) {
          const tables = container.querySelectorAll("table");
          const tds = container.querySelectorAll("td");
          const ths = container.querySelectorAll("th");

          for (let table of tables) {
            table.style.border = "1px solid #2B2B2B";
            table.style.borderCollapse = "collapse";
            table.style.width = "100%";
            table.style.marginTop = "20px";
          }
          for (let td of tds) {
            td.style.border = "1px solid #2B2B2B";
            td.style.borderCollapse = "collapse";
            td.style.padding = "10px";
          }
          for (let th of ths) {
            th.style.border = "1px solid #2B2B2B";
            th.style.borderCollapse = "collapse";
            th.style.padding = "10px";
          }

          // setFieldValue("settlementNotes", container.innerHTML);
          onChange(container.innerHTML);
        }
      }}
      setOptions={{
        buttonList: [
          ["undo", "redo"],
          ["font", "fontSize"],
          // ['paragraphStyle', 'blockquote'],
          ["bold", "underline", "italic", "strike", "subscript", "superscript"],
          ["fontColor", "hiliteColor"],
          ["align", "list", "lineHeight"],
          ["outdent", "indent"],

          ["table", "horizontalRule", "link", "image"],
          // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
          // ['imageGallery'], // You must add the "imageGalleryUrl".
          // ["fullScreen", "showBlocks", "codeView"],
          ["removeFormat"],

          // ['save', 'template'],
          // '/', Line break
        ], // Or Array of button list, eg. [['font', 'align'], ['image']]
        defaultTag: "div",
        minHeight: "300px",
        showPathLabel: false,
        font: sortedFontOptions,
      }}
    />
  );
};

export default SunEditorComponent;
