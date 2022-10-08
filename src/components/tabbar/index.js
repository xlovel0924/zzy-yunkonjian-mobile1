import React, {Component} from 'react';
import BScroll from "@better-scroll/core";
import observeDom from "@better-scroll/observe-dom"
import { withRouter, Redirect } from 'react-router-dom'

import "./index.css"
@withRouter
class Index extends Component {
    constructor() {
        super();
        this.state = {
            active : '1'
        }
    }
    componentDidMount() {
        // setTimeout(() => {
        //     this.initScroll();
        // },500)
        this.getPathFn()
    }
    getPathFn = (path) => {
        let pathName = path?path:this.props.history.location.pathname
        if (pathName === '/index') {
            this.setState({
                active:'1'
            })
        } else if(pathName === '/user-self'){
            this.setState({
                active:'2'
            })
        }
    }
    // initScroll = () => {
    //     let sc = new BScroll('#wrapper',{
    //         click: true,
    //         tap: true
    //     });
    //     let wrapper = document.querySelector("#wrapper");
    //     let imgs = wrapper.querySelectorAll("img");
    //     // console.log(imgs)
    //     for(let img of imgs){
    //         img.onload = function () {
    //             // console.log("刷新")
    //             sc.refresh();
    //         }
    //     }
    // }
    navigatorTo = (url) => {
        
        this.getPathFn(url)
        this.props.history.push(url)
    }
    render() {
        return (
            <div className="tabbar" >

                <div className="tabbar-children">
                    <div className={this.state.active==='1'?'active':''} onClick={() => this.navigatorTo("/index")}>
                        <img src={require(`../../assets/img/index${this.state.active==='1'?'':'-noactive'}.png`)} alt=""/>
                        <div>首页</div>
                    </div>
                    <div className={this.state.active==='2'?'active':''} onClick={() => this.navigatorTo("/user-self")}>
                        <img src={require(`../../assets/img/self${this.state.active==='2'?'':'-noactive'}.png`)}/>
                        <div style={{whiteSpace:"nowrap"}}>个人中心</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;