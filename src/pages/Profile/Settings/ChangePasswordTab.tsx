import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Form, FormFeedback, Input, Label, Row, TabPane } from 'reactstrap'
import withRouter from '../../../Components/Common/withRouter'
import { withTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as yup from "yup"
const ChangePasswordTab = ({ t }: any) => {

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: yup.object({
            oldPassword: yup.string().required('Old Password is required'),
            newPassword: yup.string().required('New Password is required'),
            confirmPassword: yup.string()
                .oneOf([yup.ref('newPassword')], 'Passwords must match')
                .required('Confirm Password is required')
        }),
        onSubmit: (value) => {

        }
    })

    return (

        <Form onSubmit={formik.handleSubmit}>
            <Row className="g-2">
                <Col lg={4}>
                    <div>
                        <Label htmlFor="oldpasswordInput" className="form-label">{t("OldPassword")}  *</Label>
                        <Input type="password" className="form-control"
                            id="oldPassword"
                            name="oldPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            invalid={
                                formik.touched.oldPassword && formik.errors.oldPassword ? true : false
                            }
                            placeholder="Enter current password" value={formik.values.oldPassword} />
                        {formik.touched.oldPassword && formik.errors.oldPassword ? (
                            <FormFeedback type="invalid"><div>{formik.errors.oldPassword}</div></FormFeedback>
                        ) : null}
                    </div>
                </Col>

                <Col lg={4}>
                    <div>
                        <Label htmlFor="newpasswordInput" className="form-label">
                            {t("NewPassword")}
                            *</Label>
                        <Input type="password" className="form-control" name='newPassword'
                            placeholder="Yeni Parola"
                            invalid={
                                formik.touched.newPassword && formik.errors.newPassword ? true : false
                            }
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.touched.newPassword && formik.errors.newPassword ? (
                            <FormFeedback type="invalid"><div>{formik.errors.newPassword}</div></FormFeedback>
                        ) : null}

                    </div>
                </Col>

                <Col lg={4}>
                    <div>
                        <Label htmlFor="confirmpasswordInput" className="form-label">Confirm
                            Password*</Label>
                        <Input type="password" className="form-control"
                            id="confirmpassword"
                            name='confirmPassword'
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                            onBlur={formik.handleBlur}
                            invalid={
                                formik.touched.confirmPassword && formik.errors.confirmPassword ? true : false
                            }
                            placeholder="Confirm password"

                        />
                        {formik.touched.oldPassword && formik.errors.oldPassword ? (
                            <FormFeedback type="invalid"><div>{formik.errors.oldPassword}</div></FormFeedback>
                        ) : null}

                    </div>
                </Col>

                <Col lg={12}>
                    <div className="mb-3">
                        <Link to="#"
                            className="link-primary text-decoration-underline">Forgot
                            Password ?</Link>
                    </div>
                </Col>

                <Col lg={12}>
                    <div className="text-end">
                        <button type="button" className="btn btn-primary">Change
                            Password</button>
                    </div>
                </Col>

            </Row>

        </Form>

    )
}

export default withRouter(withTranslation()(ChangePasswordTab))