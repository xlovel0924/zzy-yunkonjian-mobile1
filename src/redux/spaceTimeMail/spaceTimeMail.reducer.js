
import { 
  SPACE_TIME_MAIL_LIST, SPACE_TIME_MAIL_DETAIL
} from '@/constants';
import _ from 'lodash';
// 初始状态
const initState={
  mailList: {},
  mailDetail: {},
}
// reducer
export function mailReducer(state=initState, action){
  switch(action.type){
    // 信件列表
    case SPACE_TIME_MAIL_LIST:
      return {...state,mailList:action.payload}
    // 信件详情
    case SPACE_TIME_MAIL_DETAIL:
      return {...state,mailDetail:action.payload}
    default:
      return state
  }
}
