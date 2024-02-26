import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { FC, useMemo, useState } from 'react'
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, Row, TabContent, TabPane, Table } from 'reactstrap';
import { ICourseType } from '../../../api/Course/CourseTypes';
import CourseDetailModal from '../EditCourse/CourseDetailModal';
import CourseDocumentModal from '../MyCourse/CourseDocumentModal';

const TeacherCourseTable: FC<{ data: ICourseType[] }> = ({ data }) => {
    const [activeTab, setActiveTab] = useState<number>(1)
    const [selectedCourse, setSelectedCourse] = useState<ICourseType>()
    const [modalShow, setModalShow] = useState<boolean>(false)
    const [documentModalShow, setDocumentModalShow] = useState<boolean>(false)


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
                        <Button size='sm'>
                            Duyurular
                        </Button>
                    )
                }
            }
        ]

    }, [data])

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


    return (
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
            {/*  <Col lg={8} style={{ borderLeft: "1px solid gray" }} >
                <Nav tabs>
                    <NavItem>
                        <NavLink className={`${activeTab == 1 && "active"}`} onClick={() => setActiveTab(1)} >
                            Kurs Ayrıntıları
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={`${activeTab == 2 && "active"}`} onClick={() => setActiveTab(2)} >
                            Kurs Programı
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={`${activeTab == 3 && "active"}`} onClick={() => { setActiveTab(3) }} >
                            Duyuru
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={`${activeTab == 4 && "active"}`} onClick={() => { setActiveTab(4) }} >
                            Sınavlar
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab} style={{ paddingTop: "20px" }}>
                    <TabPane tabId={1}  >
                        {
                            selectedCourse ? (
                                <Row >
                                    <Col lg={4}>
                                        <DetailWidget icon={<RxText />} title='İsim' value={selectedCourse.title ?? ""} />
                                    </Col>
                                    <Col lg={4} sm={3} xs={6}   >
                                        <DetailWidget icon={<IoTimeOutline />} title='Kurs Başlangıç' value={startDate ?? ""} />
                                    </Col>
                                    <Col lg={4} sm={3} xs={6} style={{ marginBottom: "15px" }}  >
                                        <DetailWidget icon={<IoMdTime />} title='Kurs Bitişi' value={endDate ?? ""} />
                                    </Col>
                                    <Col lg={6} >
                                        <DetailWidget icon={<VscSymbolField />} title='Branş' value={selectedCourse?.branch.name} />
                                    </Col>
                                    <Col lg={6} style={{ marginBottom: "15px" }}  >
                                        <DetailWidget icon={<FaChalkboardTeacher />} title='Eğitmen' value={teacherName} />
                                    </Col>
                                    <Col lg={12} style={{ marginBottom: "15px" }} >
                                        <DetailWidget icon={<TbFileDescription />} title='Açıklama' value={selectedCourse?.description} />
                                    </Col>


                                </Row>
                            ) : (
                                <div>
                                    <h5 style={{ textAlign: "center" }}>
                                        Ayrıntıları görmek için bir kurs seçiniz
                                    </h5>
                                </div>
                            )
                        }

                    </TabPane>
                    <TabPane tabId={2} >
                        <Col lg={12}>
                            {
                                selectedCourse && selectedCourse.schedules.length !== 0 && (
                                    <Row>
                                        <h5 style={{ marginBottom: "15px" }}>
                                            Program
                                        </h5>
                                        {
                                            selectedCourse?.schedules.map((item, index) => {
                                                return (
                                                    <Col key={`${index}`} sm={6} >
                                                        <div className='program_card'>
                                                            <p style={{ marginBottom: "10px" }} >
                                                                <strong>Gün :</strong> <span style={{ color: "#FFCE02" }}>{item.day}</span>
                                                            </p>
                                                            <div className='program_card_date mt-2'>
                                                                <p>
                                                                    <strong>Başlangıç : </strong> <span style={{ color: "#FFCE02" }}>{item.startTime}</span>
                                                                </p>
                                                                <p>
                                                                    <strong>Bitiş : </strong> <span style={{ color: "#FFCE02" }}>{item.endTime}</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                )
                            }
                        </Col>
                    </TabPane>
                    <TabPane tabId={3} >
                        <div className='d-flex justify-content-end'>
                            <Button className='btn btn-primary px-4 mb-3' onClick={() => {
                                setModalShow(true)
                            }} >
                                Ekle
                            </Button>
                        </div>
                        <div className='d-flex flex-column' >

                            <AnnouncementTable data={selectedCourse?.announcement ?? []} />
                        </div>
                        <TeacherCourseAnnouncementModal process={() => { }} courseId={selectedCourse?._id ?? ""} modalShow={modalShow} setModalShow={setModalShow} />
                    </TabPane>
                </TabContent>
            </Col> */}
        </Row>
    )
}

export default TeacherCourseTable


