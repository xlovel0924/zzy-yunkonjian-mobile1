import React, {Component} from 'react'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom"
import Nav from '../../../components/nav/nav';
import {InputItem, Icon} from 'antd-mobile';
import Form from '@/components/form';
import HomeBackGround from "@/components/HomeBackGround"
import del from "@/assets/img/yun-find-root/del.png"

import search from "@/assets/img/yun-home/search.png"
import scanning from "@/assets/img/yun-home/scanning.png"

import {queryTheirRootAllAxios,queryTheirRootRecordByMemberId,addRootSearchAxios} from "@/server/family.js";

import "./index.css"

@Form
@withRouter
class Index extends Component {
    constructor() {
        super();
        this.state = {
            search: "",
            rootList: [],
            searchList: [],      // 搜索出来的列表
            searchHistoryList: []   // 搜索记录列表
        }

        this.userInfo = JSON.parse(window.localStorage.getItem("user")).data;
    }

    componentDidMount() {
        this.getList();
        this.getSearchHistoryList();
    }

    // 获取搜索记录
    getSearchHistoryList = () => {
        let id = this.userInfo.id;
        queryTheirRootRecordByMemberId({id}).then(res => {
            if (res.data.status == 200){
                this.setState({
                    searchHistoryList: res.data.data
                });
            }
        })
    }

    // 获取列表
    getList = () => {
        queryTheirRootAllAxios({}).then(res => {
            console.log(res, "resss");
            this.setState({
                rootList: res.data.data,
            });
        })
    }

    handleInputChange = (key, v) => {
        this.setState({
            [key]: v,
        }, () => {
            queryTheirRootAllAxios({name: this.state.search}).then(res => {
                if (res.data.status == 200){
                    this.setState({
                        searchList: res.data.data
                    });
                }
            })
        });

    }

    goDetail = (id,item={},flag=false) => {
        if (flag){
            addRootSearchAxios({
                memberId: this.userInfo.id,
                theirRootId: item.id,
                theirRootName: item.name
            })
        }
        this.props.history.push(`/find-root-detail/${id}`)

    }

    render() {
        return (
            <div className="find-root">
                <div className="top find-root-top">
                    <div style={{marginRight: "12px", width: "43px"}}>
                        <Icon type="left" onClick={() => this.props.history.goBack()}/>
                    </div>
                    <div style={{width: "100%"}}>
                        <InputItem
                            type='text'
                            placeholder='请输入搜索内容'
                            clear
                            onChange={v => {
                                this.handleInputChange('search', v)
                            }}
                            value={this.state.search}
                            labelNumber={1}
                            className="search"
                            extra={<img src={scanning} style={{width: "18px", height: "18px", marginRight: "9px"}}
                                        alt=""/>}
                            onFocus={this.inputFocus}
                        >
                            <img src={search} style={{width: "12px", height: "12px"}} alt=""/>
                        </InputItem>
                    </div>
                </div>
                {this.state.search !== "" ? <HomeBackGround>
                        <div className="find-root-list">
                            <div className="fint-root-search-list">
                                {
                                    this.state.searchList.map(item =>
                                        <div className="fint-root-search-item" key={item.id}  onClick={() => this.goDetail(item.id,item,true)}>{item.name}</div>
                                    )
                                }
                            </div>
                        </div>
                    </HomeBackGround> :
                    <HomeBackGround>
                        <div className="find-root-list">
                            {/* 最近搜索 */}
                            {this.state.searchHistoryList.length > 0 && <div className="find-near-search">
                                <div>
                                    <div style={{fontWeight: "bold"}}>最近搜索</div>
                                    <img src={del} alt=""/>
                                </div>
                                <div>
                                    {
                                        this.state.searchHistoryList.map(item =>
                                            <div key={item.id} onClick={() => this.goDetail(item.theirRootId)}>{item.theirRootName}</div>
                                        )
                                    }

                                </div>
                            </div>}
                            {/* 列表 */}
                            {
                                this.state.rootList.map(item =>
                                    <div className="find-list-item" onClick={() => this.goDetail(item.id)}
                                         key={item.id}>
                                        <div className="find-title">{item.name}</div>
                                        <div className="find-content">
                                            <div dangerouslySetInnerHTML={{__html: item.synopsis}}></div>
                                            <Icon type="right" color='#919191'/>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </HomeBackGround>
                }
            </div>
        )
    }
}

export default Index;
