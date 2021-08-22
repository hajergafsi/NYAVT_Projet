import { isUserLoggedIn } from "@utils"
import { useSkin } from "@hooks/useSkin"
import { ChevronLeft } from "react-feather"
import { Link, Redirect } from "react-router-dom"
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap"
import "@styles/base/pages/page-auth.scss"
import Makas_Logo from "../../../../../assets/images/logo/logo.png"
import { FormattedMessage } from "react-intl"
import VerificationForm from "./VerificationForm"
import EmailForm from "./EmailForm"
import { useSelector } from "react-redux"


const ForgotPassword = () => {
  const [skin, setSkin] = useSkin()
  const { email, activationCode } = useSelector(state => state.forgotPassword)

  const illustration =
    skin === "dark"
      ? "forgot-password-v2-dark.svg"
      : "forgot-password-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default


  const renderForm = () => {

    if (activationCode) {
      return (
        <p className="text-center mt-2">
          <FormattedMessage id="AUTH.FORGOT.SENT_MSG" />
        </p>
      )
    } else if (email && !activationCode) {
      return <VerificationForm />
    } else if (!email && !activationCode) {
      return <EmailForm />
    }
  }

  if (!isUserLoggedIn()) {
    return (
      <div className="auth-wrapper auth-v2">
        <Row className="auth-inner m-0">
          <Link
            className="brand-logo"
            to="/"
            onClick={(e) => e.preventDefault()}
          >
            <img src={Makas_Logo} alt={"Makas_Logo"} height={100} width={400} />
          </Link>
          <Col
            className="d-none d-lg-flex align-items-center p-5"
            lg="8"
            sm="12"
          >
            <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
              <img className="img-fluid" src={source} alt="Login V2" />
            </div>
          </Col>
          <Col
            className="d-flex align-items-center auth-bg px-2 p-lg-5"
            lg="4"
            sm="12"
          >
            <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
              <CardTitle tag="h2" className="font-weight-bold mb-1">
                <FormattedMessage id="AUTH.FORGOT.FORGOT_MSG" />
              </CardTitle>
              <CardText className="mb-2">
                <FormattedMessage id="AUTH.FORGOT.ENTERMAIL" />
              </CardText>

              {renderForm()}

              <p className="text-center mt-2">
                <Link to="/auth/login">
                  <ChevronLeft className="mr-25" size={14} />
                  <span className="align-middle">
                    <FormattedMessage id="AUTH.GENERAL.BACK_TO_LOGIN" />
                  </span>
                </Link>
              </p>
            </Col>
          </Col>
        </Row>
      </div>
    )
  } else {
    return <Redirect to="/auth" />
  }
}

export default ForgotPassword
