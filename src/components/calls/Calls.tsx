import React, { useState } from "react";
import DivWrapper from "./Calls.style";
import Keypad from "../keypad/Keypad";
import Talking from "../talking/Talking";
import Ringing from "../ringing/Ringing";
import { UserStatus, Response, User } from "../../Types";

/**
 * Dumy users data
 */
const usersFetched: User[] = [
  {
    id: "1",
    name: "Lena",
    phoneNumber: "345",
    status: UserStatus.IDLE,
    currenResponse: Response.DEFAULT,
  },
  {
    id: "2",
    name: "Tony",
    phoneNumber: "876",
    status: UserStatus.IDLE,
    currenResponse: Response.DEFAULT,
  },
  {
    id: "3",
    name: "Ricky",
    phoneNumber: "905",
    status: UserStatus.IDLE,
    currenResponse: Response.DEFAULT,
  },
  {
    id: "4",
    name: "Teresa",
    phoneNumber: "482",
    status: UserStatus.IDLE,
    currenResponse: Response.DEFAULT,
  },
];

const Calls: React.FC = () => {
  const [users, setUsers] = useState(() => usersFetched);

  /**
   * the main function to update users state
   * @param newUser
   */
  const updateUsers = (newUser: User) => {
    const newUsers = users.map((_user) => {
      if (_user.id === newUser.id) {
        const updatedUser = {
          ...newUser,
        };

        return updatedUser;
      }

      return _user;
    });

    setUsers(newUsers);
    console.log("users after updates ", newUsers);
  };

  /**
   * function to end the current call, then update the users state (caller + reciever)
   * @param callDuration
   * @param user
   */
  const endCall = (callDuration: number, user: User) => {
    console.log(callDuration);
    if (user.callsLog) {
      //update the caller
      const callerId = user.callsLog[user.callsLog.length - 1].from.id;
      const caller = users.find((user) => user.id === callerId);
      const reciverId = user.callsLog[user.callsLog.length - 1].to.id;
      const reciever = users.find((user) => user.id === reciverId);
      if (caller) {
        caller.currenResponse = Response.DEFAULT;
        caller.status = UserStatus.IDLE;
        if (caller.callsLog)
          caller.callsLog[
            caller.callsLog.length - 1
          ].durationBySeconds = callDuration;
        updateUsers(caller);
      }

      //update the receiver
      if (reciever) {
        reciever.currenResponse = Response.DEFAULT;
        reciever.status = UserStatus.IDLE;
        if (reciever.callsLog)
          reciever.callsLog[
            reciever.callsLog.length - 1
          ].durationBySeconds = callDuration;
        updateUsers(reciever);
      }
    }
  };

  /**
   * get the reciver respnonse during ringing, and update the users states
   * @param receiver
   * @param response
   */
  const getReceiverResponse = (receiver: User, response: Response) => {
    console.log(response);

    if (response === Response.ANSWERED) {
      //update the user reciever
      receiver.status = UserStatus.TALKING;
      //add the call log to the receiver
      if (receiver.callsLog) {
        receiver.callsLog[receiver.callsLog.length - 1].response =
          Response.ANSWERED;
        updateUsers(receiver);
        //update the caller log
        //get the caller
        const callerId =
          receiver.callsLog[receiver.callsLog.length - 1].from.id;
        const caller = users.find((user) => user.id === callerId);
        if (caller) {
          caller.status = UserStatus.TALKING;
          if (caller.callsLog) {
            caller.callsLog[caller.callsLog.length - 1].response =
              Response.ANSWERED;
          }

          updateUsers(caller);
        }
      }
    } else if (response === Response.REJECTED) {
      //update the user reciever
      receiver.status = UserStatus.IDLE;
      //add the call log to the receiver
      if (receiver.callsLog) {
        receiver.callsLog[receiver.callsLog.length - 1].response =
          Response.REJECTED;
        updateUsers(receiver);
        //update the caller log
        //get the caller
        const caller = receiver.callsLog[receiver.callsLog.length - 1].from;
        caller.status = UserStatus.IDLE;
        if (caller.callsLog) {
          caller.callsLog[receiver.callsLog.length - 1].response =
            Response.REJECTED;
        }

        updateUsers(caller);
      }
    }
  };

  /**
   * the calling function to create the call log and update users state
   * @param dialingNo
   * @param user
   */
  const calling = (dialingNo: string, user: User) => {
    //check if the user exist
    const userToCall = users.find((user) => user.phoneNumber === dialingNo);
    //remove the log to save user personal data only inside the log
    const userFrom = { ...user };
    delete userFrom.callsLog;

    //now go to call
    if (userToCall) {
      const userTo = { ...userToCall };
      delete userTo.callsLog;
      //found
      const callLog = {
        callId: String(Math.floor(Math.random() * 1000000000000) + 100000),
        from: userFrom,
        to: userTo,
        dateTime: new Date().toISOString(),
        durationBySeconds: 0,
        response: Response.RINGING,
      };
      //check if idle
      if (userToCall.status === UserStatus.IDLE) {
        //make a call
        //update the user caller
        user.currenResponse = Response.RINGING;
        user.status = UserStatus.PLACING_CALL;
        //add the call log to the caller
        if (!user.callsLog) user.callsLog = [callLog];
        else user.callsLog.push(callLog);
        updateUsers(user);
        //update the user reciever
        userToCall.status = UserStatus.RINGING;
        //add the call log to the receiver
        if (!userToCall.callsLog) userToCall.callsLog = [callLog];
        else userToCall.callsLog.push(callLog);
        updateUsers(userToCall);
      } else {
        //means line is busy
        user.currenResponse = Response.BUSY;
        // updateUsers(user);
        //modify the call log to be busy
        callLog.response = Response.BUSY;
        //add the call log to the caller
        if (!user.callsLog) user.callsLog = [callLog];
        else user.callsLog.push(callLog);
        updateUsers(user);
        //update the user reciever
        userToCall.status = UserStatus.RINGING;
        //add the call log to the receiver
        if (!userToCall.callsLog) userToCall.callsLog = [callLog];
        else userToCall.callsLog.push(callLog);
        updateUsers(userToCall);
      }
    } else {
      //not found
      user.currenResponse = Response.UNKNOWN;
      updateUsers(user);
    }
  };

  return (
    <DivWrapper>
      {users.map((user) => (
        <div className="box" key={user.id}>
          <div className="card">
            <p>Name: {user.name}</p>
            <p>Phone #: {user.phoneNumber}</p>
            <p>Staus: {user.status}</p>
            <p>{user.currenResponse}</p>
            {user.status === UserStatus.TALKING ? (
              <Talking endCall={endCall} user={user} />
            ) : user.status === UserStatus.RINGING ? (
              <Ringing user={user} getReceiverResponse={getReceiverResponse} />
            ) : (
              <Keypad calling={calling} user={user} />
            )}
          </div>
        </div>
      ))}
    </DivWrapper>
  );
};

export default Calls;
