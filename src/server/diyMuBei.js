// import qs from 'qs';
import axios from 'axios';
import { smallOwnersUrl } from './service';

// 根据产品类目查询产品
export function fetchMuBeiAxios(data){
    return axios.post(smallOwnersUrl('commodity/product/queryProductByType'),data);
}

// 套餐分页
export function fetchTaoCanListAxios(data){
    return axios.post(smallOwnersUrl('commodity/comboMeal/page'),data);
}

// 搜索公司全部套餐

export function fetchAllCompnyTaoCanListAxios(){
    return axios.get(smallOwnersUrl(`commodity/comboMeal/selectAllComboMealByCompany`));
}

// 我的方案分页
export function fetchMyDiyListAxios(data){
    return axios.post(smallOwnersUrl('commodity/comboMeal/selectAllComboMealByPersonnel'),data);
}

// 保存我的方案
export function saveMyDiyAxios(data){
    return axios.post(smallOwnersUrl('commodity/comboMeal/add'),data);
}

// 删除我的方案
export function deleteMyDiyAxios(data){
    return axios.get(smallOwnersUrl(`commodity/comboMeal/delete?id=${data.id}`));
}


 