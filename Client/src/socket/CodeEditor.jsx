import { useCallback, useEffect, useRef, useState } from "react";
import socket from "./socketio";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import OutputCode from "./OutputCode";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const editorRef = useRef();
  const [languageSelected, setLanguageSelected] = useState("javascript");

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleCodeChange = (newValue) => {
    setCode(newValue);
    socket.emit("code:change", { code: newValue });
  };

  const handleCodeUpdate = useCallback(({ code }) => {
    setCode(code);
  }, []);

  useEffect(() => {
    socket.on("code:update", handleCodeUpdate);

    return () => {
      socket.off("code:update", handleCodeUpdate);
    };
  }, [handleCodeUpdate]);

  const handleLanguageChange = (language) => {
    setLanguageSelected(language);
  };

  return (
    <div>
      <LanguageSelector
        currentLanguage={languageSelected}
        onlanguageChange={handleLanguageChange}
      />
      <div className="flex flex-col gap-4 md:flex-row">
        <Editor
          height="300px"
          width="350px"
          className="border-2"
          language={languageSelected}
          defaultValue="// some comment"
          onChange={handleCodeChange}
          value={code}
          onMount={handleEditorDidMount}
        />
        {<OutputCode language={languageSelected} editorRef={editorRef} />}
      </div>
    </div>
  );
};

export default CodeEditor;
