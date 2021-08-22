import React from "react";
import dijital_kartvizit_icon from "../../../../assets/images/pages/landing/dijital_kartvizit_icon.svg";
import kartvizit_statistic_icon from "../../../../assets/images/pages/landing/kartvizit_statistic_icon.svg";
import network_havuzu_icon from "../../../../assets/images/pages/landing/network_havuzu_icon.svg";
import dogaya_katki_icon from "../../../../assets/images/pages/landing/dogaya_katki_icon.svg";

import {Card} from './Card'

const Section1 = () => {
  return (
    <section
      id="section-1"
      className="px-3"
      style={{
        // backgroundColor: "#F6F6F6",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1 className="text-primary">Özellikler</h1>
      <section
        id="section-1"
        className="px-3"
        style={{
          // backgroundColor: "#F6F6F6",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
       <Card img={dijital_kartvizit_icon} text={'Dijital Kartvizit'} />
       <Card img={kartvizit_statistic_icon} text={'Kartvizit İstatistikleri'}  />
       <Card img={network_havuzu_icon} text={'Network Havuzu'}  />
       <Card img={dogaya_katki_icon} text={'Doğaya Katkı Verisi'}  />
      </section>
    </section>
  );
};

export default Section1;
