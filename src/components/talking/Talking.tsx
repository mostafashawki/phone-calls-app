import React, { useState, useEffect } from "react";
import DivWrapper from "./Talking.style";
import { User } from "../../Types";

type Props = {
  endCall: (callDuration: number, user: User) => void;
  user: User;
};

const Talking: React.FC<Props> = ({ endCall, user }) => {
  const [callDuration, setCallDuration] = useState(() => 0);

  /**
   * setInterval to show the call counter duration
   */
  useEffect(() => {
    const interval = setInterval(
      () => setCallDuration((prev) => prev + 1),
      1000
    );

    return () => {
      console.log("cleaned up");
      clearInterval(interval);
    };
  }, []);

  /**
   * call the endCall function in Calls component to end the call and update states
   */
  const handleEndCall = () => {
    endCall(callDuration, user);
  };

  return (
    <DivWrapper>
      <p>
        {Math.floor(callDuration / 60)}:
        {callDuration - Math.floor(callDuration / 60) * 60}
      </p>
      <p>
        Calling{" "}
        <strong>
          {user.callsLog
            ? //means receiver
              user.id !== user.callsLog[user.callsLog.length - 1].from.id
              ? user.callsLog[user.callsLog.length - 1].from.name
              : user.callsLog[user.callsLog.length - 1].to.name
            : null}
        </strong>
      </p>
      <p>
        <i className="fas fa-user fa-3x"></i>
      </p>
      <button onClick={handleEndCall} className="button-reject">
        <i className="fa fa-phone"></i>
      </button>
    </DivWrapper>
  );
};

export default Talking;
