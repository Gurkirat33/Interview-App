import React, { useEffect, useState } from "react";
import { executeCode } from "../api";
import socket from "./socketio";
import { useParams } from "react-router-dom";

const OutputCode = ({ language, editorRef }) => {
  const [output, setOutput] = useState(null);
  const [loading, setLoding] = useState(false);
  const [isError, setIsError] = useState(false);
  const { roomId } = useParams();
  const interviewID = roomId;

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setLoding(true);
      const res = await executeCode(language, sourceCode);
      console.log("trying");
      const outputCode = res.run.output.split("\n");
      setOutput(outputCode);
      socket.emit("code:output", {
        interviewId: interviewID,
        output: outputCode,
      });
    } catch (error) {
      console.log("error");
      setIsError(true);
    } finally {
      setLoding(false);
    }
  };

  const handleCodeOutputSync = ({ output }) => {
    setOutput(output);
  };

  useEffect(() => {
    socket.on("code:output:change", handleCodeOutputSync);
    return () => {
      socket.off("code:output:change", handleCodeOutputSync);
    };
  }, []);

  return (
    <div>
      <p>Language selected is {language}</p>
      <button
        className="rounded-lg bg-green-500 px-4 py-2 font-medium text-white"
        onClick={runCode}
      >
        Run
      </button>
      <div className="h-[400px] w-full border-2 border-black">
        {loading
          ? "Loading..."
          : isError
            ? "Error executing code"
            : output
              ? output.map((item, index) => <p key={index}>{item}</p>)
              : "Click 'Run Code' to see output"}
      </div>
    </div>
  );
};

export default OutputCode;
