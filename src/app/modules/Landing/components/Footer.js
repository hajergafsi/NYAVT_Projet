import React from "react";
import MakasLogo from "../../../../assets/images/logo/janus_white_logo.svg";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  PhoneCall,
} from "react-feather";

const Footer = () => {
  return (
    <div>
      <footer className="bg-primary text-light">
        <div className="footer-wrapper">
          <div>
            <img src={MakasLogo} alt="logo" />
          </div>
          <div className="f-left">
            <span className="font-weight-bolder">Site Haritası</span>

            <span>Kartımı Oluştur</span>
            <span>Özellikler</span>
            <span>Haberdar Ol</span>
            <span>Ekran Görüntüleri</span>
          </div>
          <div className="f-right">
            <span className="font-weight-bolder">Yasal</span>

            <span>KVKK</span>
            <span>Gizlilik Sözleşmesi</span>
            <span>Kullanım Koşulları</span>
          </div>
          <div className="f-right">
            <span className="font-weight-bolder">Görüşlerinizi Bekliyoruz</span>

            <span>info@usejanus.com</span>
          </div>
        </div>
      </footer>
      <footer className="bg-light text-primary">
        <div className="footer-wrapper">
          <span className="font-weight-bolder">
            © 2021 JANUS Visual Network Limited
          </span>
          <div className="social">
            <a
              href="https://www.linkedin.com/company/makasapp/"
              className="text-primary"
            >
              <Linkedin />
            </a>
            <a
              href="https://www.instagram.com/makas.app/"
              className="text-primary"
            >
              <Instagram />
            </a>
            <a
              href="https://www.facebook.com/Makas-106779748073931/"
              className="text-primary"
            >
              <Facebook />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
