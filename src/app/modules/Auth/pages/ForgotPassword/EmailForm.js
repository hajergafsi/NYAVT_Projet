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
import { useFormik } from "formik"
import { setEmail } from "../../_redux/ForgotPassword/forgotPasswordSlice"
import { useDispatch } from "react-redux"
import { FormattedMessage, useIntl } from "react-intl"


const EmailForm = () => {
    const dispatch = useDispatch()
    const intl = useIntl()

    const validate = (values) => {
        const errors = {}

        if (!values.email) {
            errors.email = "MAIN.CANNOT_NULL"
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = "AUTH.FORGOT.EMAIL.INVALID"
        }

        return errors
    }

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        values,
        errors,
        setErrors,
    } = useFormik({
        initialValues: { email: "" },
        onSubmit: (values) => {
            const err = validate(values)
            if (err.email) return setErrors(err)
            dispatch(setEmail(values.email, intl))
        }
    })

    return (
        <Form
            className="auth-forgot-password-form mt-2"
            onSubmit={handleSubmit}
        >
            <FormGroup>
                <Label className="form-label" for="login-email">
                    Email
            </Label>
                <Input
                    type="email"
                    name="email"
                    id="login-email"
                    placeholder="john@example.com"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autoFocus
                />
                {errors?.email && touched?.email && (
                    <p className="text-danger">
                        <FormattedMessage id={errors.email} />
                    </p>
                )}
            </FormGroup>
            <Button.Ripple color="primary" onClick={handleSubmit} block>
                <FormattedMessage id="AUTH.FORGOT.CODE.SEND" />
          </Button.Ripple>
        </Form>
    )
}

export default EmailForm
