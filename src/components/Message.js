import React from "react";

function Message(props) {
  return (
    <div>
      <div className="alert alert-danger" role="alert">
        <h3 className = "text-center">{props.error}</h3>
      </div>
    </div>
  );
}

export default Message;
