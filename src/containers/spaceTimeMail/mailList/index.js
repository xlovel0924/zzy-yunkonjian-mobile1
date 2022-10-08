import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMailList } from "@/redux/spaceTimeMail/spaceTimeMail.action"
import "./index.css";
import BScroll from "@better-scroll/core";

import Nav from "../../../components/nav/nav";
import { Popover } from "antd-mobile";
import { BASE_URL_STATIC } from "../../../server/service";

import banner from "@/assets/img/yun-family-tree-list/banner.png";
import moment from 'moment';
import _ from 'lodash';


const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const Item = Popover.Item;
@connect(
    state => {
        return {
            mailReducer: state.mailReducer
        }
    },
    { fetchMailList }
)
@withRouter
class Index extends Component {
    constructor() {
        super();
        this.state = {
            curr: 0,
            tabTileList: [
                { id: 0, title: "个人信件" },
                { id: 1, title: "公开信件" },
            ],
            list: [],   // 列表数据
            height: 0,
            userInfo:{},
        }
        this.listRef = React.createRef();
        this.taskWrapper = ref => { this.taskWrappers = ref };
    }


    componentDidMount() {
        this.setState({
            userInfo: JSON.parse(window.localStorage.getItem("user")).data
        })
        this.getListData(0);
    }

    initScroll() {
        this.taskScroll = new BScroll(this.taskWrappers, {
            click: true,
            probeType: 3
        });
    }

    // 切换tabs
    selectTab = (index) => {
        this.setState({
            curr:index
        });
        this.getListData(index);
    }



    // 获取信件列表
    getListData = async (index) => {
        let payload = {
            current: 1,
            size: 999,
            mailDate: moment().format(dateFormat),
            isPublic: index,
        }
        if(index===0){
            payload.createId = JSON.parse(window.localStorage.getItem("user")).data.id;
        }

        await this.props.fetchMailList(payload);
        let res = this.props.mailReducer.mailList;
        if(res.flag){
            this.setState({
                list: !_.isEmpty(res.data.records)?res.data.records:[]
            })
        }else{
            this.setState({
                list: []
            })
        }
        this.initScroll();
    }


    goDetail = (id) => {
        if(this.state.curr===0){
            this.props.history.push("/space-time-mail-detail/"+id);
        }else if(this.state.curr===1){
            this.props.history.push("/space-time-mail-detail-personal/"+id);
        }
    }

    goCreateMail=()=>{
        this.props.history.push("/space-time-mail-create");
    }

    render() {
        const { tabTileList, list, curr } = this.state;
        return (
            <div className="space-time-mail-list">
                <Nav title="时空信箱" ellipsisIsShow={false} />
                <div className='space-time-mail-list-container'>
                    <div className="space-time-list-title">
                        {tabTileList.map((item, index) =>
                            <div className='title-nav' key={index+'titleNav'}>
                                <div
                                    key={index}
                                    className={this.state.curr == index ? "space-time-list-title-selected" : 'space-time-list-title'}
                                    onClick={() => this.selectTab(index)}
                                    style={{fontSize:"13px"}}
                                >{item.title}</div>
                                <div className={this.state.curr == index ? "space-time-list-hr" : null}></div>
                            </div>
                        )}
                    </div>

                    
                    <div className='space-time-mail-list-box' ref={this.taskWrapper}>
                        <div>
                            {!_.isEmpty(list)?
                                list.map((e)=>(
                                    <div className='space-time-mail-listItem' key={e.id} onClick={()=>this.goDetail(e.id)}>
                                        <div className='space-time-mail-listItem-img'>
                                            <img style={{ width: "100%" }} src={BASE_URL_STATIC + this.state.userInfo.profilePhoto.replace(/\\/, "/")} alt="img" />
                                        </div>
                                        <div className='space-time-mail-listItem-titleBox'>
                                            <div className='space-time-mail-listItem-titleName'>{e.letterTitle}</div>
                                            <div className='space-time-mail-listItem-titleType'>{curr===1?'公开':curr===0?'个人':'---'}</div>
                                        </div>
                                        <div className='space-time-mail-listItem-time'>
                                            {e.mailDate.split(' ')[0]}
                                        </div>
                                    </div>
                                )):<div className='mail-noData'>暂无数据</div>
                            }
                        </div>
                    </div>
                    <div className="space-time-mail-btn" onClick={this.goCreateMail}>添加信件</div>
                </div>
            </div>
        );
    }
}

export default Index;