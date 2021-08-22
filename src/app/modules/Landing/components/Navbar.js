import MakasLogo from "../../../../assets/images/logo/janus_blue_logo.svg";
import { Link } from 'react-router-dom'

import React from 'react'

const Navbar = () => {
    return (
        <div className=" navbar-landing w-100  d-flex justify-content-between">
        {/* <div className="navbar w-100 bg-primary d-flex justify-content-between"> */}
            <Link to="/">
                <img className="JANUS"  src={MakasLogo} alt="logo" width="150" height="auto" />
            </Link>
            <div >
            <Link to="/auth/login" className="btn text-primary">
                Kartımı Oluştur
            </Link>
            <Link to="/auth/login" className="btn ">
                Özellikler
            </Link>
            <Link to="/auth/login" className="btn ">
                Ekran Görüntüleri
            </Link>
            <Link to="/auth/login" className="btn ">
                Haberdar Ol
            </Link>
            </div>
            <div>
            <Link to="/auth/login" className="btn text-primary">
                Giriş Yap
            </Link>
            <Link to="/auth/login" className="btn-primary btn-giris">
                Kaydol
            </Link>
            </div>
        </div>
    )
}

export default Navbar
