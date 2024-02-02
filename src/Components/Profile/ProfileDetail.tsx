import React, { FC, useEffect, useMemo, useState } from 'react'
import { Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap'
import withRouter from '../Common/withRouter';
import { withTranslation } from 'react-i18next';
import { updateUserApi } from '../../api/User/UserApi';
import useUserStore from '../../zustand/useUserStore';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from "yup"
import { cityList } from '../../common/constants/city';
import { IProfileData } from '../../api/User/UserType';

const today = new Date();
const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
const eightyYearsAgo = new Date(today.getFullYear() - 80, today.getMonth(), today.getDate());

const ProfileDetail: FC<{ t: any, user: IProfileData, setUser: Function }> = ({ t, setUser, user }) => {
    const [region, setRegion] = useState<Array<string>>([])

    const getUserProfileData = async () => {
        try {
            const { profileImg, branch, ...rest } = user
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
            const birthDate = new Date(user.birthDate).toISOString().split('T')[0];
            formik.setFieldValue('birthDate', birthDate);
        }
        catch (err: any) {
            toast.error(err.response.data.message)
        }
    }

    useEffect(() => {
        getUserProfileData()
    }, [user])


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
                console.log("valuee ==>", value)
                const requestBody = {
                    ...rest,
                    address: {
                        city,
                        additionalInfo: "",
                        postalCode,
                        region
                    }
                }
                let data = await updateUserApi(requestBody)
                setUser({
                    ...user,
                    address: {
                        city,
                        additonalInfo: "",
                        postalCode,
                        region
                    },
                    name: value.name,
                    surname: value.surname,
                    birthDate: value.birthDate,
                    gender: value.gender as typeof user.gender
                })
                toast.success("Güncelleme Başarılı", {
                    autoClose: 1000
                })
            }
            catch (err: any) {
                toast.error(err.response.data.message, {
                    autoClose: 1000
                })
            }


        }
    })
    const postalCodeDisableControl = useMemo(() => {
        return formik.values.city == "" || formik.values.region == ""
    }, [formik.values.city, formik.values.region])

    return (
        <Form onSubmit={formik.handleSubmit}>
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

                <Col lg={6}>
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
                <Col lg={6}>
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
                            className="btn btn-primary">
                            {t("Update")}
                        </button>
                        <button type="button"
                            className="btn btn-soft-danger">
                            {t("Cancel")}
                        </button>
                    </div>
                </Col>



            </Row>
        </Form>
    )
}

export default withRouter(withTranslation()(ProfileDetail))


