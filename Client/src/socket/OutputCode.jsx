import React, { useEffect, useState } from "react";
import { executeCode } from "../api";
import socket from "./socketio";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const OutputCode = ({ language, code }) => {
  const [output, setOutput] = useState(null);
  const [loading, setLoding] = useState(false);
  const [isError, setIsError] = useState(false);
  const { roomId } = useParams();
  const interviewID = roomId;

  const runCode = async () => {
    if (!code) return;
    try {
      setLoding(true);
      const res = await executeCode(language, code);
      const outputCode = res.run.output.split("\n");
      setOutput(outputCode);
      socket.emit("code:output", {
        interviewId: interviewID,
        output: outputCode,
      });
    } catch (error) {
      toast.error(error.response?.data?.message);
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
      <button
        className="my-2 w-full rounded-lg bg-green-500 px-4 py-2 font-medium text-white"
        onClick={runCode}
      >
        Run
      </button>
      <div className="min-h-60 w-full bg-slate-200 p-4">
        {loading
          ? "Loading..."
          : isError
            ? "Error executing code"
            : output
              ? output.map((item, index) => (
                  <p key={index} className="font-medium">
                    {item}
                  </p>
                ))
              : "Click 'Run Code' to see output"}
      </div>
    </div>
  );
};

export default OutputCode;
