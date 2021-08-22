import { Link, Redirect, useHistory } from "react-router-dom";
import InputPasswordToggle from "@components/input-password-toggle";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ButtonGroup,
} from "reactstrap";
import { useDispatch } from "react-redux";
import "@styles/base/pages/page-auth.scss";

import { useFormik } from "formik";
import * as Yup from "yup";

import Makas_Logo from "../../../../assets/images/logo/janus_white_logo.svg";
import Login_Png from "../../../../assets/images/pages/login/login.svg";

import { userLogin } from "../redux/Login/loginSlice";
import { FormattedMessage, useIntl } from "react-intl";
import { isUserLoggedIn } from "@utils";
import { ToastContainer } from "react-toastify";
import { updateCulture } from "../../../../utility/Utils";
import { setLanguage, useLang } from "../../../../@core/i18n";

import Cleave from "cleave.js/react";

const initialValues = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const lang = useLang();
  const intl = useIntl();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(intl.formatMessage({ id: "AUTH.LOGIN.MAIL.INVALID" }))
      .min(5, intl.formatMessage({ id: "AUTH.LOGIN.MAIL.INVALID" }, { min: 5 }))
      .max(
        100,
        intl.formatMessage({ id: "AUTH.LOGIN.MAIL.INVALID" }, { max: 100 })
      )
      .required(intl.formatMessage({ id: "AUTH.LOGIN.MAIL.NULL" })),
    password: Yup.string()
      .min(5, intl.formatMessage({ id: "AUTH.LOGIN.PASSWORD.MIN" }, { min: 5 }))
      .max(
        100,
        intl.formatMessage({ id: "AUTH.LOGIN.PASSWORD.MAX" }, { max: 100 })
      )
      .required(intl.formatMessage({ id: "AUTH.LOGIN.PASSWORD.NULL" })),
  });

  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    useFormik({
      initialValues,
      validationSchema: LoginSchema,
      onSubmit: async (values) => {
        const { email, password } = values;
        const res = await dispatch(userLogin(email, password, lang));
        if (res === 200) history.push("/home");
      },
    });

  if (!isUserLoggedIn()) {
    return (
      <div className="auth-wrapper auth-v2 justify-content-center  ">
        <Link
          to="/"
          style={{
            position: "absolute",
            top: "2rem",
            zIndex: 1,
          }}
        >
          <img src={Makas_Logo} alt={"Makas_Logo"} height={100} />
        </Link>
        <div style={{ width: "60%", marginTop: "10%" }}>
          <Card className="card-payment" style={{borderRadius: 30}} >
            <div className="d-flex" style={{ flexDirection: "row", alignItems:'center'}}>
              <div className="d-flex" style={{ minWidth: "40%", flexDirection:'column', alignItems:'center' }}>
                <CardHeader>
                  <CardTitle className="text-primary font-weight-bolder" tag="h4" >
                    Giriş Yap
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Form
                    className="auth-login-form mt-2"
                    onSubmit={handleSubmit}
                  >
                    <FormGroup>
                      <Label className="form-label" for="login-email">
                        Email
                      </Label>
                      <Input
                        type="email"
                        id="login-email"
                        name="email"
                        placeholder="john@example.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoFocus
                      />
                      {errors?.email && touched?.email && (
                        <p className="text-danger">
                          <FormattedMessage id={errors.email} />
                        </p>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <div className="d-flex justify-content-between">
                        <Label className="form-label" for="login-password">
                          <FormattedMessage id="MAIN.PASSWORD" />
                        </Label>
                        <Link to="/auth/account-recovery">
                          <small>
                            <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
                            ?
                          </small>
                        </Link>
                      </div>
                      <InputPasswordToggle
                        className="input-group-merge"
                        id="login-password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={(event) =>
                          event.key === "Enter" && handleSubmit()
                        }
                      />
                      {errors?.password && touched?.password && (
                        <p className="text-danger">
                          <FormattedMessage id={errors.password} />
                        </p>
                      )}
                    </FormGroup>
                    <Button.Ripple
                      color="primary"
                      tag={Link}
                      onClick={handleSubmit}
                      to="/"
                      block
                    >
                      <FormattedMessage id="AUTH.LOGIN.BUTTON" />
                    </Button.Ripple>
                  </Form>
                  <p className="text-center mt-2">
                    <span className="mr-25">
                      <FormattedMessage id="AUTH.LOGIN.NEW_MSG" />?
                    </span>
                    <Link to="/auth/register">
                      <span>
                        <FormattedMessage id="AUTH.LOGIN.CREATEACC_MSG" />
                      </span>
                    </Link>
                  </p>
                  {/* <Form className="form" onSubmit={(e) => e.preventDefault()}>
              <Row>
                <Col sm="12">
                  <FormGroup className="mb-2">
                    <Label for="payment-card-number">Card Number</Label>
                    <Cleave
                      className="form-control"
                      placeholder="2133 3244 4567 8921"
                      options={{ creditCard: true }}
                      id="payment-card-number"
                    />
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <FormGroup className="mb-2">
                    <Label for="payment-expiry">Expiry</Label>
                    <Cleave
                      className="form-control"
                      placeholder="MM / YY"
                      options={{
                        date: true,
                        delimiter: "/",
                        datePattern: ["Y", "m"],
                      }}
                      id="payment-expiry"
                    />
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <FormGroup className="mb-2">
                    <Label for="payment-cvv">CVV / CVC</Label>
                    <Input type="number" placeholder="123" id="payment-cvv" />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup className="mb-2">
                    <Label for="payment-input-name">Input Name</Label>
                    <Input placeholder="Curtis Stone" id="payment-input-name" />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <Button.Ripple color="primary" block>
                    Make Payment
                  </Button.Ripple>
                </Col>
              </Row>
            </Form> */}
                </CardBody>
              </div>
              <div className="d-lg-flex align-items-end">
                {/* <div className="w-100 d-lg-flex align-items-end px-5" > */}
                <img className="img-fluid" src={Login_Png} alt="Login V2" />
              </div>
            </div>
          </Card>
        </div>

        {/* <Row className="auth-inner m-0">
          {/* <Link className="brand-logo" to="/">
            <img src={Makas_Logo} alt={"Makas_Logo"} height={100} />
          </Link>
          <Col
            className="d-none d-lg-flex align-items-center p-5"
            lg="8"
            sm="12"
          >
            <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
              <img className="img-fluid" src={Login_Png} alt="Login V2" />
            </div>
          </Col> */}

        {/* <Col
            className="d-flex align-items-center auth-bg px-2 p-lg-5"
            lg="4"
            sm="12"
          >
            <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
              <CardTitle tag="h2" className="font-weight-bold mb-1">
                <FormattedMessage id="AUTH.LOGIN.WELCOME" />
              </CardTitle>
              <CardText className="mb-2">
                <FormattedMessage id="AUTH.LOGIN.SIGNIN_MSG" />
              </CardText>
              <Form className="auth-login-form mt-2" onSubmit={handleSubmit}>
                <FormGroup>
                  <Label className="form-label" for="login-email">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="login-email"
                    name="email"
                    placeholder="john@example.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                  />
                  {errors?.email && touched?.email && (
                    <p className="text-danger">
                      <FormattedMessage id={errors.email} />
                    </p>
                  )}
                </FormGroup>
                <FormGroup>
                  <div className="d-flex justify-content-between">
                    <Label className="form-label" for="login-password">
                      <FormattedMessage id="MAIN.PASSWORD" />
                    </Label>
                    <Link to="/auth/account-recovery">
                      <small>
                        <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />?
                      </small>
                    </Link>
                  </div>
                  <InputPasswordToggle
                    className="input-group-merge"
                    id="login-password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={(event) =>
                      event.key === "Enter" && handleSubmit()
                    }
                  />
                  {errors?.password && touched?.password && (
                    <p className="text-danger">
                      <FormattedMessage id={errors.password} />
                    </p>
                  )}
                </FormGroup>
                <Button.Ripple
                  color="primary"
                  tag={Link}
                  onClick={handleSubmit}
                  to="/"
                  block
                >
                  <FormattedMessage id="AUTH.LOGIN.BUTTON" />
                </Button.Ripple>
              </Form>
              <p className="text-center mt-2">
                <span className="mr-25">
                  <FormattedMessage id="AUTH.LOGIN.NEW_MSG" />?
                </span>
                <Link to="/auth/register">
                  <span>
                    <FormattedMessage id="AUTH.LOGIN.CREATEACC_MSG" />
                  </span>
                </Link>
              </p>
            </Col>
          </Col> 
        </Row> */}
        <ToastContainer />
      </div>
    );
  } else {
    return <Redirect to="/home" />;
  }
}
