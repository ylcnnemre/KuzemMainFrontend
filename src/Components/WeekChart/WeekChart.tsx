import React, { useState } from 'react'
import { Container } from 'reactstrap'
import BreadCrumb from '../Common/BreadCrumb'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./index.scss"
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const WeekChart = () => {
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    const tileContent = ({ date, view }: any) => {
        if (view === 'month' && date.getDate() === 7 && date.getMonth() === 1) {
            return <p style={{ color: 'red' }}>İşaret</p>;
        }
    };

    const tileClassName = () => {
        return "white-tile"
    };



    return (
        <div className='page-content'>
            <Container fluid >
                <BreadCrumb title="Çizelge" />

                <Calendar
                    className={"week_calendar_container"}
                    tileClassName={tileClassName}
                    tileContent={tileContent}
                    onChange={(e: any) => {
                        const tarih = new Date(e)
                        console.log("tarih =<", tarih.toLocaleDateString())
                    }}
                />
            </Container>
        </div>
    )
}

export default WeekChart