
import { AIS_HISTORY, SELECT_SHIP, HIDE_SHIPS, AIS_LIST, ARPA_LIST, TEST, TESTRADAR } from '@/constants';

// 初始状态

const initState={
  aisList:[],
  arpaList:[],
  aisHistory:[],
  selectShip:{},
  hideOtherShips:false,
  test:'',
  testRadar:'',
}
// reducer
export function ship(state=initState, action){
  switch(action.type){
    case AIS_HISTORY:
        return {...state,aisHistory:action.payload}
    case SELECT_SHIP:
      return {...state,selectShip:action.payload}
    case HIDE_SHIPS:
      return {...state,hideOtherShips:action.payload}
    case AIS_LIST:
      return {...state,aisList:action.payload}
    case ARPA_LIST:
      return {...state,arpaList:action.payload}
    case TEST:
      return {...state,test:action.payload}
    case TESTRADAR:
      return {...state,testRadar:action.payload}
    default:
        return state
  }
}
