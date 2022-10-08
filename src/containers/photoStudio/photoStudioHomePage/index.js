import React, { Component } from 'react';
import "./index.css"
import Nav from "../../../components/nav/nav";

import jinru from '@/assets/img/yun-photo/home-go.png'
import title from "@/assets/img/yun-photo/title.png";
import enterIcon from '@/assets/img/enter-icon.png'

import { withRouter } from "react-router-dom";

@withRouter
class Index extends Component {

    navigatorTo = (url) => {
        this.props.history.push(url)
    }

    render() {
        return (
            <div className="photo-studio-home-page">
                <Nav ellipsisIsShow={false} />
                <div className='photo-content'>
                    <div className="title-img">
                        <img src={title} alt="" />
                        <div>至/尊/新/科/技 怀/念/旧/时/光</div>
                    </div>
                    <div className='go'>
                        <img src={enterIcon} alt=""  onClick={() => this.navigatorTo("/photo-enternal")} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;