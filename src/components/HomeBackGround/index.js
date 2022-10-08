import React, {Component, createRef} from 'react';

import BScroll from "@better-scroll/core";
import observeDom from "@better-scroll/observe-dom"
import { withRouter, Redirect } from 'react-router-dom'

import "./index.css"

// const backgroundRef = React.createRef();

@withRouter 
class Index extends Component {
    constructor() {
        super();
        this.state = {
            height: 0
        }
        this.backgroundRef = React.createRef()
    }

    componentDidMount() {
        setTimeout(() => { 
            if (this.backgroundRef && this.backgroundRef.current){
                this.initScroll();
            }
        },500)
    }

    initScroll = () => {
        console.log(this.props.location.pathname)
        const pathname = this.props.location.pathname;
        const whiteContent = ["/","/index","/user-self"];
        console.log(this.backgroundRef,"height")
        this.setState({
            height: whiteContent.includes(pathname) ? this.backgroundRef.current.clientHeight - 110 : this.backgroundRef.current.clientHeight - 40
        },() => {
            let sc = new BScroll('#wrapper',{
                click: true,
                tap: true
            });
            let wrapper = document.querySelector("#wrapper");
            let imgs = wrapper.querySelectorAll("img");
            // console.log(imgs)
            for(let img of imgs){
                img.onload = function () {
                    console.log("刷新")
                    sc.refresh();
                }
            } 
        });

    }

    render() {
        return (
            <div className="home-background" ref={this.backgroundRef}>
                <div id="wrapper"  style={{
                    height: this.state.height + "px",
                    overflowY: "hidden",
                    boxSizing: "border-box"
                }}>
                    <div >
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;