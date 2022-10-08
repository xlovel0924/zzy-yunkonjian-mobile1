// 云服务
import React, { Component, Fragment } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import Form from '@/components/form';
import { InputItem } from "antd-mobile";
import BScroll from "@better-scroll/core";
import Tabbar from "@/components/tabbar"
import Nav from "@/components/nav/nav";
import banner from "@/assets/img/yun-home/banner.png";
import right from '@/assets/img/user-self/right.png';
import "./cloudService.css";
import { cloudService } from '../../server/cloud';
import GeneralBackGround from '../../components/GeneralBackGround';

const tabbarRef = React.createRef();

@Form
@withRouter
class CloundService extends Component {
    state = {
        arr: [
            { title: '骨灰寄存', url: require('../../assets/img/cloud-service/service-item1.png') },
            { title: '预约落葬', url: require('../../assets/img/cloud-service/service-item2.png') },
            { title: '代客描漆', url: require('../../assets/img/cloud-service/service-item3.png') },
            { title: '碑文瓷像', url: require('../../assets/img/cloud-service/service-item4.png') },
            { title: '老墓改建', url: require('../../assets/img/cloud-service/service-item5.png') },
            { title: '盆花租摆', url: require('../../assets/img/cloud-service/service-item6.png') },
        ]
    }

    getServiceUrl = (item) => {
        cloudService(item.title).then(res => {
            console.log(res)
            if (res.status === 200) {
                window.open(res.data.data.serviceUrl, "_self");
            }
        })
    }

    render() {
        return (
            <div className="clound-home">
                <GeneralBackGround>
                    <div>
                        <div className="service-title">
                            <Nav title="自助办理" ellipsisIsShow={false} />
                        </div>
                        <div className='service-infos'>
                            {this.state.arr.map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        <div className="item"  onClick={() => this.getServiceUrl(item)}>
                                            <div className='left'>
                                                <img src={item.url} />
                                                <span>{item.title}</span>
                                            </div>
                                            <div className='right'>
                                                <img src={right} />
                                            </div>
                                        </div>
                                    </Fragment>
                                )
                            })}
                        </div>
                    </div>
                </GeneralBackGround>
            </div>

        );
    }
}

export default CloundService;