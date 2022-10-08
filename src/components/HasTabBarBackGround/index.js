import React, { Component } from 'react';
import BScroll from '@better-scroll/core';

export class HasTabBarBackGround extends Component {

    componentDidMount() {
        setTimeout(() => {
            let sc = new BScroll("#wrapper", {
                click: true,
                tap: true
            })
        }, 500);
    }

    render() {
        return (
            <div className='has-tab-bar-background'>
                <div id="wrapper" style={{
                    height: window.innerHeight - 110,
                    boxSizing: "border-box",
                    overflow: "hidden",
                    paddingBottom:"200px"
                }}>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default HasTabBarBackGround