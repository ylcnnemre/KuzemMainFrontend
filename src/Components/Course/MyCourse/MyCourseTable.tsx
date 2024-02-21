import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { FC, useMemo, useState } from 'react'
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, Row, TabContent, TabPane, Table } from 'reactstrap';
import { IUserData } from '../../../api/User/UserType';
import { ICourseType } from '../../../api/Course/CourseTypes';
import DetailWidget from '../DetailCourse/DetailWidget';
import { IoTimeOutline } from 'react-icons/io5';
import { IoMdTime } from 'react-icons/io';
import { VscSymbolField } from 'react-icons/vsc';
import { FaChalkboardTeacher, FaRegFilePdf } from 'react-icons/fa';
import { TbFileDescription } from 'react-icons/tb';
import { LuFileJson } from 'react-icons/lu';

const MyCourseTable: FC<{ userData: IUserData }> = ({ userData }) => {
    const [selectedCourse, setSelectedCourse] = useState<ICourseType>()
    const [activeTab, setActiveTab] = useState<number>(1)
    const [modalShow, setModalShow] = useState<boolean>()
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
            /* {
                id: "id",
                accessorKey: "_id",
                header: "işlem",
                cell: ({ getValue }) => {
                    const id = getValue()
                    return (
                        <Button className='btn btn-warning' size='sm' style={{ padding: "5px 15px" }} onClick={() => {
                            setSelectedCourse(userData.courses.find(el => el._id == id))
                      
                        }} >
                            İncele
                        </Button>
                    )
                }
            } */
        ]

    }, [])

    const tableData = useMemo(() => {
        console.log("user => ", userData)
        return userData?.courses ?? []
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

    const startDate = useMemo(() => {
        return new Date(selectedCourse?.startDate ?? "").toLocaleDateString()
    }, [selectedCourse?.startDate])

    const endDate = useMemo(() => {
        return new Date(selectedCourse?.endDate ?? "").toLocaleDateString()
    }, [selectedCourse?.endDate])

    const teacherName = useMemo(() => {
        return selectedCourse?.teacher.name + " " + selectedCourse?.teacher.surname
    }, [selectedCourse?.teacher])

    const documents = useMemo(() => {
        return selectedCourse?.files.filter(el => el.type == "document") ?? []
    }, [selectedCourse?.files])

    const formatFileName = (name: string) => {
        return name.split("-")[0]
    }
    const extensionIcon = (ext: string) => {
        if (ext == ".pdf") {
            return <FaRegFilePdf style={{ fontSize: "30px", marginRight: "10px" }} />
        }
        else if (ext == ".json") {
            return <LuFileJson style={{ fontSize: "30px" }} />
        }
    }

    const openFile = (path: any) => {
        const fullFilePath = `${import.meta.env.VITE_BASEURL}${path}`;
        window.open(fullFilePath, '_blank');
    };

    return (
        <Row style={{ height: "60vh" }} >
            <Col lg={4}>
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
                                    setSelectedCourse(userData.courses.find(el => el._id == row.original._id))
                                }} >
                                    {row.getVisibleCells().map((cell: any) => {
                                        return (
                                            <td key={cell.id} style={selectedCourse?._id == row.original._id ? { backgroundColor: "rgba(128,128,128,.2)" } : {}}   >
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

            </Col>
            <Modal isOpen={modalShow} toggle={() => setModalShow(false)} >
                <ModalHeader>
                    Ayrıntılıar
                </ModalHeader>

                <ModalBody>

                </ModalBody>
                <ModalFooter>

                    <Button color="danger" onClick={() => { setModalShow(false) }}>
                        İptal
                    </Button>
                </ModalFooter>
            </Modal>
            <Col lg={8} style={{ borderLeft: "1px solid gray" }} >
                <Nav tabs>
                    <NavItem>
                        <NavLink className={`${activeTab == 1 && "active"}`} onClick={() => setActiveTab(1)} >
                            Kurs Ayrıntıları
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={`${activeTab == 2 && "active"}`} onClick={() => setActiveTab(2)} >
                            Kurs Dökümanları
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={`${activeTab == 3 && "active"}`} onClick={() => { setActiveTab(3) }} >
                            Duyuru
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={`${activeTab == 3 && "active"}`} onClick={() => { setActiveTab(4) }} >
                            Sınavlar
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab} style={{ paddingTop: "20px" }}>
                    <TabPane tabId={1}  >
                        {
                            selectedCourse ? (
                                <Row >
                                    <Col lg={6} sm={3} xs={6}   >
                                        <DetailWidget icon={<IoTimeOutline />} title='Kurs Başlangıç' value={startDate ?? ""} />
                                    </Col>
                                    <Col lg={6} sm={3} xs={6} style={{ marginBottom: "15px" }}  >
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
                                    <Col lg={12}>
                                        {
                                            selectedCourse.schedules.length !== 0 && (
                                                <Row>
                                                    <h5>
                                                        Program
                                                    </h5>
                                                    {
                                                        selectedCourse?.schedules.map((item, index) => {
                                                            return (
                                                                <Col key={`${index}`} sm={4} >
                                                                    <div className='program_card'>
                                                                        <p  >
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
                        <Row>
                            {
                                documents.map(el => {
                                    return (
                                        <Col md={4} key={`${el?._id}`} >
                                            <div className='course_document_card' onClick={()=>{
                                                openFile(el.path)
                                            }} >
                                                {
                                                    extensionIcon(el.extension)
                                                }
                                                <div className='card_document_card_content'>
                                                    <p >
                                                        {formatFileName(el.name)}
                                                    </p>
                                                    {/*    <Button size='sm'>
                                                        incele
                                                    </Button> */}
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })
                            }

                        </Row>

                    </TabPane>
                    <TabPane tabId={3} >
                        Duyuru

                    </TabPane>
                </TabContent>
            </Col>
        </Row>
    )
}

export default MyCourseTable