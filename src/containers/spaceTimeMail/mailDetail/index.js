import React, {Component} from 'react';
import "./index.css"
import Nav from "../../../components/nav/nav";

import {connect} from "react-redux";
import { fetchMailDetail } from "@/redux/spaceTimeMail/spaceTimeMail.action"
import BScroll from "@better-scroll/core";
import topUl from "@/assets/img/yun-space-time-mail/spaceTimeMailTopUl.png";
import { BASE_URL_STATIC } from "../../../server/service";

import {Popover} from "antd-mobile";
import _ from 'lodash';
const Item = Popover.Item;

@connect(
    state => {
        return {
            mailReducer: state.mailReducer
        }
    },
    { fetchMailDetail }
)
class Index extends Component {
    constructor() {
        super();
        this.state = {
            mailDetail: {},
            userInfo: {}
        }
        this.taskWrapper = ref => { this.taskWrappers = ref };
    }

    async componentDidMount() {
        this.setState({
            userInfo: JSON.parse(window.localStorage.getItem("user")).data
        })
        this.getMailDetail();
    }

    initScroll=()=> {
        this.taskScroll = new BScroll(this.taskWrappers, {
            click: true,
            probeType: 3
        });
    }

    // 根据ID获取信件详细信息
    getMailDetail = async () => {
        // 根据ID获取信件详细信息 
        await this.props.fetchMailDetail({id: this.props.match.params.id});
        let res = this.props.mailReducer.mailDetail;
        if(res.flag){
            this.setState({
                mailDetail: res.data
            });
            // 初始化滚动
            this.initScroll();
        }else{
            this.setState({
                mailDetail: {}
            });
        }
    }


    render() {
        const { mailDetail, userInfo } = this.state;
        return (
            <div className="space-time-mail-detail">
                <Nav title="时空信箱"  ellipsisIsShow={false} />
                <div className="space-time-mail-detail-container" ref={this.taskWrapper}>
                    <div>
                        {!_.isEmpty(mailDetail)?<>
                            <div className='mailDetailTitle'>{mailDetail.letterTitle}</div>
                            <div className='mailDetailInfoTitle'>
                                <div className='mailDetailInfoTitle-img'>
                                    <img style={{ width: "100%" }} src={BASE_URL_STATIC + this.state.userInfo.profilePhoto.replace(/\\/, "/")} alt="img" />
                                </div>
                                <div className='mailDetailInfoTitle-titleBox'>
                                    <div className='mailDetailInfoTitle-titleName'>{userInfo.nickName!=null?userInfo.nickName:userInfo.account}</div>
                                    <div className='mailDetailInfoTitle-titleTime'>{mailDetail.mailDate.split(' ')[0]}</div>
                                </div>
                                <div className='space-time-mail-listItem-follow'>
                                    {/* <div className='space-time-mail-detail-followBtn' style={{backgroundColor: '#CECECE', color: '#fff'}}>未关注</div> */}
                                    {/* <div className='space-time-mail-detail-followBtn'>关注</div> */}
                                </div>
                            </div>
                            <div className='space-time-mail-detail-main'>
                                 {/* 将html代码格式的字符串转换成代码 */}
                                <div dangerouslySetInnerHTML={{__html: mailDetail.letterContent}}></div>
                            </div>
                            <div style={{width:'100%', height:20}}></div>
                        </>
                        :null}
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;