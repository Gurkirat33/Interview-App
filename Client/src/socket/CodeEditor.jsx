import { useCallback, useEffect, useState } from "react";
import socket from "./socketio";
// import Editor from "@monaco-editor/react";
import OutputCode from "./OutputCode";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/snippets/csharp";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/snippets/typescript";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/snippets/php";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const CodeEditor = ({ role }) => {
  const [editorSettings, setEditorSettings] = useState({
    fontSize: 14,
    lineHeight: 19,
    showPrintMargin: true,
    showGutter: false,
    highlightActiveLine: true,
    showLineNumbers: false,
    tabSize: 2,
    enableBasicAutocompletion: false,
    enableLiveAutocompletion: false,
    enableSnippets: false,
  });
  console.log(editorSettings);
  const numericChanges = ["fontSize", "lineHeight", "tabSize"];
  const checkBoxChanges = [
    "showPrintMargin",
    "showGutter",
    "highlightActiveLine",
    "showLineNumbers",
    "enableBasicAutocompletion",
    "enableLiveAutocompletion",
    "enableSnippets",
  ];
  const renderAdminControls = () => {
    return (
      <div>
        <h3>Admin Only Settings</h3>
        <div className="flex flex-wrap">
          {numericChanges.map((key) => (
            <div key={key}>
              <label>{key}</label>
              <input
                type="number"
                value={editorSettings[key]}
                className="border p-1"
                onChange={(e) =>
                  setEditorSettings({
                    ...editorSettings,
                    [key]: e.target.value,
                  })
                }
              />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap">
          {checkBoxChanges.map((key) => (
            <div key={key}>
              <label>{key}</label>
              <input
                type="checkbox"
                checked={editorSettings[key]}
                className="w-fit border p-1"
                onChange={(e) =>
                  setEditorSettings({
                    ...editorSettings,
                    [key]: e.target.checked,
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  };
  const [code, setCode] = useState("");
  const [languageSelected, setLanguageSelected] = useState("javascript");

  const languages = {
    javascript: "18.15.0",
    typescript: "5.0.3",
    python: "3.10.0",
    java: "15.0.2",
    csharp: "6.12.0",
    php: "8.2.3",
  };
  const languagesToMap = Object.entries(languages);

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
    <div className="">
      {/* Language Selector */}
      {role === "user" && (
        <div className="mb-2 flex gap-4">
          <select
            className="border border-black p-1 focus:outline-none"
            value={languageSelected}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            {languagesToMap.map(([language, version]) => (
              <option key={language} value={language}>
                {language} ({version})
              </option>
            ))}
          </select>
        </div>
      )}
      {role === "admin" && renderAdminControls()}
      <div className="border border-transparent md:w-[30rem] lg:w-[45rem] xl:w-[55rem]"></div>
      <div className="mx-auto w-full">
        <AceEditor
          placeholder="Enter code here"
          mode={languageSelected}
          theme="monokai"
          name="blah2"
          onChange={handleCodeChange}
          fontSize={editorSettings.fontSize}
          lineHeight={editorSettings.lineHeight}
          showPrintMargin={editorSettings.showPrintMargin}
          showGutter={editorSettings.showGutter}
          highlightActiveLine={editorSettings.highlightActiveLine}
          value={code}
          setOptions={{
            enableBasicAutocompletion: editorSettings.enableBasicAutocompletion,
            enableLiveAutocompletion: editorSettings.enableLiveAutocompletion,
            enableSnippets: editorSettings.enableSnippets,
            showLineNumbers: editorSettings.showLineNumbers,
            tabSize: editorSettings.tabSize,
          }}
          style={{ width: "100%" }}
        />
        {/* {role === "admin" && <div></div>} */}
        {<OutputCode language={languageSelected} code={code} />}
      </div>
    </div>
  );
};

export default CodeEditor;
