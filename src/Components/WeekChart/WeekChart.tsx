import React, { useState } from 'react'
import { Container } from 'reactstrap'
import BreadCrumb from '../Common/BreadCrumb'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./index.scss"
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const WeekChart = () => {
    const [value, onChange] = useState<Value>(new Date());

    const tileContent = ({ date, view }: any) => {
        if (view === 'month' && date.getDate() === 7 && date.getMonth() === 1) { // 7 Ekim Perşembe (Ekim ayı 0'dan başladığı için 9, Perşembe günü 0'dan başladığı için 4)
            return <p style={{ color: 'red' }}>İşaret</p>;
        }
    };

    const tileClassName = ({ date, view }: any) => {
        if (view === 'month') {
            return 'white-tile'; // Günlerin olduğu kareyi beyaz yapacak sınıf
        }
    };


    return (
        <div className='page-content'>
            <Container fluid >
                <BreadCrumb title="Çizelge" />

                <Calendar className={"week_calendar_container"} tileContent={tileContent} tileClassName={tileClassName} onChange={onChange} value={value} />
            </Container>
        </div>
    )
}

export default WeekChart