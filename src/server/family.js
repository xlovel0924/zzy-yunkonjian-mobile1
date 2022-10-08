import axios from 'axios';
import { smallOwnersUrl, YZPAGE,BASE_URL_STATIC,YZMESSAGE } from './service';


// 获取微信签名
export function getWXSign(data) {
    return axios.post(smallOwnersUrl(`${YZMESSAGE}personnel/sms/getWXSign`),data);
}

// 文本审核
export function textReview(data) {
    return axios.post(`${BASE_URL_STATIC}PhotoStudio/textReview`,data);
}

// 追根溯源历史记录
export function queryTheirRootRecordByMemberId(data) {
    return axios.get(smallOwnersUrl(`${YZPAGE}genealogy/tTheirRootRecord/queryTheirRootRecordByMemberId/${data.id}`));
}

// 查询默认头像
export function queryTAvatarConditionAxios(data) {
    return axios.post(smallOwnersUrl(`${YZPAGE}genealogy/tAvatar/queryTAvatarCondition`), data);
}

// 查询家徽
export function queryFamilyCrestAxios(data) {
    return axios.post(smallOwnersUrl(`${YZPAGE}genealogy/tFamilyCrest/queryFamilyCrest`), data);
}

// 追根溯源搜索记录插入
export function addRootSearchAxios(data) {
    return axios.post(smallOwnersUrl(`${YZPAGE}genealogy/tTheirRootRecord/add`), data);
}

// 根据id查找家族轶事
export function getHistoriesById(data) {
    return axios.get(smallOwnersUrl(`${YZPAGE}genealogy/tAnecdote/get/${data.id}`));
}

// 根据id查找家训
export function getPreceptsById(data) {
    return axios.get(smallOwnersUrl(`${YZPAGE}genealogy/tHomeTraining/get/${data.id}`));
}

// 根据id查找纪要
export function getMinutesById(data) {
    return axios.get(smallOwnersUrl(`${YZPAGE}genealogy/tSummary/get/${data.id}`));
}

// 修改家族轶事
export function updateHistoriesAxios(data) {
    return axios.post(smallOwnersUrl(YZPAGE + 'genealogy/tAnecdote/update'), data);
}

// 修改家训
export function updatePreceptsAxios(data) {
    return axios.post(smallOwnersUrl(YZPAGE + 'genealogy/tHomeTraining/update'), data);
}

// 修改纪要
export function updateMinutesAxios(data) {
    return axios.post(smallOwnersUrl(YZPAGE + 'genealogy/tSummary/update'), data);
}

// 添加家族轶事
export function createFamilyHistoryAxios(data) {
    return axios.post(smallOwnersUrl(YZPAGE + 'genealogy/tAnecdote/add'), data);
}

// 添加家风家训
export function createFamilyPrecepts(data) {
    return axios.post(smallOwnersUrl(YZPAGE + 'genealogy/tHomeTraining/add'), data);
}

// 添加家族纪要
export function createFamilyMinutes(data) {
    return axios.post(smallOwnersUrl(YZPAGE + 'genealogy/tSummary/add'), data);
}

// 通过家谱id查家族轶事
export function queryAnecdoteByGenealogyIdAxios(data) {
    return axios.get(smallOwnersUrl(`${YZPAGE}genealogy/tAnecdote/queryAnecdoteByGenealogyId/${data.id}`));
}

// 根据人员id查跟他有关系的人信息
export function queryRelationshipByMemberIdAxios(data) {
    return axios.get(smallOwnersUrl(`${YZPAGE}genealogy/tMemberGenealogy/queryRelationshipByMemberId/${data.id}`));
}

// 通过家谱id查家训
export function queryHomeTrainingByGenealogyIdAxios(data) {
    return axios.get(smallOwnersUrl(`${YZPAGE}genealogy/tHomeTraining/queryHomeTrainingByGenealogyId/${data.id}`));
}

// 根据家谱id查询家族纪要
export function querySummaryByGenealogyIdAxios(data) {
    return axios.get(smallOwnersUrl(`${YZPAGE}genealogy/tSummary/querySummaryByGenealogyId/${data.id}`));
}

// 追根溯源列表
export function queryTheirRootAllAxios(data) {
    return axios.post(smallOwnersUrl(YZPAGE + "genealogy/tTheirRoot/queryTheirRoot"), data);
    // return axios({
    //     url: smallOwnersUrl("genealogy/tTheirRoot/queryTheirRootAll"),
    //     method: "POST",
    //     data: JSON.stringify(data)
    // })
}

// 创建家谱
export function createFamilyAxios(data) {
    return axios.post(smallOwnersUrl(YZPAGE + 'genealogy/tGenealogy/add'), data);
}

// 更新家谱
export function editFamilyAxios(data) {
    return axios.post(smallOwnersUrl(YZPAGE + 'genealogy/tGenealogy/update'), data);
}

// 查询家谱
export function GenealogyByFamilyIdAxios(data) {
    return axios.get(smallOwnersUrl(`${YZPAGE}genealogy/tGenealogy/GenealogyByFamilyId/${data.id}`));
}

// 根据家谱id查询关注人信息
export function queryConcernMemberIdAxios(data) {
    return axios.get(smallOwnersUrl(`${YZPAGE}genealogy/tGenealogyConcern/queryConcernMemberId/${data.id}`));
}

// 关注状态更新
export function updateConcernAxios(data) {
    console.log(data, "data")
    return axios.post(smallOwnersUrl(`${YZPAGE}genealogy/tGenealogyConcern/update`), data);
}

// 许愿祈福列表
export function queryBlessingGoodsListAxios(data) {
    console.log(data, "data")
    return axios.post(smallOwnersUrl(`${YZPAGE}cloudSacrificeSweep/tBlessingGoods/queryBlessingGoodsList`));
}

// 根据父亲查儿子
export function queryMemberGenealogySonAxios(data) {
    return axios.get(smallOwnersUrl(`${YZPAGE}genealogy/tMemberGenealogy/queryMemberGenealogySon/${data.id}`));
}

// 根据父亲查妻子
export function queryMemberGenealogyWifeAxios(data) {
    return axios.get(smallOwnersUrl(`${YZPAGE}genealogy/tMemberGenealogy/queryMemberGenealogyWife/${data.id}`));
}

// 人员关系修改
export function updateAxios(data) {
    return axios.post(smallOwnersUrl(`genealogy/tMemberGenealogy/update`), data);
}

// 根据id查询人员信息
export function getMemberInfoAxios(data) {
    return axios.post(smallOwnersUrl(`${YZPAGE}genealogy/tMemberGenealogy/genealogyMemberList`), data);
}

// 删除关注
export function deleteAxios(data) {
    return axios({
        method: "get",
        url: smallOwnersUrl(`${YZPAGE}genealogy/tGenealogyConcern/delete`),
        params: {
            id: data.id
        }
    })
}

// 添加关注
export function addConcerAxios(data) {
    return axios.post(smallOwnersUrl(`${YZPAGE}genealogy/tGenealogyConcern/add`), data);
}

// 已经关注的家谱
export function queryConcernGenealogyAxios(data) {
    return axios.get(smallOwnersUrl(`${YZPAGE}genealogy/tGenealogyConcern/queryConcernGenealogy/${data.id}`));
}

// 根据条件查家谱（家谱列表）
export function queryGenealogyConditionAxios(data) {
    return axios.post(smallOwnersUrl(`${YZPAGE}genealogy/tGenealogy/queryGenealogyCondition`), data)
}

// 根据用户id查家谱(后期要换)
export function GenealogyByMemberIdAxios(data) {
    return axios.get(smallOwnersUrl(`${YZPAGE}genealogy/tGenealogy/GenealogyByMemberId/${data.id}`));
}

// 通过家谱id查家谱人员
export function queryGenealogyMemberAxios(data) {
    return axios.get(smallOwnersUrl(`${YZPAGE}genealogy/tMemberGenealogy/queryFamilyGenealogy/${data.id}`));
}

// 添加家谱成员
export function tMemberGenealogyAddAxios(data) {
    return axios.post(smallOwnersUrl(`${YZPAGE}genealogy/tMemberGenealogy/add`), data);
}

// 添加家谱成员(自定义)
export function addCustomizationAxios(data) {
    return axios.post(smallOwnersUrl(`${YZPAGE}genealogy/tMemberGenealogy/addCustomization`), data);
}


// 家谱世代查询
export function queryGenealogyMemberListAxios(data) {
    return axios.get(smallOwnersUrl(`${YZPAGE}genealogy/tMemberGenealogy/queryGenealogyMember/${data.id}`));
}



// 根据用户查家庭
export function queryFamilyAxios(data) {
    return axios.get(smallOwnersUrl(`${YZPAGE}genealogy/tMemberGenealogy/queryFamily/${data.id}`));
}

// 查询所有香列表  
export function queryInsenseTypeAxios() {
    return axios.post(smallOwnersUrl(`${YZPAGE}cloudSacrificeSweep/tFragrant/queryFragrant`, {}));
}


// 查询所有香炉列表  
export function queryAllIncenseBurnerAxios() {
    return axios.post(smallOwnersUrl(`${YZPAGE}cloudSacrificeSweep/tIncenseBurner/queryIncenseBurner`, {}));
}


// 提交上香
export function submitIncenseAxios(data) {
    return axios.post(smallOwnersUrl(`${YZPAGE}cloudSacrificeSweep/tIncense/add`), data)
}


// 根据族谱和用户id查询上香状态
export function queryIncenseAxios(data) {
    return axios.post(smallOwnersUrl(`${YZPAGE}cloudSacrificeSweep/tIncense/queryIncense`), data)
}

// 查询名人家训
export function LookCelebrityFamilyTraining(data) {
    return axios.post(smallOwnersUrl(`${YZPAGE}genealogy/tHomeTraining/queryConditionTHomeTraining`), data)
}

// 根据id查询名人详情
export function ApiCelebrityDetails(id) {
    return axios.get(smallOwnersUrl(`${YZPAGE}genealogy/tHomeTraining/get/${id}`))
}

// 添加我的家训
export function ApiAddMyFmaily(data) {
    return axios.post(smallOwnersUrl(`${YZPAGE}genealogy/tHomeTraining/add`), data)
}