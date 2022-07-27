import { MutableRefObject } from "react";
import { Editor, EditorProps } from "@toast-ui/react-editor";

export interface ITuiEditorWithForwardedProps extends EditorProps {
  forwadedRef?: MutableRefObject<Editor>;
}

function TuiEditorWrapper(props: ITuiEditorWithForwardedProps) {
  return <Editor {...props} ref={props.forwadedRef} />;
}

export default TuiEditorWrapper;
