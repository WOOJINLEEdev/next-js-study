import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { Editor as EditorType, EditorProps } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
import React, {
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useRecoilValue } from "recoil";

import { TuiEditorWithForwardedProps } from "components/articles/TuiEditorWrapper";
import { themeStatus } from "hooks/useTheme";

interface Props extends EditorProps {
  onChange: (value: string) => void;
  valueType?: "markdown" | "html";
}

interface EditorPropsWithHandlers extends EditorProps {
  onChange?: (value: string) => void;
}

const Editor = dynamic<TuiEditorWithForwardedProps>(
  () => import("components/articles/TuiEditorWrapper"),
  { ssr: false }
);

const EditorWithForwardedRef = forwardRef<
  EditorType | undefined,
  EditorPropsWithHandlers
>((props, ref) => (
  <Editor {...props} forwadedRef={ref as MutableRefObject<EditorType>} />
));

EditorWithForwardedRef.displayName = "EditorWithForwardedRef";

const WysiwigEditor: React.FC<Props> = (props) => {
  const editorRef = useRef<EditorType>();
  const themeState = useRecoilValue(themeStatus);
  const isServer = typeof window === "undefined";
  const theme = !isServer && localStorage.getItem("theme");

  useEffect(() => {
    console.log("theme", theme);
  }, [themeState]);

  const handleChange = useCallback(() => {
    if (!editorRef.current) {
      return;
    }

    const instance = editorRef.current.getInstance();
    const valueType = props.valueType || "markdown";

    props.onChange(
      valueType === "markdown" ? instance.getMarkdown() : instance.getHTML()
    );
  }, [props, editorRef]);

  return (
    <div
      className={`editor-panel-editor ${
        theme === "dark" && " toastui-editor-dark"
      }`}
    >
      <EditorWithForwardedRef
        {...props}
        initialEditType="wysiwyg"
        previewStyle="vertical"
        height="600px"
        placeholder="내용을 입력해주세요."
        useCommandShortcut={true}
        plugins={[colorSyntax]}
        onChange={handleChange}
        autofocus={false}
        ref={editorRef}
      />
    </div>
  );
};

export default WysiwigEditor;
