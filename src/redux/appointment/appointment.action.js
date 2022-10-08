import { 
  USER_SUCCESS, ERROR_MSG, LOAD_DATA, LOGOUT, SEND_CODE_SUCCESS, USER_REDIRECT, CLEAR_REDIRECT, BIND_SUCCESS, UNPROCESSED_LIST,
  FINISH_LIST, QUERY_DEPARTMENT,QUERY_POST
} from '@/constants';

// function alarmPendingList(data){
//     return { type:ALARM_PENDING_LIST, payload:data}
//   }
import { appointment,appointmentss} from '@/server/appointment';
import { Toast } from 'antd-mobile';
function errorMsg(message){
  Toast.info(message, 1.5);
  return {message}
}
function userSuccessss(data){
  return { type:USER_SUCCESS, payload:"/index"}
 }
// 预约看墓
  export function appointments(a){
    console.log("a",a)
    // if(!mobilePhone||!password||!code){
    //   return errorMsg('用户手机号必填');
    // }
    // if(password!==confirmPassword){
    //   return errorMsg('密码和新密码不相同');
    // }
    // eslint-disable-next-line no-unused-vars
    return async dispatch=>{
      const res = await appointment(a);
      if(res.status===200){
        if(res.data.status){
          // dispatch(saveSignInList(res.data.data))
        }else{
          // Toast.info(res.data.message, 1.2)
        }
      }else{
        // Toast.info(res.data.message, 1.2)
      }
    }
  }
  export function appointmentsa(a){
    console.log("a",a)
     
    return async dispatch=>{
      const res = await appointmentss(a);
      if(res.status===200){
        dispatch(userSuccessss())
      }else{
        // Toast.info(res.data.message, 1.2)
      }
    }
  }