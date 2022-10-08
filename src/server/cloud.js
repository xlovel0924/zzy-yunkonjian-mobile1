import axios from "axios";
import { smallOwnersUrl,YZPAGE } from './service';

// 云服务
export function cloudService(params){
    return axios.get(smallOwnersUrl(YZPAGE+`serviceRouteRecords/tServiceRouteRecords/getByName/${params}`))
}