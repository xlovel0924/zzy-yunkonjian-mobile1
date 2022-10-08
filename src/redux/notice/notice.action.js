import { ALL_NOTICE, NOTICE_DETAIL
} from '@/constants';

import { findAllNoticeAxios, findNoticeDetailAxios
} from '@/server/notice';

import { Toast } from 'antd-mobile';
import history from '@/history';
import _ from 'lodash';

  function handleBack(){
    history.goBack();
  }

  function saveAllNotice(data){
    return { type:ALL_NOTICE, payload:data}
  }

  function saveNoticeDetail(data){
    return { type:NOTICE_DETAIL, payload:data}
  }

  // 查询所有消息
  export function findAllNotice(payload){
    // eslint-disable-next-line no-unused-vars
    return async dispatch=>{
      const res = await findAllNoticeAxios(payload);
      if(res.status===200){
        if(res.data.status){
          // console.log('待处理列表成功')
          // console.log(res.data.data)
          dispatch(saveAllNotice(res.data.data));
        }else{
          dispatch(saveAllNotice([]))
        }
      }else{
        dispatch(saveAllNotice([]))
      }
    }
  }

  // 查询消息详情
  export function findNoticeDetail(payload){
    // eslint-disable-next-line no-unused-vars
    return async dispatch=>{
      const res = await findNoticeDetailAxios(payload);
      if(res.status===200){
        if(res.data.status){
          // console.log('待处理列表成功')
          // console.log(res.data.data)
          dispatch(saveNoticeDetail(res.data.data));
        }else{
          dispatch(saveNoticeDetail([]))
        }
      }else{
        dispatch(saveNoticeDetail([]))
      }
    }
  }