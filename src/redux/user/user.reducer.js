import { getRedirectPath } from '@/utils/baseUtil';
import { USER_SUCCESS, ERROR_MSG, LOAD_DATA, LOGOUT, USERS_LIST, SHIPS_LIST, MATERIALS_LIST, LOCATIONS_LIST, USER_REDIRECT, 
    CLEAR_REDIRECT, SEND_CODE_SUCCESS, BIND_SUCCESS, UNPROCESSED_LIST, FINISH_LIST, QUERY_DEPARTMENT,QUERY_POST
 } from '@/constants';
// 用户初始状态
const initState={
  id:'',
  name:'',
  redirectTo:'',
  userInfo:{},
  usersList: [],
  shipsList: [],
  materialsList: [],
  locationsList: [],
  sended:false,
  bindSuccess:'',
  finishList:[],
  depatmentname:"",
  postname:"",
  unprocessedList:[],
}
// reducer
export function user(state=initState, action){
   
  switch(action.type){
    case USER_SUCCESS:
        return {...state,redirectTo:getRedirectPath('/index'),...action.payload}
    case LOAD_DATA:
        return {...state,userInfo:action.payload}
    case USERS_LIST:
        return {...state,usersList:action.payload}
    case SHIPS_LIST:
        return {...state,shipsList:action.payload}
    case MATERIALS_LIST:
        return {...state,materialsList:action.payload}
    case LOCATIONS_LIST:
        return {...state,locationsList:action.payload}
    case ERROR_MSG:
        return {...state,msg:action.message}
    case LOGOUT:
        return {...initState,redirectTo:'/login'}
    case USER_REDIRECT:
        return {...state,redirectTo:action.payload}
    case CLEAR_REDIRECT:
        return {...state,redirectTo:''}
    case SEND_CODE_SUCCESS:
        return {...state,sended:action.payload}
    case BIND_SUCCESS:
        return {...state,bindSuccess:action.payload}
    case QUERY_DEPARTMENT:
        return {...state,depatmentname:action.payload}
    case QUERY_POST:
        return {...state,postname:action.payload}       
    case UNPROCESSED_LIST:
        return {...state,unprocessedList:action.payload}
    case FINISH_LIST:
        return {...state,finishList:action.payload}
    default:
        return state
  }
}
