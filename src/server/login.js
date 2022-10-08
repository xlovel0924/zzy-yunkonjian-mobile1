import axios from 'axios';
import { smallOwnersUrl, LOGINPRE, YZMESSAGE } from './service';
// 登陆
// export function loginAxios(data){
//     return axios.post(dalianUrl('user/login'),qs.stringify(data),
//     {headers: {'Content-Type':'application/x-www-form-urlencoded'}});
// }
export function loginAxios(data) {
    return axios.post(smallOwnersUrl(LOGINPRE + 'login/tMemberinfo/login'), data);
}
// 获取验证码
export function sendCodeAxios(data) {
    console.log("data@@", data.mobilePhone)
    // return axios.get(smallOwnersUrl(`personnel/sms/sendSms}?phoneNumber=${data.mobilePhone}`));
    return axios.get(smallOwnersUrl(`${YZMESSAGE}personnel/sms/sendSms?phoneNumber=${data.mobilePhone}`))

    // return axios.get(`http://192.168.10.215:8002/yz/message/personnel/sms/sendSms?phoneNumber=${data.mobilePhone}`);

    // return axios.get(`http://192.168.10.175:8004/personnel/sms/sendSms}?phoneNumber=${data.mobilePhone}`);

}
// 验证码登录
// export function codeloginAxios(data){
//     return axios.post(smallOwnersUrl(`personnel/sms/sendSms`),data);
// }

export function codeloginAxios(data) {
    return axios.post(smallOwnersUrl(LOGINPRE + 'login/tMemberinfo/loginCheckSMSCode'), data);
}
// 注册
export function registerAxios(data) {
    return axios.post(smallOwnersUrl(LOGINPRE + 'login/tMemberinfo/register'), data);
}
// 忘记密码
export function forgetPasswordAxios(data) {
    return axios.post(smallOwnersUrl(LOGINPRE + 'login/tMemberinfo/verify'), data);
}
// 修改密码
// export function modifyPasswordAxios(data){
//     return axios.post(baseUrl('personnel/personnel/updatePassword'),data);
// }
// 获取用户信息
export function getUserInfoAxios(data) {
    return axios.post(smallOwnersUrl('nodeInstance/token'), data);
}
// 更新用户昵称   
export function updateUserNameAxios(data) {
    return axios.post(smallOwnersUrl('user/updateUserName'), data);
}
// 更新用户地址性别
export function updateUserInfoAxios(data) {
    return axios.post(smallOwnersUrl('nodeInstance/appUpdate'), data);
}
// 绑定海域
export function bindAxios(data) {
    return axios.post(smallOwnersUrl('bindFishingArea'), data);
}
// 联系客服问题提交
export function customerSubmitAxios(data) {
    return axios.post(smallOwnersUrl('user/saveCustomerService'), data);
}
// 未处理/已处理 申请记录列表
export function findApplicationListAxios(data) {
    return axios.post(smallOwnersUrl('nurse/findByUserId'), data);
}
// 查询部门
export function depatmenentaxios(data) {

    return axios.post(smallOwnersUrl(`nodeInstance/appFindDepartmentName?userID=${data}`));
}
// 查询岗位
export function postaxios(data) {
    return axios.post(smallOwnersUrl(`nodeInstance/appFindPositionName?userID=${data}`));
    // return axios.post(smallOwnersUrl('nodeInstance/appFindPositionName'),data);
}

// 退出登录
export function ApiLogout(data) {
    return axios.post(smallOwnersUrl(LOGINPRE + 'login/tMemberinfo/loginOut'), data)
}