import React from "react";
import "./style.css";
import Image from "react-bootstrap/Image";

export const Avatar = (props) => {
  return (
    <div className="avatar-container" onClick={props.onClick || undefined}>
      <div
        className="avatar-image"
        style={{
          cursor: props.onClick ? "pointer" : "initial",
          ...props.size,
        }}
      >
        {props.photoURL ? (
          <Image
            roundedCircle
            src={props.photoURL}
            referrerPolicy="no-referrer"
          />
        ) : (
          <i className="bi bi-person-circle"></i>
        )}
      </div>
    </div>
  );
};
