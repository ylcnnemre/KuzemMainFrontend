import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IUserData } from '../../../api/User/UserType'
import { PropagateLoader } from 'react-spinners'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { cityList } from '../../../common/constants/city'
import * as yup from "yup"
import { getUserByIdApi, updateUserApi } from '../../../api/User/UserApi'
import { Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap'
import { withTranslation } from 'react-i18next'
import withRouter from '../../Common/withRouter'


const today = new Date();
const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
const eightyYearsAgo = new Date(today.getFullYear() - 80, today.getMonth(), today.getDate());

const EditStudentInfoTab = ({ t }: any) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [region, setRegion] = useState<Array<string>>([])


    const setStudentProfileData = async (data: IUserData) => {
        try {
            console.log("dataa ==> ", data)
            const { profileImg, birthDate, branch, ...rest } = data
            Object.entries(rest).map(([key, val]) => {
                if (key != "address") {
                    formik.setFieldValue(key, val)
                }
                else {
                    const address: any = val
                    formik.setFieldValue("city", address.city)
                    formik.setFieldValue("postalCode", address.postalCode)
                    if (address.city !== "") {
                        setRegion(cityList.find(item => item.state == address.city)?.region as string[])
                        formik.setFieldValue("region", address.region)
                    }
                }
            })
            const formatBirthDate = new Date(birthDate).toISOString().split('T')[0];
            formik.setFieldValue('birthDate', formatBirthDate);
            formik.setFieldValue("branch", branch?.name)
        }
        catch (err: any) {
            toast.error(err.response.data.message)
        }
    }

    const formik = useFormik({
        initialValues: {
            _id: "",
            birthDate: "",
            email: "",
            gender: "erkek",
            name: "",
            phone: "",
            role: "student",
            surname: "",
            tcNo: "",
            city: "",
            region: "",
            postalCode: 0
        },
        validationSchema: yup.object({
            email: yup.string().email().required(),
            name: yup.string().required(),
            surname: yup.string().required(),
            phone: yup.string(),
            birthDate: yup.date().max(eighteenYearsAgo, 'You must be at least 18 years old.').min(eightyYearsAgo, 'You must be at most 80 years old.').required("Doğum Tarihi Seçiniz"),
        }),
        onSubmit: async (value) => {
            try {
                const { city, region, postalCode, email, phone, tcNo, role, ...rest } = value
                console.log("vall =>", value)
                let response = await updateUserApi({
                    ...rest,
                    address: {
                        city,
                        region,
                        postalCode,
                        additionalInfo: ""
                    }
                })
                toast.success("güncelleme başarılı", {
                    autoClose: 1000
                })
            }
            catch (err: any) {
                console.log("err =>>", err)
                toast.error(err.response.data.message, {
                    autoClose: 1500
                })
            }
        }
    })

    const apiRequest = async () => {
        try {
            setLoading(true)
            const responseStudent = await getUserByIdApi(id as string)
            console.log("responseStudent ==>",responseStudent)
            setStudentProfileData(responseStudent.data)
        }
        catch (err: any) {
            toast.error(err.response.data.message, {
                autoClose: 1000
            })
            navigate("/egitmen")
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        apiRequest()
    }, [id])

    const postalCodeDisableControl = useMemo(() => {
        return formik.values.city == "" || formik.values.region == ""
    }, [formik.values.city, formik.values.region])


    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }} >
                <PropagateLoader color="#36d7b7" />
            </div>
        )
    }

    return (
        <Form onSubmit={formik.handleSubmit}  >
            <Row>
                <Col lg={6}>
                    <div className="mb-3">
                        <Label htmlFor="firstnameInput" className="form-label">
                            {t("FirstName")}
                        </Label>
                        <Input type="text" className="form-control" id="name" name='name'
                            value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            invalid={
                                formik.touched.name && formik.errors.name ? true : false
                            }
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <FormFeedback type="invalid"><div>{formik.errors.name}</div></FormFeedback>
                        ) : null}
                    </div>
                </Col>
                <Col lg={6}>
                    <div className="mb-3">
                        <Label htmlFor="lastnameInput" className="form-label">
                            {t("LastName")}
                        </Label>
                        <Input type="text" className="form-control" id="surname"
                            placeholder="Soyadı" name='surname' value={formik.values.surname} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            invalid={
                                formik.touched.surname && formik.errors.name ? true : false
                            }
                        />
                        {formik.touched.surname && formik.errors.surname ? (
                            <FormFeedback type="invalid"><div>{formik.errors.surname}</div></FormFeedback>
                        ) : null}
                    </div>
                </Col>
                <Col lg={6}>
                    <div className="mb-3">
                        <Label htmlFor="phonenumberInput" className="form-label">
                            Tc No
                        </Label>
                        <Input type="text" className="form-control disabled-input"
                            value={formik.values.tcNo}
                            disabled
                        />
                    </div>
                </Col>
                <Col lg={6}>
                    <div className="mb-3">
                        <Label htmlFor="phonenumberInput" className="form-label">
                            {t("BirthDate")}
                        </Label>
                        <Input
                            name="birthDate"
                            type="date"
                            placeholde1r="Doğum Tarihi"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.birthDate}
                            invalid={
                                formik.touched.birthDate && formik.errors.birthDate ? true : false
                            }
                        />
                    </div>
                </Col>
                <Col lg={6}>
                    <div className="mb-3">
                        <Label htmlFor="phonenumberInput" className="form-label">
                            {t("Phone")}
                        </Label>
                        <Input type="text" className="form-control disabled-input"
                            disabled
                            id="phone"
                            name='phone'
                            value={formik.values.phone}
                        />
                    </div>
                </Col>
                <Col lg={6}>
                    <div className="mb-3">
                        <Label htmlFor="emailInput" className="form-label ">Email</Label>
                        <Input type="email" className="form-control disabled-input"
                            name='email'
                            value={formik.values.email}
                        />
                    </div>
                </Col>

                <Col lg={4}>
                    <div className="mb-3">
                        <Label htmlFor="emailInput" className="form-label">
                            {t("Gender")}
                        </Label>
                        <select className='form-control' value={formik.values.gender} name='gender' onChange={formik.handleChange} onBlur={formik.handleBlur} >
                            <option value="erkek">
                                {t("Male")}
                            </option>
                            <option value="kadın">
                                {t("Female")}
                            </option>
                        </select>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label htmlFor="emailInput" className="form-label">
                            {t("Role")}
                        </Label>
                        <Input type="text" className="form-control disabled-input"
                            name='role'
                            value={formik.values.role}
                            disabled
                        />
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label htmlFor="city" className="form-label">
                            {t("City")}
                        </Label>
                        <select name="city" id="city" className='form-control' value={formik.values.city} onChange={(event) => {
                            if (event.target.value !== "") {
                                setRegion(cityList.find(item => item.state == event.target.value)?.region as string[])
                                formik.setFieldValue("region", "")
                                formik.handleChange(event)
                            }
                            else {
                                formik.handleChange(event)
                                formik.setFieldValue("region", "")
                            }
                        }} >
                            <option value="">
                                Seçim
                            </option>
                            {
                                cityList.map((item, index) => {
                                    return (
                                        <option key={`${index}`} value={item.state}  >
                                            {item.state}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label htmlFor="region" className="form-label">
                            {t("Region")}
                        </Label>
                        <select name="region" id="region" onChange={formik.handleChange} className='form-control' value={formik.values.region} onBlur={formik.handleBlur}  >
                            <option value="">
                                Seçim
                            </option>
                            {
                                region.map((item, index) => {
                                    return (
                                        <option key={`${index}`} value={item}>
                                            {item}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label htmlFor="region" className={`form-label`}  >
                            {t("PostalCode")}
                        </Label>
                        <Input type="number" className={`form-control ${postalCodeDisableControl ? "disabled-input" : ""}  `}
                            name='postalCode'
                            disabled={postalCodeDisableControl}
                            value={formik.values.postalCode}
                            onChange={formik.handleChange}
                        />
                    </div>
                </Col>
                <Col lg={12}>
                    <div className="hstack gap-2 justify-content-end">
                        <button type="submit"
                            className="btn btn-warning">
                            {t("Update")}
                        </button>

                    </div>
                </Col>



            </Row>
        </Form>
    )
}

export default withRouter(withTranslation()(EditStudentInfoTab))