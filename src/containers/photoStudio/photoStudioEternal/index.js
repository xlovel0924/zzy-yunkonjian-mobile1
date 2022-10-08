import React, { Component, Fragment } from "react";
import Nav from "../../../components/nav/nav";
import Icon from '@/assets/img/yun-photo/right.png';
import './index.css';

import { withRouter } from 'react-router-dom'

@withRouter
class Enternal extends Component {
    state = {
        arr: [
            { title: "老照片修复", img: require('../../../assets/img/yun-photo/enternal-icon1.png'), url: "/old-photo-processing" },
            { title: "3D照片制作", img: require('../../../assets/img/yun-photo/enternal-icon2.png'), url: "/photo-three-production" },
            { title: "人生微电影", img: require('../../../assets/img/yun-photo/enternal-icon3.png'), url: "/life-micro-film" }
        ]
    }

    navigatorTo = (url) => {
        this.props.history.push(url)
    }
    render() {
        return (
            <div className="photo-studio-enternal">
                {/* nav */}
                <div className="enternal">
                    <Nav title="永恒照相馆" ellipsisIsShow={false} />
                    <div className="enternal-content">
                        {this.state.arr.map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    <div className="item" onClick={() => this.navigatorTo(item.url)} >
                                        <img className="left" src={item.img} />
                                        <div className="right">
                                            <span>{item.title}</span>
                                            <img src={Icon} alt=""/>
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        })}

                    </div>
                </div>
            </div>
        )
    }
}

export default Enternal;