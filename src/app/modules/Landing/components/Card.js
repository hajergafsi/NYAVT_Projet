import React from "react";

export const Card = ({img, text}) => {
  return (
    <div
    className="d-flex align-items-center justify-content-center"
    style={{
      width: "255px",
      height: "320px",
      borderRadius: "20px",
      backgroundColor: "#fff",
      flexDirection: "column",
    }}
  >
    <img src={img} alt="preview" className="img-fluid my-3" />
    <span
      style={{
        fontSize: "24px",
        fontWeight: "500",
        color: "#167FFC",
        textAlign: "center",
      }}
    >
      {text}
    </span>
  </div>
  );
};