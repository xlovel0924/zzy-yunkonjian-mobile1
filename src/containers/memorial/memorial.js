// 云纪念馆
import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import Form from '@/components/form';
import {InputItem} from "antd-mobile";
import BScroll from "@better-scroll/core";
import Nav from "@/components/nav/nav";
import banner from "@/assets/img/yun-home/banner.png";

import "./memorial.css";
const itemBoxRef = React.createRef();
@Form
@withRouter
class CloundService extends Component {
    constructor() {
        super();
        this.state = {
            active: 1,                        //选中
        };
        this.establish = [
            { titles: 'titles', side: 'side', distance: 'distance', },
            { titles: 'titles',side: 'side',distance: 'distance', },
            { titles: 'titles',side: 'side',distance: 'distance', },
            { titles: 'titles',side: 'side',distance: 'distance', },
            { titles: 'titles',side: 'side',distance: 'distance', },
            { titles: 'titles',side: 'side',distance: 'distance', },
        ];    //创建
        this.follow = [{ name: '22' }];       //关注
        this.collection = [{ name: '33' }];   //收藏
    }
    navigatorTo = (url) => {
           
    }
    render() {
        return (
            <div className="memorial-home webkit-home">
                <div className="nav-position">
                    <Nav ellipsisIsShow={false} title="云纪念馆" />
                </div>
                <div className='nav-plhace'></div>
                <div className='top-img'>
                    <img style={{ width: "100%" }} src={banner} alt=""/>
                </div>
                <div className='memorial-tab'>
                    <div className={this.state.active===1?'active item':'item'} onClick={() => {this.setState({active:1})}}>
                        我创建的馆
                    </div>
                    <div className={this.state.active===2?'active item':'item'} onClick={() => {this.setState({active:2})}}>
                        我关注的馆
                    </div>
                    <div className={this.state.active===3?'active item':'item'} onClick={() => {this.setState({active:3})}}>
                        家庭纪念馆
                    </div>
                </div>
                <div className='memorial-con'>
                        <div ref={itemBoxRef} className='item-box webkit-home' style={{display:(this.state.active === 1)?'flex':'none'}}>
                            {
                                this.establish.map((item,index) => (
                                    <div className='item' key={item.titles+index}>
                                        <div className='img'>
                                            <img src={banner} alt="" />
                                        </div>
                                        <div className='right'>
                                            <div className='titles'>{item.titles}</div>
                                            <div className='side'>{item.side}</div>
                                            <div className='distance'>距离您{item.distance}km</div>
                                        </div>
                                        <div className='icons'>  </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='item-box' style={{display:(this.state.active === 2)?'flex':'none'}}>
                            <div className='item'>
                                <div className='img'>
                                    <img src={banner} alt=""/>
                                </div>
                                <div className='right'>
                                    <div className='titles'>上海王代铭纪念馆</div>
                                    <div className='side'>上海青浦区顺昌路2222弄55号</div>
                                    <div className='distance'>距离您1.24km</div>
                                </div>
                                <div className='icons'> > </div>
                            </div>
                        </div>
                        <div className='item-box' style={{display:(this.state.active === 3)?'flex':'none'}}>
                            <div className='item'>
                                <div className='img'>
                                    <img src={banner} alt=""/>
                                </div>
                                <div className='right'>
                                    <div className='titles'>上海王代铭纪念馆</div>
                                    <div className='side'>上海青浦区顺昌路2222弄55号</div>
                                    <div className='distance'>距离您1.24km</div>
                                </div>
                                <div className='icons'> > </div>
                            </div>
                        </div>
                </div>
                
            </div>
        );
    }
}

export default CloundService;