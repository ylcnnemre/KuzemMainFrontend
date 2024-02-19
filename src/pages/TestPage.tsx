import React, { useState } from 'react'
import dayjs from 'dayjs';
import { TimePicker } from 'antd';

const TestPage = () => {
    const [value, onChange] = useState<any>('10:00');
    const format = 'HH:mm';
    return (
        <div className='page-content'>
            <TimePicker defaultValue={dayjs('12:08', format)} format={format} />
        </div>
    )
}

export default TestPage

