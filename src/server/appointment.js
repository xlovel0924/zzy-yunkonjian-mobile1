// import qs from 'qs';
import axios from 'axios';
import { smallOwnersUrl } from './service';
// 墓穴预约
export function appointment(data) {
    return axios.post(smallOwnersUrl('booked/booked/add'), data);
}
export function appointmentss(data) {
    return axios.post(smallOwnersUrl('personnel/graveUse/add'), data);
}

