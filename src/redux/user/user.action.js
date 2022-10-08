import { Toast } from 'antd-mobile';
import _ from 'lodash';
import { 
  USER_SUCCESS, ERROR_MSG, LOAD_DATA, LOGOUT, SEND_CODE_SUCCESS, USER_REDIRECT, CLEAR_REDIRECT, BIND_SUCCESS, UNPROCESSED_LIST,
  FINISH_LIST, QUERY_DEPARTMENT,QUERY_POST
} from '@/constants';
import { registerAxios, loginAxios,codeloginAxios, sendCodeAxios, forgetPasswordAxios, getUserInfoAxios, updateUserNameAxios, customerSubmitAxios,
  modifyPasswordAxios, bindAxios, updateUserInfoAxios, findApplicationListAxios,depatmenentaxios,postaxios } from './../../server/login';
import { isShow } from "../index/index.action"
// import {ip} from './../../utils/baseUtil';
// const ip = '218.24.128.76:8800'
// 获取用户信息  
export function loadData(userInfo){
  return {type:LOAD_DATA,payload:userInfo}
}

export function redirectTo(data){
  return {type:USER_REDIRECT,payload:data}
}

// 返回首页
export function redirectToIndex(){
  return {type:USER_REDIRECT,payload:'./index'}
}

// 清除redirectTo
export function clearRedirect(){
  return {type:CLEAR_REDIRECT}
}

// 错误信息提示
function errorMsg(message){
  Toast.info(message, 1.5);
  return {message, type:ERROR_MSG}
}

// 成功
function userSuccess(data){
 return { type:USER_SUCCESS, payload:data}
}
// d登录页
function LOGOUTdata(data){
  return { type:LOGOUT, payload:data}
 }
// 发送验证码成功
function sendCodeSuccess(data){
  return { type:SEND_CODE_SUCCESS, payload:data}
 }

function bindSuccess(data){
  return { type:BIND_SUCCESS, payload:data }
}

function saveApplicationList(data,status){
  if(status.length===1){
    return { type:UNPROCESSED_LIST, payload:data }
  }else{
    return { type:FINISH_LIST, payload:data }
  }
}

// 推送相关
function setTags (user) {
  // const user = localStorage.getItem('user');
  const tags = !_.isEmpty(user)?JSON.parse(user).departmentID+"|"+JSON.parse(user).roleID:'1|1'
  // console.log(tags)
  window.JPush.setTags({ sequence: JSON.parse(user).mobileTel, tags: [tags] },
   (result) => {
      console.log("setTags设置成功："+result.tags);
  }, (error) => {
      console.log(error.sequence+"err:"+error.code);
      setTimeout(()=>{setTags(user)},25000);
  });
  
}

//查询部门
export function depatment(depatmentname){
  return {type:QUERY_DEPARTMENT,payload:depatmentname}
}
//查询岗位
export function post(postname){
  return {type:QUERY_POST,payload:postname}
}
export function clearBindSuccess(){
  return { type:BIND_SUCCESS, payload:'' }
}

// 用户登出
export function clearRedirectTo(){
  return async dispatch=>{
    dispatch(clearRedirect())
  }
}

//部门查询
export function depantmentInfo(userID){
  return async dispatch=>{
    if(!_.isEmpty(userID)){
      // const params = {}
      // console.log(params);
      const res = await depatmenentaxios(userID);
      if(res.status===200){
        if(res.data.status){
            dispatch(depatment(res.data.data));
      }
      }else{
        errorMsg('服务器没有响应')
      }
    }
  }
}
//岗位查询
export function postinfo(userID){
  return async dispatch=>{
    // const token = sessionStorage.getItem('token');
    if(!_.isEmpty(userID)){
      // const params = {userID}
      // console.log(params);
      const res = await postaxios(userID);
      if(res.status===200){
        if(res.data.status){
            dispatch(post(res.data.data));
      }
      }else{
        errorMsg('服务器没有响应')
      }
    }
  }
}

// 用户登出
export function logoutSubmit(){
  console.log('登出')
  localStorage.removeItem('token');
  sessionStorage.removeItem('userid');
  // sessionStorage.removeItem('user');
  sessionStorage.removeItem('password')
  sessionStorage.removeItem('backCenter_center')
  sessionStorage.removeItem('center')
  sessionStorage.setItem('isFirstLogin','true')
  localStorage.removeItem('userId')
  localStorage.removeItem('password')
  localStorage.removeItem('nodeInstancePassword')
  localStorage.removeItem('nodeInstanceId')
  return { type:LOGOUT }
}

// 用户登录操作
export function login({userId,password}){
  return async dispatch=>{
    // 去除手机号码空格
    userId= userId.replace(/\s/ig,"")
    var param = {account:userId,password};
    const res = await loginAxios(param);
    if(res && res.status===200){
      if(res.data.status===200){
        let result=res;
        localStorage.setItem('token',result.data.data.token);
        sessionStorage.setItem('userid',JSON.stringify(result.data.data.id));
        sessionStorage.setItem('name',JSON.stringify(result.data.data.name));
        sessionStorage.setItem('phone',JSON.stringify(result.data.data.phone));
        // sessionStorage.setItem('mapType','streetMap');
        // sessionStorage.setItem('mapCenter','[39.243687367000796,122.5902557373047]');
        // sessionStorage.setItem('backCenter_center','["39.244722","122.779999"]')
        sessionStorage.setItem('mapZoom', '13' );
        localStorage.setItem('user',JSON.stringify(result.data));
        sessionStorage.setItem('isFirstLogin','true')
        localStorage.setItem('userId',userId)
        localStorage.setItem('password',password)
        localStorage.setItem('nodeInstanceId', userId)
        localStorage.setItem('nodeInstancePassword', password)
        // localStorage.setItem('userInfo', )
        dispatch(getUserInfo())
        dispatch(userSuccess(result))
        dispatch(isShow(false))
        const registrationId = localStorage.getItem('registrationId')
        if(registrationId!==null&&registrationId!==undefined){
          dispatch(updateUserRegistrationId(registrationId, result.data.key));
          dispatch(isShow(false))
        }
      }else{
        dispatch(errorMsg(res.data.message))
        dispatch(clearRedirect())
        // 登录失败清除已保存的账号密码

      }
    }else{
      dispatch(errorMsg('未开启服务'))
      dispatch(clearRedirect())
    }
  }
}
// 验证码登录
export function Verifylogin({smsCode,phone}){
  console.log("userId,password",smsCode,phone)
  return async dispatch=>{
    // 去除手机号码空格
    phone= phone.replace(/\s/ig,"")
    var param = {phone:phone,verify:smsCode};
    const res = await codeloginAxios(param);
    console.log(res);
    console.log(res.data.id);
    if(res.status===200){
      if(res.data.status===200){
        let result=res;
        console.log(result)
        localStorage.setItem('token',result.data.data.token);
        sessionStorage.setItem('userid',JSON.stringify(result.data.data.id));
        // sessionStorage.setItem('mapType','streetMap');
        // sessionStorage.setItem('backCenter_center','["39.244722","122.779999"]')
        sessionStorage.setItem('mapZoom', '13' );
        localStorage.setItem('user',JSON.stringify(result.data));
        sessionStorage.setItem('isFirstLogin','true')
        localStorage.setItem('userId',phone)
        // localStorage.setItem('password',password)
        localStorage.setItem('nodeInstanceId', phone)
        // localStorage.setItem('nodeInstancePassword', password)
        dispatch(getUserInfo())
        dispatch(userSuccess(result))
        dispatch(isShow(false))
        const registrationId = localStorage.getItem('registrationId')
        if(registrationId!==null&&registrationId!==undefined){
          dispatch(updateUserRegistrationId(registrationId, result.data.key));
          dispatch(isShow(false))
        }
      }else{
        dispatch(errorMsg(res.data.message))
        dispatch(clearRedirect())
        // 登录失败清除已保存的账号密码
      }
    }else{
      dispatch(errorMsg('未开启服务'))
      dispatch(clearRedirect())
    }
  }
}

// 用户获取验证码
export function sendCode({mobilePhone,codeType}){
  // console.log(mobilephone+":"+type);
  return async dispatch=>{
    mobilePhone= mobilePhone.replace(/\s/ig,"")
    var param = {mobilePhone,type:codeType};
    const res = await sendCodeAxios(param);
    console.log(res,"ressss@@")
    if(res.status===200){
      if(res.data.status){
        // 允许开始倒计时
        dispatch(sendCodeSuccess(true))
        // Toast.success(res.data.data,1);
      }else{
        Toast.fail(res.data.message,1);
      }
    }else{
      Toast.fail(res.data.message,1);
    }
  }
}

// 禁止倒计时
export function notSended(){
  // console.log(mobilephone+":"+type);
  return async dispatch=>{
    // 禁止开始倒计时
    dispatch(sendCodeSuccess(false))
  }
}

// 用户注册操作
export function register({mobilePhone,password,confirmPassword,code}){
  if(!mobilePhone||!password||!code){
    return errorMsg('用户手机号必填');
  }
  if(password!==confirmPassword){
    return errorMsg('密码和新密码不相同');
  }
  return async dispatch=>{
    mobilePhone= mobilePhone.replace(/\s/ig,"")
    var param = {account:mobilePhone,password,verify:code};
    const res = await registerAxios(param);
    console.log(res,"@@$$$res")
    if(res.status===200){
      if(res.data.status===200){
        let result=res.data;
        localStorage.setItem('token',result.data.token);
        sessionStorage.setItem('userid',JSON.stringify(result.data.id));
        // sessionStorage.setItem('name',JSON.stringify(result.data.data.name));
        sessionStorage.setItem('phone',JSON.stringify(mobilePhone));
        sessionStorage.setItem('mapZoom', '13' );
        sessionStorage.setItem('isFirstLogin','true')
        localStorage.setItem('password',password)
        localStorage.setItem('nodeInstanceId', mobilePhone)
        localStorage.setItem('nodeInstancePassword', password)
        // sessionStorage.setItem('mapType','streetMap');
        localStorage.setItem('user',JSON.stringify(result));
        dispatch(getUserInfo())
        // dispatch(redirectTo('/index'))
        dispatch(isShow(false))
      }else{
        dispatch(errorMsg(res.data.message))
        dispatch(clearRedirect())

      } 
    }else{
      dispatch(errorMsg(res.data.message))
      dispatch(clearRedirect())
    }
  }
}

// 用户忘记密码操作
export function forgetPassword(mobilephone,password,confirmPassword,code){
  // if(!mobilephone||!password||!code){
  //   return errorMsg('用户手机号必填');
  // }
  const type ='2';
  if(password!==confirmPassword){
    return errorMsg('密码和确认密码不相同');
  }
  return async dispatch=>{
    mobilephone= mobilephone.replace(/\s/ig,"")
    var param = {account:mobilephone,password:password,verify:code};
    const res = await forgetPasswordAxios(param);
    if(res.data.flag){
        let result=res;
        localStorage.setItem('token',result.data.data.token);
        sessionStorage.setItem('userid',JSON.stringify(result.data.id));
        // sessionStorage.setItem('mapType','streetMap');
        // sessionStorage.setItem('backCenter_center','["39.244722","122.779999"]')
        sessionStorage.setItem('mapZoom', '10' );
        localStorage.setItem('user',JSON.stringify(result.data));
        sessionStorage.setItem('isFirstLogin','true')
        // dispatch(getUserInfo())
        // dispatch(logoutSubmit());
        dispatch(userSuccess(result))
        dispatch(errorMsg(res.data.message))
        dispatch(isShow(false))
        // dispatch(LOGOUTdata())
    }else{
      dispatch(errorMsg(res.data.message))
      dispatch(clearRedirect())
    }
  }
}

export function getUserInfo(){
  return async dispatch=>{
    // 获取用户信息
    const token = localStorage.getItem('token');
    
    if(token===null||token===''){
      // console.log('token失效');
      return dispatch(logoutSubmit());
    }
    let user =localStorage.getItem('user');
  
    if(!_.isEmpty(user)){
      user = JSON.parse(user)
      // console.log(user.token)
      // console.log(user);
      const params = {token:'0912d1dfa3a84cf33acdf52e305abe1f33acdf52e3050a3a8912d4cfa1be1fdf'}
      // console.log(params);
      const res = await getUserInfoAxios(params);
      if(res && res.status===200){
        if(res.data.status){
            localStorage.setItem('user',JSON.stringify(res.data.data));
            //有登陆信息
            dispatch(loadData(res.data.data));
            setTimeout(() => {
              setTags(JSON.stringify(user))
            }, 10000);
        }else{
          // console.log('token失效');
          return dispatch(logoutSubmit());
        }
      }else{
        errorMsg('服务器没有响应')
      }
    }
  }
}

// 用户修改密码操作
// export function modifyPassword({password, newPassword, confirmPassword},mobilephone){
//   if(!password||!newPassword||!confirmPassword){
//     return errorMsg('填写完整信息');
//   }
//   if(!mobilephone){
//     return errorMsg('系统错误');
//   }
//   if(newPassword!==confirmPassword){
//     return errorMsg('新密码和确认密码不相同');
//   }
//   return async dispatch=>{
//     // 获取用户信息
//     var param = {password,newPassword,mobilephone};
//     const res = await modifyPasswordAxios(param);
//     if(res.status===200){
//       if(res.data.status){
//         let result=res.data.data;
//         Toast.success(result+"重新登陆",1);
//         dispatch(logoutSubmit())
//       }else{
//         dispatch(errorMsg(res.data.message))
//         dispatch(clearRedirect())
//       } 
//     }else{
//       dispatch(errorMsg(res.data.message))
//       dispatch(clearRedirect())
//     }
//   }
// }

// 修改用户昵称
export function updateUserName(userName){
  let token = JSON.parse(localStorage.getItem('token'));
  var param = { token,userName };
  return async dispatch=>{
    const res = await updateUserNameAxios(param);
    if(res.status===200){
      if(res.data.status){
          //有登陆信息
        dispatch(getUserInfo());
      }else{
        dispatch(errorMsg(res.data.message))
        dispatch(clearRedirect())
      }
    }else{
      dispatch(clearRedirect())
    }
  }
}


// 修改用户信息
export function updateUserInfo( payload ){
  const param = {
    ...payload,
    token: JSON.parse(localStorage.getItem('token')),
    id: JSON.parse(localStorage.getItem('user')).key
  }
  let token = JSON.parse(localStorage.getItem('token'));
  // var param = { token, cname, id };
  return async dispatch=>{
    const res = await updateUserInfoAxios(param);
    if(res.status===200){
      if(res.data.status){
          //有登陆信息
        dispatch(getUserInfo(res.data.data));
      }else{
        dispatch(errorMsg(res.data.message))
        dispatch(clearRedirect())
      }
    }else{
      dispatch(clearRedirect())
    }
  }
}


// 绑定用户推送标识信息
export function updateUserRegistrationId( registrationId,id ){
  let token = JSON.parse(localStorage.getItem('token'));
  var param = { token, para30: registrationId, id };
  return async dispatch=>{
    const res = await updateUserInfoAxios(param);
    if(res.status===200){
      if(res.data.status){
          //有登陆信息
        dispatch(getUserInfo(res.data.data));
      }else{
        dispatch(errorMsg(res.data.message))
        dispatch(clearRedirect())
      }
    }else{
      dispatch(clearRedirect())
    }
  }
}

// 绑定海域登记证
export function bind(certificateNo,obligee,applicant){
  let token = JSON.parse(localStorage.getItem('token'));
  var param = {token,seaAreaNumber:certificateNo,obligee,applicant};
  return async dispatch=>{
    const res = await bindAxios(param);
    if(res.status===200){
      if(res.data.status){
        sessionStorage.setItem('isFirstLogin','true')
        if(res.data.message!=='海域证书编号已绑定'){
          sessionStorage.setItem('mapZoom','13')
        }
        // dispatch(redirectTo('/index'));
        if(certificateNo==='201911200954'){
          dispatch(bindSuccess('bindTestSuccess'));
        }else{
          dispatch(bindSuccess('bindSuccess'));
        }
      }else{
        dispatch(errorMsg(res.data.message))
        dispatch(clearRedirect())
      }
    }else{
      dispatch(clearRedirect())
    }
  }
}

// 联系客服问题提交
export function customerSubmit(mobilePhone,content){
  var param = { mobilePhone, content };
  return async dispatch=>{
    const res = await customerSubmitAxios(param);
    if(res.status===200){
      if(res.data.status){
        Toast.info('问题反馈已提交',1.5)
        // errorMsg(res.data.data)
      }else{
        dispatch(errorMsg(res.data.message));
      }
    }else{
      dispatch(errorMsg(res.data.message))
    }
  }
}

// 获取待审核申请记录列表
export function findApplicationList(statusList){
  const token =  JSON.parse(localStorage.getItem('token'));
  var param = { token: token, statusList };
  return async dispatch=>{
    const res = await findApplicationListAxios(param);
    if(res.status===200){
      if(res.data.status){
        dispatch(saveApplicationList(res.data.data,statusList))
        // errorMsg(res.data.data)
      }else{
        dispatch(saveApplicationList([],statusList))
        // dispatch(errorMsg(res.data.message));
      }
    }else{
      dispatch(errorMsg(res.data.message))
    }
  }
}