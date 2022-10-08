import React, {Component} from 'react';
import "./index.css"
import Nav from "../../components/nav/nav";
import {InputItem} from "antd-mobile";

import search from "@/assets/img/yun-home/search.png"
import scanning from "@/assets/img/yun-home/scanning.png"


import {getByFrequencyAxios, getByNameDim,getByIdAxios,addSearchAxios} from "@/server/index";

class Index extends Component {

    constructor() {
        super();
        this.state = {
            search: "",
            recentSearch: [], // 最近搜索
            historical: [], // 历史记录
            searchFid: [
                {title: "热销墓区"},
                {title: "热销墓区"},
                {title: "热销墓区"},
                {title: "热销墓区"},
                {title: "热销墓区"},
                {title: "热销墓区"},
            ],
            searchList: [],
        }
        this.userInfo = JSON.parse(window.localStorage.getItem("user")).data
    }

    componentDidMount() {
        this.getByNumber();
        this.getByDate();
    }
    // 搜索记录
    getByDate = () => {
        getByIdAxios({id: this.userInfo.id}).then(res => {
            if (res.data.status == 200){
                this.setState({
                    historical: [...res.data.data],
                    // search: ""
                },() => {
                    console.log(this.state.historical,"calll")
                });
            }
        })
    }


    // 最近搜索
    getByNumber = () => {
        getByFrequencyAxios({id: this.userInfo.id}).then(res => {
            if (res.data.status == 200){
                this.setState({
                    recentSearch: [...res.data.data],
                    // search: ""
                });
            }
        })
    }
    // 搜索
    handleInputChange = (key, v) => {
        this.setState({
            [key]: v,
        }, () => {
            getByNameDim({serviceName: this.state.search}).then(res => {
                if (res.data.status == 200) {
                    this.setState({
                        searchList: [...res.data.data]
                    },() => {
                        console.log(this.state.searchList,"listl##")
                    });
                }
            })
        });
    }

    clickService = (url,item={},flag=false) => {
        if (flag){
            addSearchAxios({
                personnelId: this.userInfo.id,
                serviceId: item.id,
                serviceName: item.serviceName
            }).then(res => {
                if (url.substring(0,1) == "/"){
                    this.props.history.push(url)
                } else {
                    window.open(url, "_self")
                }
            })
            return;
        }

        if (url.substring(0,1) == "/"){
            this.props.history.push(url)
        } else {
            window.open(url, "_self")
        }
    }

    getInput = () => {
        return <div style={{width: "264px"}}>
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
                extra={<img src={scanning} style={{width: "18px", height: "18px", marginRight: "9px"}} alt=""/>}
            >
                <img src={search} style={{width: "12px", height: "12px"}} alt=""/>
            </InputItem>
        </div>
    }


    render() {
        return (
            <div className="home-search">
                <Nav title={this.getInput()} ellipsisIsShow={false}  className="pdlr-0"/>

                {this.state.search !== "" ? <div className="find-root-list">
                        <div className="fint-root-search-list">
                            {
                                this.state.searchList.map(item =>
                                    <div className="fint-root-search-item" key={item.id} onClick={() => this.clickService(item.serviceUrl,item,true)}>{item.serviceName}</div>
                                )
                            }
                        </div>
                    </div> :

                    <div>
                        {this.state.recentSearch.length > 0 && <div className="recent-search">
                            <div>最近搜索</div>
                            <div>
                                {this.state.recentSearch.map((item, index) =>
                                    <div key={item.id}  onClick={() => this.clickService(item.serviceUrl)}>{item.serviceName}</div>
                                )}
                            </div>
                        </div>}
                        {this.state.historical.length > 0 && <div className="recent-search">
                            <div>历史记录</div>
                            <div>
                                {this.state.historical.map((item, index) =>
                                    <div key={item.id}  onClick={() => this.clickService(item.serviceUrl)}>{item.serviceName}</div>
                                )}
                            </div>
                        </div>}
                        {/*<div className="search-find">*/}
                        {/*    <div>搜索发现</div>*/}
                        {/*    <div>*/}
                        {/*        {this.state.searchFid.map((item,index) =>*/}
                        {/*            <div key={index}>*/}
                        {/*                <div style={{*/}
                        {/*                    margin: "0 8px",*/}
                        {/*                    borderRadius: "50%",*/}
                        {/*                    backgroundColor: "#C79F89",*/}
                        {/*                    width: "3px",*/}
                        {/*                    height: "3px"*/}
                        {/*                }}></div>*/}
                        {/*                <div>{item.title}</div>*/}
                        {/*            </div>*/}
                        {/*        )}*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>}
            </div>
        );
    }
}

export default Index;