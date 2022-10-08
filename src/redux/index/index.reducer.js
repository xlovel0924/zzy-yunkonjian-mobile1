import { LOGIN_ISSHOW,CITY_PIC_LIST,CURRENT_CITY,ALL_ROUTE } from "@/constants"

const initState = {
    flag: false,
    cityAndPicList: {}, // 城市图片list
    currentCity: "上海",
    allRouteList: {},   // 所有路由
}

export function indexReducer(state = initState,action){
    switch(action.type){
        case LOGIN_ISSHOW:
            return {...state,flag: action.payload}
        case CITY_PIC_LIST:
            return {...state, cityAndPicList: action.payload}
        case CURRENT_CITY:
            return {...state, currentCity: action.payload}
        case ALL_ROUTE:
            return {...state, allRouteList: action.payload}
        default:
            return state
    }
}