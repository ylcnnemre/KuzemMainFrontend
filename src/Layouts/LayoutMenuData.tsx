import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineDashboard, MdApps, MdCastForEducation } from "react-icons/md";
import { PiChalkboardTeacherDuotone } from "react-icons/pi";
import { GoGitBranch } from "react-icons/go";
import { PiStudent } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";
import { Permission } from "../common/constants/PermissionList";
import { IoCalendarOutline } from "react-icons/io5";

const Navdata = () => {
    const [isDashboard, setIsDashboard] = useState(false);
    const [iscurrentState, setIscurrentState] = useState('Dashboard');

    const menuItems: any = [
        {
            id: "dashboard",
            label: "Dashboards",
            icon: <MdOutlineDashboard />,
            link: "/anasayfa",
            permission: Permission.all,
            stateVariables: isDashboard,
            click: function (e: any) {
                console.log("selamm ", e)
                e.preventDefault();
                setIsDashboard(!isDashboard);
                setIscurrentState('Dashboard');
         
            },
             subItems: [
                 {
                     id: "analytics",
                     label: "Analytics",
                     link: "/dashboard-analytics",
                     parentId: "dashboard",
                 },
             ],
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
            permission: Permission.all,
            icon: <IoCalendarOutline />
        },
        {
            id: "Kurslar",
            label: "Kurslar",
            link: "/kurs",
            permission: Permission.COURSE_SHOW,
            icon: <MdCastForEducation />
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