import React from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import createImagePlugin from "draft-js-image-plugin";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js-image-plugin/lib/plugin.css";
import "./DraftEditor.css"; // Import custom styles for the DraftEditor

const imagePlugin = createImagePlugin();

const DraftEditor = ({ value, onChange }) => {
  const [editorState, setEditorState] = React.useState(() => {
    if (value) {
      const contentState = convertFromRaw(JSON.parse(value));
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });

  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  React.useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = JSON.stringify(convertToRaw(contentState));
    onChange(rawContentState);
  }, [editorState, onChange]);

  return (
    <div className="editor-container">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorStateChange}
        wrapperClassName="draft-editor-wrapper"
        editorClassName="draft-editor-content"
        toolbarClassName="draft-editor-toolbar"
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "emoji",
            "image", // Add the "image" option to the toolbar
          ],
          image: {
            uploadCallback: (file) => {
              // Implement your image upload logic here and return a Promise that resolves with the image URL
              return new Promise((resolve, reject) => {
                // Simulate image upload and return a URL
                setTimeout(() => {
                  const imageUrl = "https://example.com/image.jpg"; // Replace with the actual URL
                  resolve({ data: { link: imageUrl } });
                }, 2000);
              });
            },
            alt: { present: true, mandatory: false },
          },
        }}
        editorStyle={{ height: "300px", overflow: "auto" }} // Set the height and add overflow scroll
        plugins={[imagePlugin]} // Add the image plugin to the editor
      />
    </div>
  );
};

export default DraftEditor;
