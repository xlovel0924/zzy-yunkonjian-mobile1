import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'
import { solar2lunar } from 'solarlunar';

const ZHOU = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
];

const now = dayjs();
const { yearCn, monthCn, dayCn, gzYear, gzMonth, gzDay } = solar2lunar(
    now.year(),
    now.month() + 1,
    now.date(),
);
console.log(monthCn, dayCn);

console.log(solar2lunar(now.year(), now.month() + 1, now.date()), '我是soar2lunar');

export default function test() {
    const [s, setS] = useState('');
    const [day, setDay] = useState('');
    const [zhou, setZhou] = useState('');

    useEffect(() => {
        setInterval(() => {
            const date = dayjs();
            const sound = date.format('HH:mm:ss');
            const day = date.format('YYYY年MM月DD日');
            const time = date.day();
            setZhou(ZHOU[time]);
            setS(sound);
            setDay(day);
        }, 1000);
        return () => { };
    }, []);
    return (
        <>{day} 农历{monthCn}{dayCn}</>
    )
}
