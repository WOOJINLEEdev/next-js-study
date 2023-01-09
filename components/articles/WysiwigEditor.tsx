import dynamic from "next/dynamic";
import {
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useRecoilValue } from "recoil";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { Editor as EditorType, EditorProps } from "@toast-ui/react-editor";

import { themeState } from "hooks/useTheme";

import { ITuiEditorWithForwardedProps } from "components/articles/TuiEditorWrapper";

interface IProps extends EditorProps {
  onChange: (value: string) => void;
  onLoad?: () => void;
  valueType?: "markdown" | "html";
}

interface IEditorPropsWithHandlers extends EditorProps {
  onChange?: (value: string) => void;
}

const Editor = dynamic<ITuiEditorWithForwardedProps>(
  () => import("components/articles/TuiEditorWrapper"),
  { ssr: false },
);

const EditorWithForwardedRef = forwardRef<
  EditorType | undefined,
  IEditorPropsWithHandlers
>((props, ref) => (
  <Editor {...props} forwadedRef={ref as MutableRefObject<EditorType>} />
));

EditorWithForwardedRef.displayName = "EditorWithForwardedRef";

const WysiwigEditor = (props: IProps) => {
  const editorRef = useRef<EditorType>();
  const theme = useRecoilValue(themeState);

  const isServer = typeof window === "undefined";
  const getTheme = !isServer && localStorage.getItem("theme");

  useEffect(() => {
    console.log("theme", getTheme);
  }, [getTheme, theme]);

  useEffect(() => {
    if (editorRef.current) {
      props.onLoad?.();
    }
  }, [editorRef, props]);

  const handleChange = useCallback(() => {
    if (!editorRef.current) {
      return;
    }

    const instance = editorRef.current.getInstance();
    const valueType = props.valueType || "markdown";

    props.onChange(
      valueType === "markdown" ? instance.getMarkdown() : instance.getHTML(),
    );
  }, [props, editorRef]);

  return (
    <div
      className={`editor_panel_editor ${
        getTheme === "dark" && " toastui-editor-dark"
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
