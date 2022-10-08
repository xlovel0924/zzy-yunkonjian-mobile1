import React, {Component} from 'react';
import "./index.css"
import Nav from "../../../components/nav/nav";

import {connect} from "react-redux";
import { fetchMailDetail, deleteMail } from "@/redux/spaceTimeMail/spaceTimeMail.action"
import BScroll from "@better-scroll/core";
import { BASE_URL_STATIC } from "../../../server/service";

import {Modal} from "antd-mobile";
import _ from 'lodash';

@connect(
    state => {
        return {
            mailReducer: state.mailReducer
        }
    },
    { fetchMailDetail, deleteMail }
)
class Index extends Component {
    constructor() {
        super();
        this.state = {
            deleteVisible: false,   // 删除弹窗
            mailDetail: {},         // 信件数据
            userInfo: {}            // 用户数据
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

    // 根据id获取信件信息
    getMailDetail = async () => {
        // 根据信件id查信件详情
        await this.props.fetchMailDetail({id: this.props.match.params.id});
        let res = this.props.mailReducer.mailDetail;
        if(res.flag){
            this.setState({
                mailDetail: res.data
            });
        }else{
            this.setState({
                mailDetail: {}
            });
        }
        this.initScroll();
    }

    // 删除弹窗
    handleDelete = (flag)=>{
        this.setState({
            deleteVisible: flag
        })
    }

    // 删除
    onDelete=()=>{
        this.props.deleteMail(this.props.match.params.id);
        setTimeout(() => {
            this.getMailDetail();
            this.handleDelete(false);
        }, 500);
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
                                <div className='space-time-mail-listItem-follow' style={{width:'106px'}}>
                                    {/* <div className='space-time-mail-detail-followBtn'>修改</div> */}
                                    <div className='space-time-mail-detail-followBtn' onClick={()=>this.handleDelete(true)}>删除</div>
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
                <Modal
                    visible={this.state.deleteVisible}
                    style={{boxShadow:'0 2px 10px rgba(0,0,0,0.1)'}}
                    transparent
                    maskClosable={true}
                    onClose={()=>this.handleDelete(false)}
                    title="删除信件"
                    footer={[
                        { text: '取消', onPress: ()=>this.handleDelete(false) },
                        { text: '删除', onPress: ()=>this.onDelete() },
                      ]}
                    >
                    <div style={{ lineHeight:'40px', fontSize:'18px' }}>
                        是否<span style={{color:'#f34'}}>删除</span>信件:<br/>
                        <span style={{color:'rgb(24,144,255)'}}>{mailDetail.letterTitle}</span> ?
                    </div>
                    </Modal>
            </div>
        );
    }
}

export default Index;