import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { FC, useMemo, useRef, useState } from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import { IUserData } from '../../../api/User/UserType';
import { ICourseType } from '../../../api/Course/CourseTypes';
import CourseDetailModal from '../EditCourse/CourseDetailModal';
import CourseDocumentModal from './CourseDocumentModal';
import CourseAnnouncementModal from '../EditCourse/CourseAnnouncementModal';
import { CgClose } from 'react-icons/cg';
import { TfiAnnouncement } from 'react-icons/tfi';
import Item from 'antd/es/list/Item';


const MyCourseTable: FC<{ userData: IUserData }> = ({ userData }) => {

    console.log("user =>", userData)

    const [selectedCourse, setSelectedCourse] = useState<ICourseType>()
    const [activeTab, setActiveTab] = useState<number>(1)
    const [detailModal, setDetailModal] = useState<boolean>(false)
    const [documentModal, setDocumentModal] = useState<boolean>(false)
    const [announcementModal, setAnnouncementModal] = useState<boolean>(false)
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [showAnnouncementList, setShowAnnouncementList] = useState<boolean>(false)
    const [showSelectedAnnouncementModal, setShowSelectedAnnouncementModal] = useState<{
        visible: boolean,
        title: string,
        content: string
    }>({
        visible: false,
        title: "",
        content: ""
    })
    const modalRef = useRef<any>(null);

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
                cell: () => {
                    return (
                        <Button size='sm' onClick={() => {
                            setDetailModal(true)
                        }} >
                            Ayrıntılar
                        </Button>
                    )
                }
            },
            {
                accessorKey: "_id",
                header: "Dökümanlar",
                cell: () => {
                    return (
                        <Button size='sm' onClick={() => {
                            setDocumentModal(true)
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
                            setShowAnnouncementList(true)
                        }} >
                            Duyurular
                        </Button>
                    )
                }
            },

        ]

    }, [])

    const tableData = useMemo(() => {
        console.log("user => ", userData)
        return userData?.courses.filter(el => el != null) ?? []
    }, [userData])

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



    return (
        <>
            <Row style={{ height: "60vh" }} >
                <Col lg={12}>
                    <div className={"table-responsive mb-1"}>
                        <Table hover className={"mb-0 align-middle table-borderless"}>
                            <thead className={"table-light text-muted"}>
                                {table.getHeaderGroups().map((headerGroup: any) => (
                                    <tr key={headerGroup.id}   >
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
                                    console.log("row =>", row)
                                    return (
                                        <tr key={row.id} style={{ cursor: "pointer" }} onClick={() => {
                                            setSelectedCourse(userData.courses.find(el => el?._id == row.original?._id))
                                        }} >
                                            {row.getVisibleCells().map((cell: any) => {
                                                return (
                                                    <td key={cell?.id} style={selectedCourse?._id == row.original?._id ? { backgroundColor: "rgba(128,128,128,.2)" } : {}}   >
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
                <CourseDetailModal selectedCourse={selectedCourse as ICourseType} modalShow={detailModal} setModalShow={setDetailModal} />
                <CourseDocumentModal setModalShow={setDocumentModal} modalShow={documentModal} documents={documents} />
                <CourseAnnouncementModal modalShow={announcementModal} setModalShow={setAnnouncementModal} data={selectedCourse?.announcement ?? []} />

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
                        selectedCourse?.announcement?.map(el => {
                            return (
                                <div key={el._id} className='announcement_item' onClick={() => {
                                    setShowSelectedAnnouncementModal({
                                        visible: true,
                                        title: el.title,
                                        content: el.content
                                    })

                                }} >
                                    <div className='announcement_item_left_side'>
                                        <TfiAnnouncement className='announcement_icon' />
                                        <h6>
                                            {el.title.substring(0, 20)}...
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


            <Modal isOpen={showSelectedAnnouncementModal.visible} ref={modalRef} >
                <ModalHeader>
                    Duyuru
                </ModalHeader>
                <ModalBody>
                    <Col lg={12}>
                        <div className="mb-3">
                            <Label className="form-label">
                                Başlık
                            </Label>
                            <Input readOnly value={showSelectedAnnouncementModal.title} />
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div className="mb-3">
                            <Label className="form-label">
                                İçerik
                            </Label>
                            <Input readOnly value={showSelectedAnnouncementModal.content} />
                        </div>
                    </Col>
                </ModalBody>
                <ModalFooter>
                    <Button className='btn btn-danger' onClick={() => {
                        setShowSelectedAnnouncementModal({
                            visible: false,
                            content: "",
                            title: ""
                        })
                    }} >
                        Kapat
                    </Button>
                </ModalFooter>
            </Modal>
        </>

    )
}

export default MyCourseTable