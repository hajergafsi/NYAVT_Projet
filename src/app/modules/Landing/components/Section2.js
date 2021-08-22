import React from "react";
import img from "../../../../assets/images/pages/landing/bireysel_istatistikler_ss.svg";

const Section2 = () => {
  return (
    <section
      id="section-2"
      className="px-3"
      style={{
        // backgroundColor: "#F6F6F6",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1 className="text-primary">Ekran Görüntüleri</h1>

      <img
        src={img}
        alt="preview"
        // width="400"
        // heigh="auto"
        // className="img-fluid my-3"
      />
    </section>
  );
};

export default Section2;
