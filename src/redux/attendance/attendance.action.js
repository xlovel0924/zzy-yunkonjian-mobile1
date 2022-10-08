import { IS_IN_AREA, SIGN_INFO, SIGN_IN_LIST
} from '@/constants';

import { clockInAreaAxiox, findSignInfoAxiox, signInAxiox, findSignListAxiox 
} from '@/server/attendance';

import { Toast } from 'antd-mobile';
import moment from 'moment';
import history from '@/history';
import _ from 'lodash';

  function handleBack(){
    history.goBack();
  }

  // 保存是否在区域内
  function saveIsInArea(data){
    return { type: IS_IN_AREA, payload: data}
  }

  // 保存当天打卡信息
  function saveSignInfo(data){
    return { type: SIGN_INFO, payload: data}
  }

  // 打卡记录列表
  function saveSignInList(data){
    return { type: SIGN_IN_LIST, payload: data}
  }

  // 查询是否在打卡区域内
  export function clockInArea(payload){
    // eslint-disable-next-line no-unused-vars
    return async dispatch=>{
      const res = await clockInAreaAxiox({lon:`${payload[0]}`, lat:`${payload[1]}`});
      if(res.status===200){
        if(res.data.status){
          Toast.info('当前位置可以签到', 1.3)
          dispatch(saveIsInArea(res.data.status));
        }else{
          Toast.info(res.data.message, 1.3)
        }
      }else{
        Toast.info('请检查网络', 1.3)
      }
    }
  }
  

  // 查询当天打卡情况
  export function findSignInfo(){
    const payload = {
        signDate: moment().format('YYYY-MM-DD'),
        signNodeID: JSON.parse(localStorage.getItem('user')).key
    }
    // eslint-disable-next-line no-unused-vars
    return async dispatch=>{
      const res = await findSignInfoAxiox(payload);
      if(res.status===200){
        if(res.data.status){
          // 没有打卡会返回字符串, 这里要判断一下是否是数组
          if(Array.isArray(res.data.data)){
            dispatch(saveSignInfo(res.data.data));
          }else{
            dispatch(saveSignInfo([]))
          }
        }else{
          dispatch(saveSignInfo([]))
        }
      }else{
        dispatch(saveSignInfo([]))
      }
    }
  }


  // 打卡  根据当前时间和返回值判断是否已经打卡.  已打卡:提示已打卡; 未打卡: 完成打卡
  export function signIn(payload){
    const ampm = (moment().valueOf() - moment(moment().format('YYYY-MM-DD 12:00:00'),'YYYY-MM-DD HH:mm:ss').valueOf())>0?'2':'1'    // '2'下午 ; '1'上午
    const fetchPayload = {
      signDate: moment().format('YYYY-MM-DD'),
      signNodeID: JSON.parse(localStorage.getItem('user')).key
    }
    // eslint-disable-next-line no-unused-vars
    return async dispatch=>{
      // 查询当天打卡情况
      const payloadSignInfo = {
        signDate: moment().format('YYYY-MM-DD'),
        signNodeID: JSON.parse(localStorage.getItem('user')).key
      }
      const res = await findSignInfoAxiox(payloadSignInfo);
      if(res.status===200){
        if(res.data.status){      // 有返回结果
          // console.log(res.data.data)
          if(res.data.data==='今天没有签到数据'){ // 没有签到
            // 判断是否在打卡区域内
            const isInAreaRes = await clockInAreaAxiox({lon:`${payload.lonLat[0]}`, lat:`${payload.lonLat[1]}`});
            if(isInAreaRes.status===200){
              if(isInAreaRes.data.status){
                // 在区域内 执行打卡操作
                // 拼接入参,调用签到接口
                const payloadSignIn = {
                  "address": payload.address,
                  "functionType": ampm,
                  "lonLat": payload.lonLat[0]+','+payload.lonLat[1],
                  "signDate": moment().format('YYYY-MM-DD'),
                  "signNodeID": JSON.parse(localStorage.getItem('user')).key,
                  "signNodeName": JSON.parse(localStorage.getItem('user')).cname,
                  "signPointID": isInAreaRes.data.data.id,
                  "signTime": moment().format('HH:mm')
                }
                const SignInRes = await signInAxiox(payloadSignIn);
                if(SignInRes.status===200){
                  if(SignInRes.data.status){
                    Toast.info('打卡成功', 1.2);
                    // 成功后查询当天打卡情况刷新页面
                    const res = await findSignInfoAxiox(fetchPayload);
                    if(res.status===200){
                      if(res.data.status){
                        // 没有打卡会返回字符串, 这里要判断一下是否是数组
                        if(Array.isArray(res.data.data)){
                          dispatch(saveSignInfo(res.data.data));
                        }else{
                          dispatch(saveSignInfo([]))
                        }
                      }else{
                        dispatch(saveSignInfo([]))
                      }
                    }else{
                      dispatch(saveSignInfo([]))
                    }
                  }else{
                    Toast.info(SignInRes.data.message, 1.2)
                  }
                }else{
                  Toast.info(SignInRes.data.message, 1.2)
                }
              }else{
                Toast.info('当前位置不在打卡区域内', 1.3)
              }
            }else{
              Toast.info(isInAreaRes.data.message, 1.3)
            }
          }else if(Array.isArray(res.data.data) && res.data.data.length===2){      // 有上班和下班签到数据
            Toast.info('今日已完成上下班打卡', 1.5)
          }else if(Array.isArray(res.data.data) && res.data.data.length===1){      // 有一条签到数据

            if(res.data.data[0].functionType===ampm){   // 当前时间已经打过卡
              Toast.info(ampm==='1'?'已有上班打卡记录':'已有下班打卡记录')
            }else{      // 当前时间段未打卡, 判断位置并打卡
              // 判断是否在打卡区域内
              const isInAreaRes = await clockInAreaAxiox({lon:`${payload.lonLat[0]}`, lat:`${payload.lonLat[1]}`});
              if(isInAreaRes.status===200){
                if(isInAreaRes.data.status){
                  // 在区域内 执行打卡操作
                  // 拼接入参,调用签到接口
                  const payloadSignIn = {
                    "address": payload.address,
                    "functionType": ampm,
                    "lonLat": payload.lonLat[0]+','+payload.lonLat[1],
                    "signDate": moment().format('YYYY-MM-DD'),
                    "signNodeID": JSON.parse(localStorage.getItem('user')).key,
                    "signNodeName": JSON.parse(localStorage.getItem('user')).cname,
                    "signPointID": isInAreaRes.data.data.id,
                    "signTime": moment().format('HH:mm')
                  }
                  const SignInRes = await signInAxiox(payloadSignIn);
                  if(SignInRes.status===200){
                    if(SignInRes.data.status){
                      Toast.info('打卡成功', 1.2);
                      // 成功后查询当天打卡情况刷新页面
                      const res = await findSignInfoAxiox(fetchPayload);
                      if(res.status===200){
                        if(res.data.status){
                          // 没有打卡会返回字符串, 这里要判断一下是否是数组
                          if(Array.isArray(res.data.data)){
                            dispatch(saveSignInfo(res.data.data));
                          }else{
                            dispatch(saveSignInfo([]))
                          }
                        }else{
                          dispatch(saveSignInfo([]))
                        }
                      }else{
                        dispatch(saveSignInfo([]))
                      }
                    }else{
                      Toast.info(SignInRes.data.message, 1.2)
                    }
                  }else{
                    Toast.info(SignInRes.data.message, 1.2)
                  }
                }else{
                  Toast.info('当前位置不在打卡区域内', 1.3)
                }
              }else{
                Toast.info(isInAreaRes.data.message, 1.3)
              }
            }
          }
        }else{      // 返回false
          Toast.info(res.data.message, 1.3)
        }
      }else{
        Toast.info('请检查网络', 1.3)
      }
    }
  }


  // 查询打卡记录列表
  export function findSignList(){
    const payload={
      "current": 1,
      "pageSize": 666,
      "paramMap": {signNodeID: JSON.parse(localStorage.getItem('user')).key,
        signNodeName:"",
        functionType:""
      },
      "sortMap": {},
      "token": localStorage.getItem('token')
    }
    // eslint-disable-next-line no-unused-vars
    return async dispatch=>{
      const res = await findSignListAxiox(payload);
      if(res.status===200){
        if(res.data.status){
          dispatch(saveSignInList(res.data.data))
        }else{
          Toast.info(res.data.message, 1.2)
        }
      }else{
        Toast.info(res.data.message, 1.2)
      }
    }
  }