import axios from 'axios';
import { Toast } from 'antd-mobile';
import { isShow } from "./redux/index/index.action"
import { store } from "./index";

// 拦截请求
axios.interceptors.request.use(function (config) {
    // Toast.loading('加载中', 6);
    let token = window.localStorage.getItem("token");
    if (token) {
        config.headers = {
            "Authorization": token
        }
    }

    return config;
})


// 拦截响应
axios.interceptors.response.use(function (config) {
    // Toast.hide();
    return config;
}, function (err) {
    if (err && err.response) {
        if (err.response.status == "401") {
            store.dispatch(isShow(true))
            window.localStorage.removeItem("token");
            // window.location.href = "/index"
        }
    }
    return Promise.reject(err)

})
