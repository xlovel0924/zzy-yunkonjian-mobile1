import { MUBEILIST, TEXTLIST, TREELIST, ITEMSLIST, PHOTOLIST, MYDIYLIST, TAOCAN } from '@/constants';

// 初始状态
const initState = {
  muBeiList: [],
  textList: [],
  treeList: [],
  itemsList: [],
  photoList: [],
  myDiyList: [],
  taoCanList: []
}
// reducer
export function diyMuBei(state = initState, action) {
  switch (action.type) {
    case MUBEILIST:
      return { ...state, muBeiList: action.payload }
    case TEXTLIST:
      return { ...state, textList: action.payload }
    case TREELIST:
      return { ...state, treeList: action.payload }
    case ITEMSLIST:
      return { ...state, itemsList: action.payload }
    case PHOTOLIST:
      return { ...state, photoList: action.payload }
    case MYDIYLIST:
      return { ...state, myDiyList: action.payload }
    case TAOCAN:
      return { ...state, taoCanList: action.payload }
    default:
      return state
  }
}
