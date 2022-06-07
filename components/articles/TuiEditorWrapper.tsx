import { Editor, EditorProps } from "@toast-ui/react-editor";
import { MutableRefObject } from "react";

export interface ITuiEditorWithForwardedProps extends EditorProps {
  forwadedRef?: MutableRefObject<Editor>;
}

function TuiEditorWrapper(props: ITuiEditorWithForwardedProps) {
  return <Editor {...props} ref={props.forwadedRef} />;
}

export default TuiEditorWrapper;
