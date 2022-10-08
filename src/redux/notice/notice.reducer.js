
import { ALL_NOTICE, NOTICE_DETAIL,
} from '@/constants';
import _ from 'lodash';
// 初始状态
const initState={
  allNotice:[],
  noticeDetail:{},
}
// reducer
export function notice(state=initState, action){
  switch(action.type){
    case ALL_NOTICE:
      return {...state,allNotice:action.payload}
    case NOTICE_DETAIL:
      return {...state,noticeDetail:action.payload}
    default:
      return state
  }
}
