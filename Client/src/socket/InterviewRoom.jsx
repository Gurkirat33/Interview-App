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
    const roleFromState = location.state;
    setRole(roleFromState);

    // Go fullscreen only if the role is "user"
    if (roleFromState === "user") {
      goFullscreen(); // Request full-screen on join
    }

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
    // window.addEventListener("blur", handleBlur);

    // Initial check
    checkFocus();

    return () => {
      window.removeEventListener("focus", handleFocus);
      // window.removeEventListener("blur", handleBlur);
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
    <div className="flex min-h-screen flex-col bg-gray-100">
      {!remoteSocketId && (
        <>
          <p className="mt-8 text-center text-2xl font-bold md:text-3xl">
            Waiting for other users
          </p>
        </>
      )}
      <div className="section-container max-w-[86rem] p-6 pt-4">
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
              <>
                <button
                  onClick={handleCallUser}
                  className="rounded bg-green-500 px-4 py-2 text-white shadow-lg transition duration-300 hover:bg-green-600"
                >
                  Call
                </button>
              </>
            )}
            {remoteStream && role === "admin" && (
              <p
                className={`${isFullscreen ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500"} flex items-center px-4`}
              >
                User is {isFullscreen ? "" : "not"} in full screen
              </p>
            )}
          </div>
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="mx-auto md:mx-0">
              <div className="flex gap-4 md:flex-col">
                {myStream && (
                  <div className="flex w-full flex-col items-center sm:h-60 sm:w-60">
                    <ReactPlayer
                      playing
                      muted
                      height="100%"
                      width="100%"
                      url={myStream}
                      className="rounded-lg shadow-lg"
                      style={{ width: "100%" }}
                    />
                  </div>
                )}
                {remoteStream && (
                  <div className="flex w-full flex-col items-center sm:h-60 sm:w-60">
                    <ReactPlayer
                      playing
                      muted
                      height="100%"
                      width="100%"
                      url={remoteStream}
                      style={{ width: "100%" }}
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                )}
                {role === "admin" && remoteStream && (
                  <BulletPointTextarea roomId={roomId} />
                )}
              </div>
            </div>
            <div className="mt-2">{myStream && <CodeEditor role={role} />}</div>
          </div>
        </div>

        {role === "user" && (
          <button
            className="border-lg w-fit rounded-lg bg-black p-2 text-white"
            onClick={goFullscreen}
          >
            Full screen
          </button>
        )}
      </div>
    </div>
  );
};

export default InterviewRoom;
