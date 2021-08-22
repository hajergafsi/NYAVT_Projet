import React from "react";
import { Link } from "react-router-dom";

import img from "../../../../assets/images/pages/landing/sıraya_gir.svg";
import Blob2 from "./Blob2";

const StartNow = () => {
  return (
    <div
      //   id="start-now"
      className="bg-primary just "
      style={{
        alignItems: "flex-end",
        height: 400,
      }}
    >
      <img
        src={img}
        alt="preview"
        style={{ position: "absolute", left: "25%" }}
      />
      <div
        style={{
          backgroundColor: "#F6F6F6",
          // flexDirection: "row",
          flex: 1,
          height: 180,
        }}
      >
        <span
          className=" text-primary font-weight-bold m-5 px-3 py-2"
          style={{ fontSize: "1.5rem", position: "absolute", right: "20%" }}
        >
          Janus App Çıktığında Haberdar
          <span
            className=" text-primary m-1 px-5 py-2"
            style={{ fontSize: "1.5rem", position: "absolute", right: "8%" }}
          >
            Olmak İçin
            <span className='font-weight-bolder'> Sıraya Gir!</span>
          </span>
        </span>
        {/* <Link
          to="/auth/login"
          className="btn btn-primary m-5 px-3 py-2 rounded-pill"
          style={{ fontSize: "1.5rem", position: "absolute", right: '30%' }}
        >
          Kullanmaya Başla
        </Link> */}
      </div>
    </div>
  );
};

export default StartNow;
