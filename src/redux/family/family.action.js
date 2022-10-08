import { Toast } from 'antd-mobile';
import _ from 'lodash';
import {SON_LIST,CONCER_FAMILY_LIST,CONDITION_FAMILY_LIST, ERROR_MSG,SUCCESS_MSG,FAMILY,FAMILY_LIST,CREATE_FAMILY,EDIT_FAMILY_LIST,ALLINCENSEBURNER,INSENSETYPE,INSENSELIST,
    QUERY_GENEALOGY_MEMBER,ADD_MEMBER,MEMBER_LIST,FAMILY_LIST_BY_MEMBER_ID,WIFE_LIST,MEMBER_INFO,CONCERN_INFO,BLESSINGS,SELECT_PEOPLE_INFO,COPY_DATA_INFO,SELECT_AVATAR,
    TEXT_REVIEW
} from '@/constants';
import {
    createFamilyAxios,GenealogyByFamilyIdAxios,
    queryFamilyAxios,editFamilyAxios,
    queryGenealogyMemberAxios,tMemberGenealogyAddAxios,
    queryGenealogyMemberListAxios,GenealogyByMemberIdAxios,
    queryGenealogyConditionAxios,queryConcernGenealogyAxios,
    addConcerAxios,deleteAxios,queryMemberGenealogySonAxios,
    queryMemberGenealogyWifeAxios,updateAxios,
    getMemberInfoAxios,queryConcernMemberIdAxios,
    updateConcernAxios,queryBlessingGoodsListAxios,
    queryAllIncenseBurnerAxios,
    submitIncenseAxios,textReview,
    queryInsenseTypeAxios,
    queryIncenseAxios,
} from './../../server/family';

// 文本审核
export function textReviewAxios(data) {
    return async dispatch => {
        let value = [];
        for (let key in data){
            // value += JSON.stringify(data[key]);
            value.push(JSON.stringify(data[key]));
        }
        value = value.join("。");
        console.log(value,"value")
        let res = await textReview({base64Text: value});
        console.log(res,"RES")
        dispatch({type: TEXT_REVIEW, payload: res.data.data})
    }
}

// 错误信息提示
function errorMsg(message){
    Toast.info(message, 1.5);
    return {message, type:ERROR_MSG}
}

// 成功信息提示
function successMsg(payload){
    return {type:SUCCESS_MSG, payload}
}

// 添加姓名时选择人信息
export function selectPeopleInfo(info) {
    return async dispatch => {
        dispatch({type: SELECT_PEOPLE_INFO, payload: info})
    }
}

// 备份添加数据
export function copyDataInfo(data) {
    return async dispatch => {
        dispatch({type: COPY_DATA_INFO, payload: data})
    }
}

// 根据家谱id查询关注人信息
export function queryConcernMemberId(params) {
    return async dispatch => {
        let res = await queryConcernMemberIdAxios(params);
        if (res.status === 200){
            dispatch({type: CONCERN_INFO, payload: res.data})
        } else {
            dispatch(errorMsg(res.data.message))
        }
    }
}

// 关注人信息更新
export function updateConcern(params) {
    return async dispatch => {
        let res = await updateConcernAxios(params);
        if (res.data.status == 200){
            dispatch(successMsg(res.data))
        } else {
            dispatch(errorMsg(res.data.message))
        }
    }
}

// 选择头像
export function selectAvatar(url) {
    return async dispatch => {
        dispatch({type: SELECT_AVATAR, payload: url})
    }
}

// 根据id查询人员信息
export function getMemberInfo(params) {
    return async dispatch => {
        let res = await getMemberInfoAxios(params);
        if (res.data.status === 200){
            dispatch({type: MEMBER_INFO, payload: res.data})
        } else {
            dispatch(errorMsg(res.data.message))
        }
    }
}

// 修改人员信息
export function updateInfo(params) {
    return async dispatch => {
        let res = await updateAxios(params)
        if (res.data.status === 200){
            dispatch(successMsg(res.data))
        } else {
            dispatch(errorMsg(res.data.message))
        }
    }
}

// 删除关注
export function deleteConcer(params){
    console.log(params,"params")

    return async dispatch => {
        let res = await deleteAxios(params); 
        if(res.data.status === 200){
            dispatch(successMsg(res.data))
        } else {
            dispatch(errorMsg(res.data.message))
        }
    }
}
// 添加关注
export function addConcer(params) {
    return async dispatch => {
        let res = await addConcerAxios(params);
        if (res.data.status == 200){
            dispatch(successMsg(res))
        } else {
            dispatch(errorMsg(res.data.message))
        }
        
    }
}

// 根据用户id查家谱（后期要换）
export function GenealogyByMemberId(params) {
    return async dispatch => {
        console.log(params,"params")
        const res = await GenealogyByMemberIdAxios(params);
        if (res.data.status === 200) {
            console.log("200")
            dispatch({type: FAMILY_LIST_BY_MEMBER_ID, payload: res.data})
        } else {
            console.log("不是200")
            dispatch(errorMsg(res.data.message))
        }
    }
}

// 根据父亲id查儿子
export function queryMemberGenealogySon(params) {
    return async dispatch => {
        let res = await queryMemberGenealogySonAxios(params);
        if (res.data.status === 200){
            dispatch({type: SON_LIST, payload: res.data});
        } else {
            dispatch(errorMsg(res.data.message));
        }
    }
}

// 根据父亲查妻子
export function queryMemberGenealogyWife(params) {
    return async dispatch => {
        let res = await queryMemberGenealogyWifeAxios(params);
        if (res.data.status === 200){
            dispatch({type: WIFE_LIST, payload: res.data});
        } else {
            dispatch(errorMsg(res.data.message));
        }
    }
}

// 关注的家谱
export function queryConcernGenealogy(params) {
    return async dispatch => {
        const res = await queryConcernGenealogyAxios(params)
        if (res.data.status === 200){
            dispatch({type: CONCER_FAMILY_LIST, payload: res.data})
        } else {
            dispatch(errorMsg(res.data.message))
        }
    }
}

// 根据条件查家谱（家谱列表）
export function queryGenealogyCondition(params) {
    return async dispatch => {
        const res = await queryGenealogyConditionAxios(params);
        if (res.data.status === 200){
            dispatch({type: CONDITION_FAMILY_LIST, payload: res.data})
        } else {
            dispatch(errorMsg(res.data.message))
        }
    }
}

// 家谱世代查询
export function queryGenealogyMemberList(params) {
    return async dispatch => {
        const res = await queryGenealogyMemberListAxios(params)
        if (res.data.status === 200) {
            dispatch({type: MEMBER_LIST, payload: res.data})
        } else {
            dispatch(errorMsg(res.data.message))
        }
    }
}
// 添加家谱人员
export function tMemberGenealogyAdd(params) {
    return async dispatch => {
        const res = await tMemberGenealogyAddAxios(params);
        if (res.data.status === 200) {
            dispatch({type: ADD_MEMBER,payload: res.data})
        } else {
            dispatch(errorMsg(res.data.message))
        }
    }
}

// 创建家谱
export function createFamily(params) {
    return async dispatch => {
        try {
            const res = await createFamilyAxios(params);
            console.log(res,"res")
            if (res.data.status === 200) {
                dispatch({type:CREATE_FAMILY, payload: res})
            } else {
                dispatch(errorMsg(res.data.message))
            }
        } catch (e) {
            dispatch(errorMsg("创建失败"))
        }
    }
}

// 修改家谱
export function editFamily(params) {
    return async dispatch => {
        const res = await editFamilyAxios(params);
        if (res.data.status === 200){
            dispatch({type: EDIT_FAMILY_LIST,payload: res.data})
        } else {
            dispatch(errorMsg(res.data.message))
        }
    }
}
// 查询家谱
export function familyList(params) {
    return async dispatch => {
        console.log(params,"actionParams")
        const res = await GenealogyByFamilyIdAxios(params);
        console.log("res")
        if (res.status === 200){
            dispatch({type: FAMILY_LIST,payload: res.data})
        } else {
            dispatch(errorMsg(res.message))
        }
    }
}

// 根据用户id查家庭
export function queryFamily(params) {
    return async dispatch => {
        const res = await queryFamilyAxios(params);
        console.log("res")
        if (res.status === 200){
            dispatch({type:FAMILY,payload: res.data})
        } else {
            dispatch(errorMsg(res.message))
        }
    }
}

// 家谱世代查询
export function queryGenealogyMember(params) {
    return async dispatch => {
        const res = await queryGenealogyMemberAxios(params)

        if (res.data.status === 200){
            dispatch({type:QUERY_GENEALOGY_MEMBER, payload: res.data})
        } else {
            dispatch(errorMsg(res.data.message))
        }
    }
}

// 许愿祈福列表
export function queryBlessingGoodsList() {
    return async dispatch => {
        let res = await queryBlessingGoodsListAxios();
        if (res.data.status === 200) {
            dispatch({type: BLESSINGS, payload: res.data})
        } else {
            dispatch(errorMsg(res.data.message))
        }
    }
}


// 请求所有香类型
export function queryInsenseType() {
    return async dispatch => {
        let res = await queryInsenseTypeAxios();
        if (res.data.status === 200) {
            dispatch({type: INSENSETYPE, payload: res.data})
        } else {
            dispatch(errorMsg(res.data.message))
        }
    }
}

// 请求所有香炉
export function queryAllIncenseBurner() {
    return async dispatch => {
        let res = await queryAllIncenseBurnerAxios();
        if (res.data.status === 200) {
            dispatch({type: ALLINCENSEBURNER, payload: res.data})
        } else {
            dispatch(errorMsg(res.data.message))
        }
    }
}


// 上香提交
export function submitIncense(data) {
    return async dispatch => {
        let res = await submitIncenseAxios(data);
        if (res.data.status === 200) {
        } else {
            dispatch(errorMsg(res.data.message))
        }
    }
}

// 根据族谱和用户id查询上香状态
export function queryIncense(data) {
    return async dispatch => {
        let res = await queryIncenseAxios(data);
        if (res.data.status === 200) {
            dispatch({type: INSENSELIST, payload: res.data})
        } else {
            dispatch(errorMsg(res.data.message))
        }
    }
}



