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
import { _setCode } from "../../_redux/ForgotPassword/forgotPasswordSlice"
import { useDispatch, useSelector } from "react-redux"
import { FormattedMessage } from "react-intl"


const VerificationForm = () => {
    const dispatch = useDispatch()
    const { email } = useSelector(state => state.forgotPassword)

    const validate = (values) => {
        const errors = {}

        if (!values.activationCode) {
            errors.activationCode = "MAIN.CANNOT_NULL"
        } else if (isNaN(values.activationCode)) {
            errors.activationCode = "AUTH.FORGOT.CODE.INVALID"
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
        initialValues: { activationCode: "" },
        onSubmit: (values) => {
            const err = validate(values)
            if (err.activationCode) return setErrors(err)
            dispatch(_setCode(email, values.activationCode))
        }
    })

    return (
    <Form
        className="auth-forgot-password-form mt-2"
        onSubmit={handleSubmit}
    >
        <FormGroup>
            <Label className="form-label" for="activationCode">
                <FormattedMessage id="AUTH.FORGOT.ACODE" />
            </Label>
            <Input
                type="number"
                name="activationCode"
                id="activationCode"
                placeholder="123456"
                value={values.activationCode}
                onBlur={handleBlur}
                onChange={handleChange}
                autoFocus
            />
            {errors?.activationCode && touched?.activationCode && (
                <p className="text-danger">
                    <FormattedMessage id={errors.activationCode} />
                </p>
            )}
        </FormGroup>
        <Button.Ripple color="primary" onClick={handleSubmit} block>
            <FormattedMessage id="AUTH.FORGOT.SENDLINK" />
          </Button.Ripple>
    </Form>
    )
}

export default VerificationForm
