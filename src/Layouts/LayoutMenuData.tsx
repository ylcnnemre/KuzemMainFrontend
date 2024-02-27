import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineDashboard, MdApps, MdCastForEducation } from "react-icons/md";
import { PiChalkboardTeacherDuotone } from "react-icons/pi";
import { GoGitBranch } from "react-icons/go";
import { PiStudent } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";
import { Permission } from "../common/constants/PermissionList";
import { IoCalendarOutline } from "react-icons/io5";
import { Role } from "../config/constant";

const Navdata = () => {
    const [isOpen, setIsOpen] = useState({
        dashboard: false,
        course: false
    });
    const [iscurrentState, setIscurrentState] = useState('Dashboard');

    const menuItems: any = [
        {
            id: "dashboard",
            label: "Dashboards",
            icon: <MdOutlineDashboard />,
            link: "/anasayfa",
            permission: Permission.all,
            stateVariables: isOpen.dashboard,
            click: function (e: any) {
                console.log("selamm ", e)
                e.preventDefault();
                setIsOpen({
                    ...isOpen,
                    dashboard: true
                });

            },
            /* subItems: [
                {
                    id: "analytics",
                    label: "Analytics",
                    link: "/dashboard-analytics",
                    parentId: "dashboard",
                },
            ], */
        },
        {
            id: "Eğitmen",
            label: "Eğitmenler",
            link: "/egitmen",
            permission: Permission.STUDENT_SHOW,
            icon: <PiChalkboardTeacherDuotone />
        },
        {
            id: "Admin",
            label: "Admin",
            link: "/admin",
            permission: Permission.ADMIN_SHOW,
            icon: <RiAdminLine />
        },
        {
            id: "Brans",
            label: "Branşlar",
            link: "/brans",
            permission: Permission.BRANCH_SHOW,
            icon: <GoGitBranch />
        },
        {
            id: "Donem",
            label: "Dönemler",
            link: "/donem",
            permission: Permission.SEMESTER_SHOW,
            icon: <IoCalendarOutline />
        },
        {
            id: "Kurslar",
            label: "Kurslar",
            link: "/kurs",
            permission: Permission.COURSE_SHOW,
            stateVariables: isOpen.course,
            icon: <MdCastForEducation />,
            click: function (e: any) {
                e.preventDefault();
                setIsOpen({
                    ...isOpen,
                    course: !isOpen.course
                })
            },
            subItems: [
                {
                    id: "aktifkurs",
                    label: "Aktif Kurslar",
                    link: "/kurs",
                    parentId: "Kurslar",
                },
                {
                    id: "kurslarim",
                    label: "Aldığım Kurslar",
                    link: "/kurslarim",
                    parentId: "Kurslar",
                },
                {
                    id: "verdigimkurs",
                    label: "Verdiğim Kurslar",
                    link: "/egitmen/kurs",
                    parentId: "Kurslar",
                    role: Role.teacher
                },
                {
                    id : "Cizelge",
                    label : "Çizelge",
                    link: "/cizelge",
                    parentId : "Kurslar"
                }
            ],
        },
        {
            id: "Ogrenci",
            label: "Öğrenciler",
            link: "/ogrenci",
            permission: Permission.STUDENT_SHOW,
            icon: <PiStudent />
        }

    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;