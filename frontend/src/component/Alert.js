import React from "react";

const Alert = (props) => {
  return (
    <div className={`alert alert-${props.alertmsg.type}`} role="alert">
      {props.alertmsg.msg}
    </div>
  );
};

export default Alert;
