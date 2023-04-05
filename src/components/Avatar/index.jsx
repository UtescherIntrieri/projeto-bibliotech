import React from "react";
import "./style.css";
import Image from "react-bootstrap/Image";

export const Avatar = (props) => {
  let displayName = "";
  if (props.showDisplayName) {
    displayName =
      props.displayName || props.email?.substring(0, props.email?.indexOf("@"));
  }

  return (
    <div className="avatar-container" onClick={props.onClick || undefined}>
      {displayName && (
        <span
          className={`avatar-display-name ${
            props.temaEscuro ? "text-light" : "text-dark"
          }`}
        >
          {displayName}
        </span>
      )}
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
