import {queryGenealogyConditionAxios,GenealogyByMemberIdAxios} from "@/server/family";

// 关系类型转义
export function getAddRelation(type) {
    switch (type) {
        case "0":
            return "母亲"
        case "1":
            return "父亲"
        case "2":
            return "妻子"
        case "3":
            return "哥哥"
        case "4":
            return "弟弟"
        case "5":
            return "姐姐"
        case "6":
            return "妹妹"
        case "7":
            return "儿女"
        case "-1":
            return "兄弟姐妹"
        case "-2":
            return "其他"
        default:
            return ""
    }
}

// 辈分转义
export function getReproductive(type) {
    switch (type) {
        case "9":
            return "鼻祖辈"
        case "8":
            return "远祖辈"
        case "7":
            return "太祖辈"
        case "6":
            return "烈祖辈"
        case "5":
            return "天祖辈"
        case "4":
            return "高祖辈"
        case "3":
            return "曾祖辈"
        case "2":
            return "祖父辈"
        case "1":
            return "父辈"
        case "0":
            return "同辈"
        case "-1":
            return "子辈"
        case "-2":
            return "孙辈"
        case "-3":
            return "曾孙辈"
        case "-4":
            return "玄孙辈"
        case "-5":
            return "来孙辈"
        case "-6":
            return "晜孙辈"
        case "-7":
            return "仍孙辈"
        case "-8":
            return "云孙辈"
        case "-9":
            return "耳孙辈"
        default:
            return ""
    }
}

// 当前家谱是否是当前用户创建
export async function getAllfamilyById(userId, genId) {

    let res = await GenealogyByMemberIdAxios({id: userId})

    if (res.data.status == 200) {
        let allFamily = res.data.data;
        let ids = allFamily.map(element => {
            return element.id
        })
        console.log(userId,"userId");
        console.log(genId," genId");
        console.log(ids," idsss@@")
        console.log(ids.includes(genId), "ids");
        return ids.includes(genId);
    }

}