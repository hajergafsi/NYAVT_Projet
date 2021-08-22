import { Link, Redirect, useHistory } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import InputPassword from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import { isUserLoggedIn } from '../../../../../utility/Utils'
import { toastError, toastSuccess } from '../../../../../utility/Toast'
import { useState } from 'react'
import { changePassword } from '../../_redux/authCrud'
import Makas_Logo from '../../../../../assets/images/logo/logo.png'
import { FormattedMessage, useIntl } from 'react-intl'

const ResetPassword = () => {

  const history = useHistory()
  const intl = useIntl()
  const [password, setPassword] = useState({
    oldPassword: '',
    password1: '',
    password2: ''
  })

  const onSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, password1, password2 } = password

    if (!password1 || !password2 || !oldPassword) return toastError(intl.formatMessage({ id: "AUTH.CHANGEPASS.PASSWORD.NULL" }))
    if (password1 !== password2) return toastError(intl.formatMessage({ id: "AUTH.CHANGEPASS.PASSWORD.NOTMATCH" }))

    const UserDto = JSON.parse(localStorage.getItem('userData'))
    const UserTokenDto = JSON.parse(localStorage.getItem('tokenData'))

    changePassword(UserDto.Id, oldPassword, password2, UserTokenDto.AccessToken)
      .then(({ data }) => {
        toastSuccess(data.Message, 3000)
        history.push("/")
      })
      .catch((e) => {
        const response = e.response.data;
        if (response.Data === null) {
          for (let i = 0; i < response.ValidationErrors.length; i++) {
            toastError(response.ValidationErrors[i].Message);
          }
        } else {
          toastError(e.response.data.Error.Message);
        }
      })

  }

  if (isUserLoggedIn()) {
    return (
      <div className='auth-wrapper auth-v1 px-2'>
        <div className='auth-inner py-2'>
          <Card className='mb-0'>
            <CardBody>
              <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                <img src={Makas_Logo} alt={'Makas_Logo'} height={75} width={300} />
              </Link>
              <CardTitle tag='h4' className='mb-1'>
                <FormattedMessage id="AUTH.CHANGEPASS.RESETPASS" />
              </CardTitle>
              <CardText className='mb-2'>
                <FormattedMessage id="AUTH.CHANGEPASS.PASSWORD.DIFF_MSG" />
              </CardText>
              <Form className='auth-reset-password-form mt-2' onSubmit={onSubmit}>
                <FormGroup>
                  <Label className='form-label' for='new-password'>
                    <FormattedMessage id="MAIN.PASSWORD" />
                  </Label>
                  <InputPassword className='input-group-merge' id='old-password' autoFocus onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })} required />
                </FormGroup>
                <FormGroup>
                  <Label className='form-label' for='new-password'>
                    <FormattedMessage id="AUTH.CHANGEPASS.PASSWORD.NEW" />
                  </Label>
                  <InputPassword className='input-group-merge' id='new-password' onChange={(e) => setPassword({ ...password, password1: e.target.value })} required />
                </FormGroup>
                <FormGroup>
                  <Label className='form-label' for='confirm-password'>
                    <FormattedMessage id="AUTH.CHANGEPASS.PASSWORD.CONFIRM" />
                  </Label>
                  <InputPassword className='input-group-merge' id='confirm-password' onChange={(e) => setPassword({ ...password, password2: e.target.value })} required />
                </FormGroup>
                <Button.Ripple color='primary' onClick={onSubmit} block>
                  <FormattedMessage id="AUTH.CHANGEPASS.PASSWORD.SETNEW" />
                </Button.Ripple>
              </Form>
              <p className='text-center mt-2'>
                <Link to='/auth/login'>
                  <ChevronLeft className='mr-25' size={14} />
                  <span className='align-middle'><FormattedMessage id="AUTH.GENERAL.BACK_TO_LOGIN" /></span>
                </Link>
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    )
  } else {
    return <Redirect to='/auth/login' />
  }

}

export default ResetPassword
