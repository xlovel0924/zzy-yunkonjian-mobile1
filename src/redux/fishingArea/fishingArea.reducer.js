import { FISHINGAREA_LIST } from '@/constants';

// εε§ηΆζ
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
