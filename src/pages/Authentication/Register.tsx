import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback, Button, Spinner } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { createStudentApi } from "../../api/User/UserApi";
import { ICreateStudentType } from "../../api/User/UserType";

const Register = () => {
    const [loader, setLoader] = useState<boolean>(false);
    const history = useNavigate();
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const eightyYearsAgo = new Date(today.getFullYear() - 80, today.getMonth(), today.getDate());

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            name: '',
            surname: '',
            tcNo: "",
            email: "",
            birthDate: "",
            password: '',
            phone: "",
            confirm_password: '',
            gender: "",

        },
        validationSchema: Yup.object({
            name: Yup.string().min(2, "Minimum 2 Karakter").max(50, "maksimum 50 karakter").required("İsim Boş bırakılamaz"),
            surname: Yup.string().min(1, "Minimum 1 Karakter").max(50, "Maksimum 50 karakter").required("Soyisim boş bırakılamaz"),
            tcNo: Yup.string().min(11, "TcNo 11 karakter olmalı").max(11, "Tc No 11 Karakter Olmalı").required("Tc No boş bırakılamaz"),
            email: Yup.string().email("Email Formatı Yanlış").required("Email boş bırakılamaz"),
            password: Yup.string().min(5, "Minumum 5 Karakter").required("Parola alanı boş bırakılamaz"),
            birthDate: Yup.date().max(eighteenYearsAgo, 'You must be at least 18 years old.').min(eightyYearsAgo, 'You must be at most 80 years old.').required("Doğum Tarihi Seçiniz"),
            gender: Yup.string().oneOf(["erkek", "kadın"]).required("Seçim yapınız"),
            confirm_password: Yup.string()
                .oneOf([Yup.ref("password")], "Parola eşleşmiyor")
                .required("Lütfen Parolayı onaylayınız"),
            phone: Yup.string()
                .matches(/^(\d{10})$/, "Geçerli bir Türkiye telefon numarası girin") // Türkiye telefon numarası formatı (Başında 0 ve 10 rakam)
                .required("Telefon numarası boş bırakılamaz"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const { confirm_password, gender, tcNo, birthDate, ...rest } = values
                const respo: ICreateStudentType = {
                    ...rest,
                    tcNo: `${tcNo}`,
                    gender: gender as ICreateStudentType["gender"],
                    birthDate: new Date(birthDate).toISOString().split('T')[0]
                }

                await createStudentApi(respo)

                toast.success("Kayıt başarılı", {
                    autoClose: 1000
                })
                setTimeout(() => {
                    history("/giris")
                }, 1000)

            }
            catch (err: any) {
                toast.error(err.response.data.message, {
                    autoClose: 2000
                })
                console.log("err ==>", err)
            }



        }
    });


    console.log(validation.errors)

    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <h1>
                                        Kuzem
                                    </h1>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={10}>
                                <Card className="mt-4 card-bg-fill">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Kayıt Ol</h5>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                className="needs-validation" action="#">
                                                <Row>
                                                    {false && false ? (
                                                        <>
                                                            {toast("Your Redirect To Login Page...", { position: "top-right", hideProgressBar: false, className: 'bg-success text-white', progress: undefined, toastId: "" })}
                                                            <ToastContainer autoClose={2000} limit={1} />
                                                            <Alert color="success">
                                                                Register User Successfully and Your Redirect To Login Page...
                                                            </Alert>
                                                        </>
                                                    ) : null}

                                                    {false && false ? (
                                                        <Alert color="danger"><div>

                                                            Email has been Register Before, Please Use Another Email Address... </div></Alert>
                                                    ) : null}
                                                    <Col lg={6} >
                                                        <div className="mb-3">
                                                            <Label htmlFor="useremail" className="form-label">İsim <span className="text-danger">*</span></Label>
                                                            <Input
                                                                id="name"
                                                                name="name"
                                                                className="form-control"
                                                                placeholder="Enter email address"
                                                                type="text"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.name}
                                                                invalid={
                                                                    validation.touched.name && validation.errors.name ? true : false
                                                                }
                                                            />
                                                            {validation.touched.name && validation.errors.name ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.name}</div></FormFeedback>
                                                            ) : null}

                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="username" className="form-label">Soyisim <span className="text-danger">*</span></Label>
                                                            <Input
                                                                name="surname"
                                                                type="text"
                                                                placeholder="Enter username"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.surname}
                                                                invalid={
                                                                    validation.touched.surname && validation.errors.surname ? true : false
                                                                }
                                                            />
                                                            {validation.touched.surname && validation.errors.surname ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.surname}</div></FormFeedback>
                                                            ) : null}

                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="username" className="form-label">Email <span className="text-danger">*</span></Label>
                                                            <Input
                                                                name="email"
                                                                type="email"
                                                                placeholder="Email"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.email}
                                                                invalid={
                                                                    validation.touched.email && validation.errors.email ? true : false
                                                                }
                                                            />
                                                            {validation.touched.email && validation.errors.email ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.email}</div></FormFeedback>
                                                            ) : null}

                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="phone" className="form-label">Telefon Numarası <span className="text-danger">*</span></Label>
                                                            <Input
                                                                name="phone"
                                                                type="text"
                                                                placeholder="Telefon Numarası"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.phone}
                                                                invalid={
                                                                    validation.touched.phone && validation.errors.phone ? true : false
                                                                }
                                                            />
                                                            {validation.touched.phone && validation.errors.phone ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.phone}</div></FormFeedback>
                                                            ) : null}
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="username" className="form-label">Tc No <span className="text-danger">*</span></Label>
                                                            <Input
                                                                name="tcNo"
                                                                type="number"
                                                                placeholder="Tc No"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.tcNo}
                                                                invalid={
                                                                    validation.touched.tcNo && validation.errors.tcNo ? true : false
                                                                }
                                                            />
                                                            {validation.touched.tcNo && validation.errors.tcNo ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.tcNo}</div></FormFeedback>
                                                            ) : null}

                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="username" className="form-label">Doğum Tarihi <span className="text-danger">*</span></Label>
                                                            <Input
                                                                name="birthDate"
                                                                type="date"
                                                                placeholde1r="Doğum Tarihi"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.birthDate}
                                                                invalid={
                                                                    validation.touched.birthDate && validation.errors.birthDate ? true : false
                                                                }
                                                            />
                                                            {validation.errors.birthDate ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.birthDate}</div></FormFeedback>
                                                            ) : null}

                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="gender" className="form-label">Cinsiyet <span className="text-danger">*</span></Label>
                                                            <select
                                                                name="gender"
                                                                className={`form-select ${validation.touched.gender && validation.errors.gender ? 'is-invalid' : ''}`}
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.gender}
                                                            >
                                                                <option value="">Seçiniz</option>
                                                                <option value="erkek">Erkek</option>
                                                                <option value="kadın">Kadın</option>
                                                            </select>
                                                            {validation.touched.gender && validation.errors.gender && (
                                                                <FormFeedback>{validation.errors.gender}</FormFeedback>
                                                            )}
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>

                                                        <div className="mb-3">
                                                            <Label htmlFor="userpassword" className="form-label">Parola <span className="text-danger">*</span></Label>
                                                            <Input
                                                                name="password"
                                                                type="password"
                                                                placeholder="Parola"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.password}
                                                                invalid={
                                                                    validation.touched.password && validation.errors.password ? true : false
                                                                }
                                                            />
                                                            {validation.touched.password && validation.errors.password ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.password}</div></FormFeedback>
                                                            ) : null}

                                                        </div>

                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-2">
                                                            <Label htmlFor="confirmPassword" className="form-label">Parola Onay <span className="text-danger">*</span></Label>
                                                            <Input
                                                                name="confirm_password"
                                                                type="password"
                                                                placeholder="Parola Onay"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.confirm_password || ""}
                                                                invalid={
                                                                    validation.touched.confirm_password && validation.errors.confirm_password ? true : false
                                                                }
                                                            />
                                                            {validation.touched.confirm_password && validation.errors.confirm_password ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.confirm_password}</div></FormFeedback>
                                                            ) : null}

                                                        </div>
                                                    </Col>

                                                    {/* 
                                                    <div className="mb-4">
                                                        <p className="mb-0 fs-12 text-muted fst-italic">By registering you agree to the Velzon
                                                            <Link to="#" className="text-primary text-decoration-underline fst-normal fw-medium">Terms of Use</Link></p>
                                                    </div> */}

                                                    <div className="mt-4">
                                                        <Button color="success" className="w-100" type="submit" disabled={loader && true}>
                                                            {loader && <Spinner size="sm" className='me-2'> Loading... </Spinner>}
                                                            Kayıt Ol
                                                        </Button>
                                                    </div>


                                                </Row>

                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className="mt-4 text-center">
                                    <p className="mb-0">Zaten Hesabım var ? <Link to="/login" className="fw-semibold text-primary text-decoration-underline"> Giriş Yap</Link> </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default Register;
