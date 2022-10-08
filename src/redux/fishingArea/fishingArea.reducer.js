import { FISHINGAREA_LIST } from '@/constants';

// 初始状态
const initState={
  fishingAreaList:{},
}
// reducer
export function fishing(state=initState, action){
  switch(action.type){
    case FISHINGAREA_LIST:
        return {...state,fishingAreaList:action.payload}
    default:
        return state
  }
}
