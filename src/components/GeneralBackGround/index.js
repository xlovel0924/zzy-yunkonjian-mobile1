import React, { Component } from 'react';
import BScroll from '@better-scroll/core';

export class GeneralBackGround extends Component {

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
            <div className='general-background'>
                <div id="wrapper" style={{
                    height: window.innerHeight,
                    boxSizing: "border-box",
                    paddingBottom:"100px"
                }}>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default GeneralBackGround