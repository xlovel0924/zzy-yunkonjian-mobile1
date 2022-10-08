import React, { Component } from 'react'
// 过度效果
import AnimatedRouter from 'react-animated-router'
import 'react-animated-router/animate.css'


import LoginRoute from './../components/loginRoute';
import { withRouter } from 'react-router-dom';
import { showTabbar } from '@/utils';
import { connect } from 'react-redux';
import { isShow } from "../redux/index/index.action"
import Tabbar from "../components/tabbar"
import Login from './user/login'
import Intercept from './intercept';
import routerMap from './routerMap';
import { Prompt } from 'react-router-dom';

@connect(
  state => ({indexReducer: state.indexReducer}),
  null
)
@withRouter
class Containers extends Component {
    isMobile = () => {
        console.log(navigator.userAgent,"user")
        return navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        );
    }
    componentDidMount() {

// 如果不是我们则认为是pc端
        if (!this.isMobile()) {
            let html = document.querySelector("html");
            let body = document.querySelector("body");
            // 设置为 50px, 为什么不是100px, 因为实际开发时都是二倍图，所以写50px;
            html.style.fontSize = "50px";
            // 页面始终为一屏高
            html.style.height = "100vh";
            // 使body居中
            html.style.display = "flex";
            html.style.justifyContent = "center";
            html.style.alignItems = "center";
            html.style.overflow = "hidden";
            // 固定宽度
            body.style.width = "750px";
            // 固定高度
            // body.style.height = "812px";
            // 加个阴影点缀一下。
            body.style.boxShadow = "0 0 20px rgba(0, 0, 0, .5)";
            // 最后重点：pc端fixed定位,修正为body, 而不是视口
            body.style.transform = "translate(0)";
        }

    }

    render() {

    let pathname = this.props.location.pathname
    // if (pathname === '/') {
    //   pathname = '/index'
    // }
    const show = (showTabbar.indexOf(pathname) >= 0)
     
    
    return (
      <div className='r-index'>
        <LoginRoute></LoginRoute>
        <AnimatedRouter>
          <Intercept routerMap={routerMap} />
        </AnimatedRouter>
        {show ? <Tabbar ></Tabbar> : ''} 
         {this.props.indexReducer.flag && <Login />}
      </div>
    )
  }
}

export default Containers;
