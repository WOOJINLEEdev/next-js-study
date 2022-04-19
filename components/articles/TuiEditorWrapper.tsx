import { Editor, EditorProps } from "@toast-ui/react-editor";
import { MutableRefObject } from "react";

export interface TuiEditorWithForwardedProps extends EditorProps {
  forwadedRef?: MutableRefObject<Editor>;
}

function TuiEditorWrapper(props: TuiEditorWithForwardedProps) {
  return <Editor {...props} ref={props.forwadedRef} />;
}

export default TuiEditorWrapper;
