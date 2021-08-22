import React from 'react'
import Blob from './Blob'
import Blob3 from './Blob3'
import {
    Form,
    Label,
    Input
  } from "reactstrap";
import { FormattedMessage, useIntl } from "react-intl";
import img from '../../../../assets/images/pages/landing/Dijital_Network_Asistanı.svg'
//import blue_circle from '../../../../assets/images/pages/landing/blue_circle.svg'
import { Link } from 'react-router-dom'

const HeroSection = () => {
    return (
        <div className="hero-section">
            <img src={img} alt="preview" className="img-fluid my-3 col-md-6 col-sm-12 col-xs-12" />
              <div className="landing-form-background">
                <div className="landing-form">
                    <Form>
                        <h2 className="title">Hizli Kaydol</h2>
                        <p className="description">Janus ile networking deneyiminizi tumuyle yeniden tasarlayin. Dijital Kartvizitinizi olusturarak baslayin</p>
                        <Input
                            type="text"
                            id="firstName"
                            className="input"
                            name="fname"
                            placeholder="Ad"
                        />
                                                <Input
                            type="text"
                            id="lastName"
                            name="lname"
                            className="input"
                            placeholder="Soyad"
                        />
                        <Input
                            type="email"
                            id="login-email"
                            className="input"
                            name="email"
                            placeholder="E-mail"
                        />
                        <Link to="/auth/login" className="btn btn-landing-form btn-primary my-2">Kartimi Olustur</Link>   
                    </Form>  
                </div>
              </div>
            {/* <img src={blue_circle} alt="preview" className="img-fluid my-3" /> */}
         
        </div>
    )
}

export default HeroSection
