import React, { useState } from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { Link, Navigate } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
import * as Yup from "yup";
import { useFormik } from "formik";
import useUserStore from '../../zustand/useUserStore';
import { loginApi } from '../../api/Auth';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaLock, FaLockOpen } from 'react-icons/fa';
//import images

const Login = (props: any) => {
    console.log("wind ==>", window.location.pathname)
    const [userLogin, setUserLogin] = useState<any>([]);
    const [passwordShow, setPasswordShow] = useState<any>(false);
    const [loader, setLoader] = useState<boolean>(false);
    const { loginSuccess, isLoggedIn } = useUserStore()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: userLogin.email,
            password: userLogin.password
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().required("Please Enter Your Password"),
        }),
        onSubmit: async (values) => {
            try {
                setLoader(true)
                const response = await loginApi(values)
                console.log("resLog ==>",response.data)
                loginSuccess(response.data, props.router.navigate)
            }
            catch (err: any) {
                console.log("errr ==>", err)

                setLoader(false)
            }


        }
    });

    if (isLoggedIn) {
        return <Navigate to={"/anasayfa"} />
    }


    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <h3 className='display-5'>
                                            Kuzem
                                        </h3>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4 card-bg-fill">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Hoş Geldiniz !</h5>

                                        </div>
                                        {/*   {error && error ? (<Alert color="danger"> {error} </Alert>) : null} */}
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    formik.handleSubmit();

                                                }}
                                            >

                                                <div className="mb-3">
                                                    <Label htmlFor="email" className="form-label">Email</Label>
                                                    <Input
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Email"
                                                        type="email"
                                                        onChange={formik.handleChange}

                                                        value={formik.values.email}
                                                        invalid={
                                                            formik.touched.email && formik.errors.email ? true : false
                                                        }
                                                    />
                                                    {formik.touched.email && formik.errors.email ? (
                                                        <FormFeedback type="invalid">{formik.errors.email as string}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <div className="float-end">
                                                        <Link to="/forgot-password" className="text-muted">Şifremi Unuttum ?</Link>
                                                    </div>
                                                    <Label className="form-label" htmlFor="password-input">Parola</Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                            name="password"
                                                            value={formik.values.password || ""}
                                                            type={passwordShow ? "text" : "password"}
                                                            className="form-control pe-5"
                                                            placeholder="Parola"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            invalid={
                                                                formik.touched.password && formik.errors.password ? true : false
                                                            }
                                                        />
                                                        {formik.touched.password && formik.errors.password ? (
                                                            <FormFeedback type="invalid">{formik.errors.password as string}</FormFeedback>
                                                        ) : null}
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon"
                                                            onClick={() => setPasswordShow(!passwordShow)}>
                                                            {passwordShow ? <FaEye /> : <FaEyeSlash />}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="form-check">
                                                    <Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                    <Label className="form-check-label" htmlFor="auth-remember-check">Beni Hatırla</Label>
                                                </div>

                                                <div className="mt-4">
                                                    <Button color="success"
                                                        disabled={loader && true}
                                                        className="btn btn-success w-100" type="submit">
                                                        {loader && <Spinner size="sm" className='me-2'> Loading... </Spinner>}
                                                        Giriş
                                                    </Button>
                                                </div>

                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>

                                <div className="mt-4 text-center">
                                    <p className="mb-0">Hesabım Yok ? <Link to="/kayit" className="fw-semibold text-primary text-decoration-underline"> Kayıt Ol </Link> </p>
                                </div>

                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default withRouter(Login);