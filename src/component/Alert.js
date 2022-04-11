import React from "react";

const Alert = (props) => {
  return (
    <div class="alert alert-success" role="alert">
      {props.alertmsg}
    </div>
  );
};

export default Alert;
