import { useFormik } from 'formik'
import React from 'react'
import { Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap'
import * as yup from "yup"
import { createBranch } from '../../../api/Branch/BranchApi'
import { toast } from 'react-toastify'
const AddBranchForm = () => {

  const formik = useFormik({
    initialValues: {
      name: "",
      description: ""
    },
    validationSchema: yup.object({
      name: yup.string().required("İsim Giriniz"),
      description: yup.string().required("Açıklama giriniz")
    }),
    onSubmit: async (value,{resetForm}) => {
      try {
        await createBranch(value)
        toast.success("branş kayıt edildi", {
          autoClose: 1000
        })
        resetForm()
      }
      catch (err: any) {
        toast.error(err.response.data.message, {
          autoClose: 1500
        })
      }

    }
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row>
        <Col lg={4}>
          <div className="mb-3">
            <Label htmlFor="firstnameInput" className="form-label">
              İsim
            </Label>
            <Input type="text" className="form-control" id="name" name='name'
              placeholder='isim'
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
        <Col lg={8}>
          <div className="mb-3">
            <Label htmlFor="firstnameInput" className="form-label">
              Açıklama
            </Label>
            <Input type="text" className="form-control" id="name" name='description'
              placeholder='açıklama'
              value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur}
              invalid={
                formik.touched.description && formik.errors.description ? true : false
              }
            />
            {formik.touched.description && formik.errors.description ? (
              <FormFeedback type="invalid"><div>{formik.errors.description}</div></FormFeedback>
            ) : null}
          </div>
        </Col>
        <Col lg={12}>
          <div className="hstack gap-2 justify-content-end">
            <button type="submit"
              className="btn btn-success">
              Onayla
            </button>
          </div>
        </Col>



      </Row>
    </Form>
  )
}

export default AddBranchForm