import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { Button, Col, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, Row, TabContent, TabPane, Table } from 'reactstrap';
import { ICourseType } from '../../../api/Course/CourseTypes';
import CourseDetailModal from '../EditCourse/CourseDetailModal';
import CourseDocumentModal from '../MyCourse/CourseDocumentModal';
import "./index.scss"
import { IoCloseCircle } from 'react-icons/io5';
import { CgClose } from 'react-icons/cg';
import { TfiAnnouncement } from 'react-icons/tfi';
import { useFormik } from 'formik';
import * as yup from "yup"
import { updateAnnouncementApi } from '../../../api/Course/courseApi';
import { toast } from 'react-toastify';
import { IUserData } from '../../../api/User/UserType';

const TeacherCourseTable: FC<{ data: ICourseType[] }> = ({ data }) => {
    const [activeTab, setActiveTab] = useState<number>(1)
    const [selectedCourse, setSelectedCourse] = useState<ICourseType>()
    const [modalShow, setModalShow] = useState<boolean>(false)
    const [documentModalShow, setDocumentModalShow] = useState<boolean>(false)
    const [showAnnouncementList, setShowAnnouncementList] = useState<boolean>(false)
    const [showSelectedAnnouncementModal, setShowSelectedAnnouncementModal] = useState<boolean>(false)
    const wrapperRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<any>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node) && !showSelectedAnnouncementModal) {
                setShowAnnouncementList(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSelectedAnnouncementModal]);


    const formik = useFormik({
        initialValues: {
            id: "",
            title: "",
            content: ""
        },
        validationSchema: yup.object({
            title: yup.string().required().max(50),
            content: yup.string().required().max(200)
        }),
        onSubmit: async (value) => {
            try {
                console.log("vale =>", value)
                const response = await updateAnnouncementApi({
                    content: value.content,
                    title: value.title,
                    courseId: selectedCourse?._id as string,
                    announcementId: value.id
                })
                console.log("response ==>", response)
                setSelectedCourse({
                    ...selectedCourse as ICourseType,
                    announcement: selectedCourse?.announcement.map(el => {
                        if (el._id == value.id) {
                            return {
                                ...el,
                                title: value.title,
                                content: value.content
                            }
                        }
                        return el
                    }) as any
                })
                setShowSelectedAnnouncementModal(false)

                toast.success("Güncelleme başarılı", {
                    autoClose: 1000,
                    position: "top-left"
                })
            }
            catch (err: any) {
                toast.error(err.message, {
                    autoClose: 1000
                })

            }
        }
    })


    const columns = useMemo<ColumnDef<any>[]>(() => {
        return [
            {
                id: "title",
                accessorKey: "title",
                header: "isim"
            },
            {
                id: "semester",
                accessorKey: "semester",
                header: "Dönem",
                cell: ({ getValue }) => {
                    const semester: any = getValue()
                    return (
                        <p>
                            {semester?.name}
                        </p>
                    )
                }
            },
            {
                accessorKey: "_id",
                header: "Ayrıntılar",
                cell: ({ getValue }) => {
                    return (
                        <Button size='sm' onClick={() => {
                            setSelectedCourse(data.find(item => item._id == getValue()))
                            setModalShow(true)
                        }} >
                            Ayrıntılar
                        </Button>
                    )
                }
            },
            {
                accessorKey: "_id",
                header: "Döküman",
                cell: () => {
                    return (
                        <Button size='sm' onClick={() => {
                            setDocumentModalShow(true)
                        }} >
                            Dökümanlar
                        </Button>
                    )
                }
            },
            {
                accessorKey: "_id",
                header: "Duyurular",
                cell: () => {
                    return (
                        <Button size='sm' onClick={() => {
                            setShowAnnouncementList(!showAnnouncementList)
                        }}>
                            Duyurular
                        </Button>
                    )
                }
            }
        ]

    }, [data, showAnnouncementList])

    const tableData = useMemo(() => {
        console.log("kurs =>", data)
        return data
    }, [data])

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        initialState: {
            pagination: {
                pageSize: 8
            }
        },
    });

    const documents = useMemo(() => {
        return selectedCourse?.files.filter(el => el.type == "document") ?? []
    }, [selectedCourse?.files])

    const announcementList = useMemo(() => {
        return selectedCourse?.announcement
    }, [selectedCourse?.announcement])

    return (
        <>
            <Row style={{ height: "70vh" }}>
                <Col lg={12}  >
                    <div className={"table-responsive mb-1"}>
                        <Table hover className={"mb-0 align-middle table-borderless"}>
                            <thead className={"table-light text-muted"}>
                                {table.getHeaderGroups().map((headerGroup: any) => (
                                    <tr key={headerGroup.id}  >
                                        {headerGroup.headers.map((header: any) => (
                                            <th key={header.id}   {...{
                                                onClick: header.column.getToggleSortingHandler(),
                                            }}>
                                                {header.isPlaceholder ? null : (
                                                    <React.Fragment>
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                        {{
                                                            asc: ' ',
                                                            desc: ' ',
                                                        }
                                                        [header.column.getIsSorted() as string] ?? null}

                                                    </React.Fragment>
                                                )}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>

                            <tbody>
                                {table.getRowModel().rows.map((row: any) => {
                                    return (
                                        <tr key={row.id} style={{ cursor: "pointer" }} onClick={() => {
                                            let rest = data.find(el => el._id == row.original._id)
                                            console.log("res ==<", rest)
                                            setSelectedCourse(data.find(el => el._id == row.original._id))
                                        }} >
                                            {row.getVisibleCells().map((cell: any) => {
                                                return (
                                                    <td key={cell.id} style={selectedCourse?._id == row.original._id ? { backgroundColor: "rgba(128,128,128,.4)" } : {}}   >
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>

                    </div>

                </Col>
                <CourseDetailModal selectedCourse={selectedCourse as ICourseType} modalShow={modalShow} setModalShow={setModalShow} />
                <CourseDocumentModal courseId={selectedCourse?._id} editMode={true} documents={documents} modalShow={documentModalShow} setModalShow={setDocumentModalShow} />

            </Row>

            <div ref={wrapperRef} className={`teacher_course_announcement ${showAnnouncementList ? "right-0 show" : "left-50"}   `} >
                <div className='teacher_course_announcement_header'>
                    <CgClose className='close_icon' onClick={() => {
                        setShowAnnouncementList(false)

                    }} />
                    <h3>
                        Duyurular
                    </h3>
                </div>
                <div className='teacher_course_announcement_content'>
                    {
                        announcementList?.map(el => {
                            return (
                                <div key={el._id} className='announcement_item' onClick={() => {
                                    setShowSelectedAnnouncementModal(true)
                                    formik.setFieldValue("title", el.title)
                                    formik.setFieldValue("content", el.content)
                                    formik.setFieldValue("id", el._id)
                                }} >
                                    <div className='announcement_item_left_side'>
                                        <TfiAnnouncement className='announcement_icon' />
                                        <h6>
                                            {el.title.substring(0,20) }...
                                        </h6>
                                    </div>
                                    <h6>
                                        {new Date(el.createdAt).toLocaleDateString()}
                                    </h6>
                                </div>
                            )
                        })
                    }

                </div>
            </div>

            <Modal isOpen={showSelectedAnnouncementModal} ref={modalRef} >
                <ModalHeader>
                    Duyuru
                </ModalHeader>
                <ModalBody>
                    <Col lg={12}>
                        <div className="mb-3">
                            <Label className="form-label">
                                İsim
                            </Label>
                            <Input placeholder='isim' type="text" className="form-control" id="title" name='title'
                                value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                invalid={
                                    formik.touched.title && formik.errors.title ? true : false
                                }
                            />
                            {formik.touched.title && formik.errors.title ? (
                                <FormFeedback type="invalid"><div>{formik.errors.title}</div></FormFeedback>
                            ) : null}
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div className="mb-3">
                            <Label className="form-label">
                                İçerik
                            </Label>
                            <Input placeholder='içerik' style={{ resize: "none" }} type="textarea" className="form-control" id="content" name='content'
                                value={formik.values.content} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                invalid={
                                    formik.touched.content && formik.errors.content ? true : false
                                }
                            />
                            {formik.touched.content && formik.errors.content ? (
                                <FormFeedback type="invalid"><div>{formik.errors.content}</div></FormFeedback>
                            ) : null}
                        </div>
                    </Col>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => {
                        formik.handleSubmit()
                    }}>
                        Güncelle
                    </Button>
                    <Button className='btn btn-danger' onClick={() => {
                        setShowSelectedAnnouncementModal(false)
                    }} >
                        Kapat
                    </Button>
                </ModalFooter>
            </Modal>
        </>

    )
}

export default TeacherCourseTable


