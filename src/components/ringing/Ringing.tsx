import React from "react";
import DivWrapper from "./Ringing.style";
import { Response, User } from "../../Types";

type Props = {
  getReceiverResponse: (user: User, response: Response) => void;
  user: User;
};

const Ringing: React.FC<Props> = ({ getReceiverResponse, user }) => {
  /**
   * send the reciever response to the Calls component
   * @param response
   */
  const sendResponse = (response: Response) => {
    getReceiverResponse(user, response);
  };
  return (
    <DivWrapper>
      <p>
        Call from{" "}
        <strong>
          {user.callsLog
            ? user.callsLog[user.callsLog.length - 1].from.name
            : null}
        </strong>
      </p>
      <p>
        <i className="fas fa-user fa-3x"></i>
      </p>
      <button
        onClick={() => sendResponse(Response.REJECTED)}
        className="button-reject"
      >
        <i className="fa fa-phone"></i>
      </button>
      <button
        onClick={() => sendResponse(Response.ANSWERED)}
        className="button-answer"
      >
        <i className="fa fa-phone"></i>
      </button>
    </DivWrapper>
  );
};

export default Ringing;
