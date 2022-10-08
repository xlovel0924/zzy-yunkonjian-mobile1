import React, { Component, Fragment } from "react";
import Nav from "@/components/nav/nav";

import publicity from '@/assets/img/cloud-martyrs/propaganda.png';
import Icon2 from '@/assets/img/cloud-martyrs/martyrs-icon1.png';
import Icon1 from '@/assets/img/cloud-martyrs/martyrs-icon2.png';
import Icon3 from '@/assets/img/cloud-martyrs/martyrs-right.png';
import './cloudMartyrs.css';
import GeneralBackGround from "../../components/GeneralBackGround";

import { cloudService } from '../../server/cloud';

export default class cloudMartyrs extends Component {
    state = {
        arr: [
            "欢迎尊敬的至尊云VIP王先生，王先生使用了代客祭扫服务",
            "欢迎尊敬的至尊云VIP王先生，王先生使用了代客祭扫服务",
            "欢迎尊敬的至尊云VIP王先生，王先生使用了代客祭扫服务",
            "欢迎尊敬的至尊云VIP王先生，王先生使用了代客祭扫服务",
            "欢迎尊敬的至尊云VIP王先生，王先生使用了代客祭扫服务"
        ]
    }

    getServiceUrl = (item) => {
        cloudService(item).then(res => {
            console.log(res)
            if (res.status === 200) {
                window.open(res.data.data.serviceUrl, "_self");
            }
        })
    }

    render() {
        return (
            <GeneralBackGround>
                <div className="cloud-martyrs">
                    <div className="martyrs-title">
                        <Nav ellipsisIsShow={false} title="在线祭扫" />
                    </div>
                    <div className="martyrs-infos">
                        {/* 宣传图 */}
                        <div className="publicity-figure">
                            <img src={publicity} alt="" />
                        </div>
                        {/* 项目栏 */}
                        <div className="part-two">
                            <div className="item">
                                <div className="left">
                                    <img src={Icon1} alt="" />
                                    <div className="desc">
                                        <span>实景祭扫</span>
                                        <span>线上实景祭扫</span>
                                    </div>
                                </div>
                                <div className="right" onClick={() => this.getServiceUrl("实景祭扫")}>
                                    <img src={Icon3} alt="" />
                                </div>
                            </div>
                            <div className="item">
                                <div className="left">
                                    <img src={Icon2} alt="" />
                                    <div className="desc">
                                        <span>代客祭扫</span>
                                        <span>万事顺利心想事成</span>
                                    </div>
                                </div>
                                <div className="right" onClick={() => this.getServiceUrl("代客祭扫")}>
                                    <img src={Icon3} alt="" />
                                </div>
                            </div>
                        </div>
                        {/* 实时信息 */}
                        <div className="part-three">
                            {this.state.arr.map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        <div className="item">{item}</div>
                                    </Fragment>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </GeneralBackGround>
        )
    }
}