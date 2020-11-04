import React from "react";

interface Props {
  message: string;
}

const Message: React.FC<Props> = (props: any) => {
  return <div>{props.message}</div>;
};

export default Message;
