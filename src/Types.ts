export enum UserStatus {
    IDLE = "idle",
    RINGING = "ringing",
    TALKING = "talking",
    PLACING_CALL = "placing call",
  }
  
  export enum Response {
    DEFAULT = "",
    RINGING = "ringing",
    UNKNOWN = "unknown",
    BUSY = "busy",
    REJECTED = "rejected",
    ANSWERED = "answered",
  }
  
  export type User = {
    id: string;
    name: string;
    phoneNumber: string;
    status: UserStatus;
    currenResponse: Response;
    callsLog?: [
      {
        callId: string;
        from: User ;
        to: User ;
        dateTime: string;
        durationBySeconds: number;
        response: Response;
      }
    ];
  };