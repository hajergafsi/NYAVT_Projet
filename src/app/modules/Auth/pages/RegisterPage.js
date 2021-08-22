import '@styles/base/pages/page-auth.scss'
import { Link, useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, Button, ButtonGroup, Media } from 'reactstrap'
import { ToastContainer, toast } from "react-toastify"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react"
import { register } from "../redux/Register/registerSlice"
// import { workspaceNameValidation } from "../../../Workspaces/_redux/Register/registerSlice";

import Makas_Logo from "../../../../assets/images/logo/logo.png";
import Login_Png from "../../../../assets/images/pages/login/login.png";

import { FormattedMessage, useIntl } from "react-intl"

const RegisterPage = () => {

  const { formatMessage } = useIntl() // Language Support
  const history = useHistory()
  const dispatch = useDispatch()
  const [step, setStep] = useState(1)
  const [check, setCheck] = useState(false)
  const { validationError, successResponse } = useSelector(state => state.userRegister)
  const { workspaceNameValidity } = useSelector(state => state.workspaceRegister)

  // Form validate, exp: required or less character
  const validate = (values) => {

    const errors = {}     // Empty Errors Object

    // Form Regex
    const name_regex = /^[a-zA-Z0-9ığüöçş\s*]+([_]?[a-zA-Z0-9ığüöçş])*$/
    const username_regex = /^[a-zA-Z0-9]+([_]?[a-zA-Z0-9])*$/
    const email_regex = /([a-zA-Z0-9ığüöçş])+\@([a-zA-Z0-9])+\.[a-zA-Z]{2,}/
    const password_regex = /^[a-zA-Z0-9ığüöçş]+([_]?[a-zA-Z0-9ığüöçş])*$/

    // FirstName Validation
    if (!values.firstName) {
      errors.firstName = formatMessage({ id: "COMMON.VALIDATE.INPUT.REQUIRED" })
    } else if (values.firstName.length < 2) {
      errors.firstName = formatMessage({ id: "COMMON.VALIDATE.INPUT.MUST_BE_2_OR_MORE" })
    } else if (values.firstName.length > 30) {
      errors.firstName = formatMessage({ id: "COMMON.VALIDATE.INPUT.MUST_BE_30_OR_LESS" })
    } else if (!name_regex.test(values.firstName)) {
      errors.firstName = formatMessage({ id: "COMMON.VALIDATE.INPUT.AN_INVALID_CHARACTER" })
    }

    // LastName Validation
    if (!values.lastName) {
      errors.lastName = formatMessage({ id: "COMMON.VALIDATE.INPUT.REQUIRED" })
    } else if (values.lastName.length < 2) {
      errors.lastName = formatMessage({ id: "COMMON.VALIDATE.INPUT.MUST_BE_2_OR_MORE" })
    } else if (values.lastName.length > 30) {
      errors.lastName = formatMessage({ id: "COMMON.VALIDATE.INPUT.MUST_BE_30_OR_LESS" })
    } else if (!name_regex.test(values.lastName)) {
      errors.lastName = formatMessage({ id: "COMMON.VALIDATE.INPUT.AN_INVALID_CHARACTER" })
    }

    // Username Validation
    if (!values.userName) {
      errors.userName = formatMessage({ id: "COMMON.VALIDATE.INPUT.REQUIRED" })
    } else if (values.userName.length < 2) {
      errors.userName = formatMessage({ id: "COMMON.VALIDATE.INPUT.MUST_BE_2_OR_MORE" })
    } else if (values.userName.length > 50) {
      errors.userName = formatMessage({ id: "COMMON.VALIDATE.INPUT.MUST_BE_50_OR_LESS" })
    } else if (!username_regex.test(values.userName)) {
      errors.userName = formatMessage({ id: "COMMON.VALIDATE.INPUT.AN_INVALID_CHARACTER" })
    }

    // Workspace Validation
    if (!values.workspaceName) {
      errors.workspaceName = formatMessage({ id: "COMMON.VALIDATE.INPUT.REQUIRED" })
    } else if (values.workspaceName.length < 2) {
      errors.workspaceName = formatMessage({ id: "COMMON.VALIDATE.INPUT.MUST_BE_2_OR_MORE" })
    } else if (values.workspaceName.length > 50) {
      errors.workspaceName = formatMessage({ id: "COMMON.VALIDATE.INPUT.MUST_BE_50_OR_LESS" })
    } else if (!name_regex.test(values.workspaceName)) {
      errors.workspaceName = formatMessage({ id: "COMMON.VALIDATE.INPUT.WORKSPACE_IS_NOT_CORRECT" })
    }

    // Email Validation
    if (!values.email) {
      errors.email = formatMessage({ id: "COMMON.VALIDATE.INPUT.REQUIRED" })
    } else if (values.email.length < 10) {
      errors.email = formatMessage({ id: "COMMON.VALIDATE.INPUT.MUST_BE_10_OR_MORE" })
    } else if (values.email.length > 100) {
      errors.email = formatMessage({ id: "COMMON.VALIDATE.INPUT.MUST_BE_100_OR_LESS" })
    } else if (!email_regex.test(values.email)) {
      errors.email = formatMessage({ id: "COMMON.VALIDATE.INPUT.EMAIL_IS_NOT_CORRECT" })
    }

    // Password Validation
    if (!values.password) {
      errors.password = formatMessage({ id: "COMMON.VALIDATE.INPUT.REQUIRED" })
    } else if (values.password.length < 6) {
      errors.password = formatMessage({ id: "COMMON.VALIDATE.INPUT.MUST_BE_6_OR_MORE" })
    } else if (values.password.length > 12) {
      errors.password = formatMessage({ id: "COMMON.VALIDATE.INPUT.MUST_BE_12_OR_LESS" })
    } else if (!password_regex.test(values.password)) {
      errors.password = formatMessage({ id: "COMMON.VALIDATE.INPUT.AN_INVALID_CHARACTER" })
    }

        //Repeat Password Validation
        if (values.repeatPassword !== values.password) {
          errors.repeatPassword = formatMessage({ id: "COMMON.VALIDATE.INPUT.PASSWORDS.DONT_MATCH" })
        }

    return errors
  }

  //Formik Form
  const { handleSubmit, handleChange, touched, values, errors, setErrors, isValid, validateForm, setSubmitting, setValues } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      repeatPassword: "",
      workspaceName: "",
      preferredLanguage: 0,
    },
    onSubmit: (values) => {
      const errors = validate(values)
      if (errors.firstName || errors.lastName || errors.userName || errors.email || errors.password || errors.workspaceName || errors.repeatPassword) {
        return setErrors(errors)
      }

      values.preferredLanguage = parseInt(values.preferredLanguage) // selected value of the language, "1" -> 1
      dispatch(register(values))
    }
  })


  // Check Workspace name
  // useEffect(async () => {
  //   dispatch(workspaceNameValidation(values.workspaceName));
  // }, [values.workspaceName])
  useEffect(() => {
    if (workspaceNameValidity !== null && workspaceNameValidity.WorkspaceNameExists === true) {
      setCheck(true)
    } else {
      setCheck(false)
    }
  }, [workspaceNameValidity])

  // thrown exception
  useEffect(() => {
    if (validationError !== null) toast(validationError.Message, { type: toast.TYPE.ERROR })
  }, [validationError])
  // success response
  useEffect(() => {
    if (successResponse !== null) toast(successResponse.data.Message, { type: toast.TYPE.SUCCESS })
    if (successResponse !== null && successResponse.status === 200) {
      history.push("/auth/account-activation")
    }
  }, [successResponse])

  const nextStepHandler = (e) => {
    e.preventDefault()
    const errors = validate(values)

    if (errors.firstName || errors.lastName || errors.userName) {
      return setErrors(errors)
    }

    setStep(2) // Next step 2
  }

  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setValues({ picture: { file: reader.result, name: 'avatar' } })
    }
    reader.readAsDataURL(files[0])
  }

  const onReset = e => {
    setValues({ picture: { file: '', name: '' } })
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className="brand-logo" to="/">
          <img src={Makas_Logo} alt={"Makas_Logo"} height={100} width={400} />
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={Login_Png} alt="Login V2" />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              {formatMessage({ id: "AUTH.REGISTER.TITLE" })}
            </CardTitle>
            <CardText className='mb-2'>{formatMessage({ id: "AUTH.REGISTER.TEXT" })}</CardText>
            <Form className='auth-login-form mt-2' onSubmit={(e) => { e.preventDefault(); handleSubmit(e) }}>

              {step === 1 &&            // Form Step 1 - Start
                <div>
                  <FormGroup>
                    <Label className='form-label' for='register-firstname'>
                      {formatMessage({ id: "AUTH.REGISTER.INPUT.FIRSTNAME" })}
                    </Label>
                    <Input onChange={handleChange} value={values.firstName} name="firstName" type='text' id='register-firstname' placeholder={formatMessage({ id: "AUTH.REGISTER.PLACEHOLDER.FIRSTNAME" })} autoFocus />
                    {(errors?.firstName || touched?.firstName) && <p className='text-danger'>{errors.firstName}</p>}
                  </FormGroup>

                  <FormGroup>
                    <Label className='form-label' for='register-lastname'>
                      {formatMessage({ id: "AUTH.REGISTER.INPUT.LASTNAME" })}
                    </Label>
                    <Input onChange={handleChange} value={values.lastName} name="lastName" type='text' id='register-lastname' placeholder={formatMessage({ id: "AUTH.REGISTER.PLACEHOLDER.LASTNAME" })} />
                    {(errors?.lastName || touched?.lastName) && <p className='text-danger'>{errors.lastName}</p>}
                  </FormGroup>

                  <FormGroup>
                    <Label className='form-label' for='register-userName'>
                      {formatMessage({ id: "AUTH.REGISTER.INPUT.USERNAME" })}
                    </Label>
                    <Input onChange={handleChange} value={values.userName} name="userName" type='text' id='register-userName' placeholder={formatMessage({ id: "AUTH.REGISTER.PLACEHOLDER.USERNAME" })} />
                    {(errors?.userName || touched?.userName) && <p className='text-danger'>{errors.userName}</p>}
                  </FormGroup>
                  <ButtonGroup className="w-100 d-lg-flex px-10 mt-1 mb-1">
                    <Button outline={values.preferredLanguage === 0 && 'outline'} color="primary" onClick={() => setValues({ preferredLanguage: 1 })}>
                      <FormattedMessage id="TURKISH" />
                    </Button>
                    <Button outline={values.preferredLanguage === 1 && 'outline'} color="primary" onClick={() => setValues({ preferredLanguage: 0 })}>
                      <FormattedMessage id="ENGLISH" />
                    </Button>
                  </ButtonGroup>

                  <Button.Ripple onClick={(e) => nextStepHandler(e)} color='primary' block>
                    {formatMessage({ id: "AUTH.REGISTER.NEXT_BUTTON" })} ➔
                </Button.Ripple>
                </div>
              }

              {step === 2 &&           // Form Step 2 - Finish
                <div>
                  <FormGroup>
                    <Label className='form-label' for='register-workspace'>
                      {formatMessage({ id: "AUTH.REGISTER.INPUT.WORKSPACE" })}
                    </Label>
                    <Input onChange={handleChange} value={values.workspaceName} name="workspaceName" type='text' id='register-workspace' placeholder={formatMessage({ id: "AUTH.REGISTER.PLACEHOLDER.WORKSPACE" })} />
                    {(errors?.workspaceName && touched?.workspaceName) && <p className='text-danger'>{errors?.workspaceName}</p>}
                    {(check === false && values.workspaceName?.length > 0) && <p className='text-success'>{formatMessage({ id: "COMMON.VALIDATE.INPUT.WORKSPACE_NAME_IS_UNIQUE" })}</p>}
                    {(check === true) && <p className='text-danger'>{formatMessage({ id: "COMMON.VALIDATE.INPUT.DUPLICATE_WORKSPACE_NAME" })}</p>}
                  </FormGroup>

                  <FormGroup>
                    <Label className='form-label' for='register-email'>
                      {formatMessage({ id: "AUTH.REGISTER.INPUT.EMAIL" })}
                    </Label>
                    <Input onChange={handleChange} value={values.email} name="email" type='email' id='register-email' placeholder={formatMessage({ id: "AUTH.REGISTER.PLACEHOLDER.EMAIL" })} />
                    {(errors?.email && touched?.email) && <p className='text-danger'>{errors.email}</p>}
                  </FormGroup>

                  <FormGroup>
                    <div className='d-flex justify-content-between'>
                      <Label className='form-label' for='login-password'>
                        {formatMessage({ id: "AUTH.REGISTER.INPUT.PASSWORD" })}
                      </Label>
                    </div>
                    <InputPasswordToggle onChange={handleChange} value={values.password} name="password" className='input-group-merge' id='login-password' />
                    {(errors?.password && touched?.password) && <p className='text-danger'>{errors.password}</p>}
                  </FormGroup>

                  <FormGroup>
                    <div className='d-flex justify-content-between'>
                      <Label className='form-label' for='login-password'>
                        {formatMessage({ id: "AUTH.REGISTER.INPUT.REPEATPASSWORD" })}
                      </Label>
                    </div>
                    <InputPasswordToggle onChange={handleChange} value={values.repeatPassword} name="repeatPassword" className='input-group-merge' id='login-password' />
                    {(errors?.repeatPassword && touched?.repeatPassword) && <p className='text-danger'>{errors.repeatPassword}</p>}
                  </FormGroup>

                  <Button.Ripple type="submit" color='primary' block>
                    {formatMessage({ id: "AUTH.REGISTER.SUBMIT_BUTTON" })}
                  </Button.Ripple>
                </div>
              }

            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>{formatMessage({ id: "AUTH.REGISTER.FOOTER_TEXT" })}</span>
              <Link to='/auth/login'>
                <span>{formatMessage({ id: "AUTH.REGISTER.FOOTER_LINK" })}</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  )
}

export default RegisterPage
