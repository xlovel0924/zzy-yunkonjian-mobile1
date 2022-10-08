import {LOGIN_ISSHOW,CITY_PIC_LIST,ERROR_MSG,CURRENT_CITY,ALL_ROUTE} from "@/constants"
import {getAllCityAndPicAxios,getAllRouteAxios, addRecordsAxios} from "../../server/index"
import {Toast} from "antd-mobile";

export function isShow(flag){
    return async dispatch => {
        dispatch({type: LOGIN_ISSHOW, payload: flag})
    }
}


// 错误信息提示
function errorMsg(message){
    Toast.info(message, 1.5);
    return {message, type:ERROR_MSG}
}

// 城市图片list
export function getAllCityAndPic() {
    return async dispatch => {
        let res = await getAllCityAndPicAxios();
        console.log(res,"来了乐乐")
        if (res && res.data.status === 200){
            dispatch({type: CITY_PIC_LIST, payload: res.data})
        } else {
            dispatch(errorMsg(res ? res.data.message : ""))
        }
    }
}

// 当前城市
export function setCurrentCity(data) {
    return async dispatch => {
        dispatch({type: CURRENT_CITY, payload: data})
    }
}

// 查找所有外部链接
export function getAllRoute() {
    return async dispatch => {
        let res = await getAllRouteAxios();
        if (res && res.data.status == 200){
            dispatch({type: ALL_ROUTE, payload: res.data})
        }
    }
}

// TBehaviorRecords插入
export function addRecords(params) {
    return async dispatch => {
        let res = await addRecordsAxios(params);
        // if (res && res.data.status == 200){
        //     dispatch()
        // }
    }
}