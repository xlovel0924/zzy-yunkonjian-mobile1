import axios from "axios";
// 修改密码用到此URL
// export const BASE_URL = "http://222.71.180.195:28004/" //
// export const BASE_URL = "http://192.168.10.175:8003/"  // 张力登录
// export const BASE_URL = "http://192.168.10.175:28002/" //张力本地

export const BASE_URL = "http://222.71.180.195:28002/" //远程


// export const BASE_URL = "http://222.71.180.195:8001/" //预约
// export const BASE_URL = "http://192.168.10.139:8030/" //王博文本地

// export const BASE_URL = "http://192.168.10.215:8002/" //王忠兵本地
// export const BASE_URL_STATIC = "http://192.168.10.139:8001/" //王博文静态本地

// export const BASE_URL_STATIC = "http://222.71.180.195:8030/"  // 王忠兵远程静态文件地址
// export const BASE_URL_STATIC = "http://192.168.10.215:8001/"  // 王忠兵静态文件地址
export const BASE_URL_STATIC = "http://222.71.180.195:28001/"  // 远程静态文件地址
// export const BASE_URL_STATIC = "http://192.168.10.139:8030/"  // 王博文静态文件地址


// export const BASE_URL_STATIC = "http://192.168.10.78:8030/"  // 张力静态文件地址

export const smallOwnersUrl = (url) => {
  return BASE_URL + url;
}

export const localIp = "http://192.168.10.102:3001/#"



// 登录
export const LOGINPRE = "yz/login/";
// 普通接口
export const YZPAGE = "yz/ykj/";
// message
export const YZMESSAGE = "yz/message/";

// 预约
export const YZFront = 'yz/frontapi/';

// 文件
export const YZFILE = "yz/file/";

export const token = '0912d1dfa3a84cf33acdf52e305abe1f33acdf52e3050a3a8912d4cfa1be1fdf';