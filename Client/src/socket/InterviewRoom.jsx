import { useCallback, useEffect, useState } from "react";
import socket from "../socket/socketio";
import peer from "./service/peer";
import ReactPlayer from "react-player";
import CodeEditor from "./CodeEditor";
import { useLocation, useParams } from "react-router-dom";
import AdminQuestion from "../components/Admin/AdminQuestion";
import BulletPointTextarea from "../components/BulletPointTextarea";

const InterviewRoom = () => {
  const location = useLocation();
  const { roomId } = useParams();
  const [remoteSocketId, setRemoteSocketId] = useState();
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [role, setRole] = useState("user");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  // Function to request full-screen mode
  const goFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  // Function to check if the user is in full-screen mode
  const checkFullscreenStatus = () => {
    return !!(
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    );
  };

  const checkFocus = () => {
    return !!document.hasFocus();
  };

  // Notify the server of the current full-screen status
  const notifyFullscreenStatus = useCallback(() => {
    const currentFullscreenStatus = checkFullscreenStatus();
    const isFocused = checkFocus();
    setIsFullscreen(currentFullscreenStatus);
    socket.emit("fullscreen:status", {
      interviewID: roomId,
      isFullscreen: currentFullscreenStatus,
      isFocus: isFocused,
    });
  }, [location.state.interviewID]);

  // Handle a new user joining
  const handleUserJoined = useCallback(({ id }) => {
    setRemoteSocketId(id);
  }, []);

  // Handle calling another user
  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId]);

  // Handle an incoming call
  const handleIncommingCall = useCallback(async ({ from, offer }) => {
    setRemoteSocketId(from);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
    const ans = await peer.getAnswer(offer);
    socket.emit("call:accepted", { to: from, ans });
  }, []);

  // Send the media streams
  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  // Handle a call being accepted
  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      sendStreams();
    },
    [sendStreams],
  );

  // Handle the need for renegotiation
  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId]);

  // Handle an interview error
  const handleInterviewError = useCallback(() => {
    console.log("This can't happen");
  }, []);

  // Update the role on mount
  useEffect(() => {
    setRole(location.state.role);
    goFullscreen(); // Request full-screen on join
    notifyFullscreenStatus(); // Notify initial full-screen status

    // Listen for changes in full-screen mode
    document.addEventListener("fullscreenchange", notifyFullscreenStatus);
    document.addEventListener("mozfullscreenchange", notifyFullscreenStatus);
    document.addEventListener("webkitfullscreenchange", notifyFullscreenStatus);
    document.addEventListener("msfullscreenchange", notifyFullscreenStatus);

    return () => {
      // Clean up event listeners
      document.removeEventListener("fullscreenchange", notifyFullscreenStatus);
      document.removeEventListener(
        "mozfullscreenchange",
        notifyFullscreenStatus,
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        notifyFullscreenStatus,
      );
      document.removeEventListener(
        "msfullscreenchange",
        notifyFullscreenStatus,
      );
    };
  }, [notifyFullscreenStatus]);

  useEffect(() => {
    const handleFocus = () => {
      checkFocus();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [checkFocus]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  // Handle an incoming renegotiation
  const handleNegoNeedIncomming = useCallback(async ({ from, offer }) => {
    const ans = await peer.getAnswer(offer);
    socket.emit("peer:nego:done", { to: from, ans });
  }, []);

  // Handle the final negotiation step
  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  // Handle receiving a remote stream
  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  const handleFullScreenStatusChange = ({ isFullscreen }) => {
    console.log("Reaching in the frontend ans the result is:", isFullscreen);
    setIsFullscreen(isFullscreen);
  };

  useEffect(() => {
    socket.on("fullscreen:status", handleFullScreenStatusChange);

    return () => {
      socket.off("fullscreen:status", handleFullScreenStatusChange);
    };
  }, [socket, handleFullScreenStatusChange]);

  // Set up socket event listeners
  useEffect(() => {
    const handleFullscreenStatus = ({ isFullscreen, isFocus }) => {
      setIsFullscreen(isFullscreen);
      setIsFocus(isFocus);
    };

    socket.on("fullscreen:status", handleFullscreenStatus);
    socket.on("user:joined", handleUserJoined);
    socket.on("interview:error", handleInterviewError);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("fullscreen:status", handleFullscreenStatus);
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
      socket.off("interview:error", handleInterviewError);
    };
  }, [
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
    handleInterviewError,
  ]);

  return (
    <div className="section-container flex min-h-screen flex-col bg-gray-100 p-6">
      <div>
        <div className="mb-4 flex space-x-4">
          {myStream && (
            <button
              onClick={sendStreams}
              className="rounded bg-blue-500 px-4 py-2 text-white shadow-lg transition duration-300 hover:bg-blue-600"
            >
              Send Stream
            </button>
          )}
          {remoteSocketId && (
            <button
              onClick={handleCallUser}
              className="rounded bg-green-500 px-4 py-2 text-white shadow-lg transition duration-300 hover:bg-green-600"
            >
              Call
            </button>
          )}
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="border-4 border-red-400">
            {role && (
              <div className="text-xl font-bold text-gray-700">
                Your Role:{" "}
                <span
                  className={`font-semibold ${
                    role === "admin" ? "text-red-500" : "text-blue-500"
                  }`}
                >
                  {role}
                </span>
              </div>
            )}
            <div className="flex gap-4 lg:flex-col">
              {myStream && (
                <div className="flex h-40 w-40 flex-col items-center border-2 border-black sm:h-60 sm:w-60">
                  <h2 className="mb-2 text-xl font-semibold">My Stream</h2>
                  <ReactPlayer
                    playing
                    muted
                    height="100%"
                    width="100%"
                    url={myStream}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              )}
              {remoteStream && (
                <div className="flex h-40 w-40 flex-col items-center border-2 border-black sm:h-60 sm:w-60">
                  <h2 className="mb-2 text-xl font-semibold">Remote Stream</h2>
                  <ReactPlayer
                    playing
                    muted
                    height="100%"
                    width="100%"
                    url={remoteStream}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>
          </div>
          <div>{myStream && <CodeEditor />}</div>
        </div>
      </div>

      {role === "user" && (
        <button
          className="border-lg w-fit bg-black p-3 text-white"
          onClick={goFullscreen}
        >
          Full screen{" "}
        </button>
      )}

      {/* Admin Question Component */}
      {role === "admin" && (
        <>
          <AdminQuestion />
          <p
            className={`${isFullscreen ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500"}`}
          >
            User is {isFullscreen ? "" : "not"} in full screen
          </p>
          <p
            className={`${isFocus ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500"}`}
          >
            User is {isFocus ? "" : "not"} in focus
          </p>
        </>
      )}
      {role === "admin" && <BulletPointTextarea />}
    </div>
  );
};

export default InterviewRoom;
