import { useEffect, useState } from "react";
import { MessageProps } from "../../store/api";
import cl from "./MessageContainer.module.css";

type MessageType = {
  message: MessageProps;
  id?: number;
};

export const MessageContainer = ({ message, id }: MessageType) => {
  const isUser = id === message.user_id;

  const dateTime = new Date(message.createdAt);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = dateTime.toLocaleDateString(undefined, options);

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedTime = dateTime.toLocaleTimeString(undefined, timeOptions);

  return (
    <div
      className={cl.message_main}
      style={{
        justifyContent: isUser ? "end" : "start",
      }}
    >
      {isUser ? (
        <UserMessage {...message} time={formattedTime} date={formattedDate} />
      ) : (
        <CustomerMessage
          {...message}
          time={formattedTime}
          date={formattedDate}
        />
      )}
    </div>
  );
};

type EndMessageProps = {
  time: string;
  date: string;
} & MessageProps;

export const UserMessage = ({ text, time }: EndMessageProps) => {
  return (
    <div className={cl.message_container}>
      <div className={cl.usermessage}>
        <p className={cl.messagetext_user}>{text}</p>
      </div>
      <p className={cl.message_time_user}>{time}</p>
    </div>
  );
};

const CustomerMessage = ({ text, time }: EndMessageProps) => {
  return (
    <div className={cl.message_container}>
      <div className={cl.customermessage}>
        <p className={cl.messagetext_customer}>{text}</p>
      </div>
      <p className={cl.message_time_cus}>{time}</p>
    </div>
  );
};
