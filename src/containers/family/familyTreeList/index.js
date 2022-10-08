import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { queryGenealogyCondition, queryConcernGenealogy, addConcer, deleteConcer, GenealogyByMemberId } from "@/redux/family/family.action"
import "./index.css";
import BScroll from "@better-scroll/core";

import Nav from "../../../components/nav/nav";
import HomeBackGround from "@/components/HomeBackGround"
import { Popover } from "antd-mobile";

import banner from "@/assets/img/yun-family-tree-list/banner.png";

import MyFamilyTree from "./MyfamilyTree"
import AllPublicTree from "./AllPublicTree"
import ConcersTree from "./ConcersTree"
import ListTemplate from "./ListTemplate"


const Item = Popover.Item;
@connect(
    state => {
        return {
            familyReducer: state.familyReducer
        }
    },
    { queryGenealogyCondition, queryConcernGenealogy, addConcer, deleteConcer, GenealogyByMemberId }
)
@withRouter
class Index extends Component {
    constructor() {
        super();

        this.state = {
            curr: 0,
            // myTreeList: [], // 我的家谱列表
            // allPublicList: [],   // 家谱集
            // concerList: [], // 关注
            list: [],   // 列表
            height: 0,
        }

        this.tabTileList = [
            { id: 0, title: "我的家谱" },
            { id: 1, title: "收藏的家谱" },
            { id: 2, title: "云家谱集" },
        ]

        this.listRef = React.createRef();

        this.userInfo = JSON.parse(window.localStorage.getItem("user")).data;
        console.log(this.userInfo, "INfo@@")
        this.sc = null;
    }


    selectTab = async (index) => {
        //    判断当前点击是不是已经选中的
        if (index == this.state.curr) return;

        await this.setState({
            curr: index
        });

        if (this.state.curr == 0) {
            await this.getList()
        } else if (this.state.curr == 2) {
            await this.getList(0)
        } else if (this.state.curr == 1) {
            await this.getConcerList();
        }

        this.sc.refresh();

    }

    async componentDidMount() {
        await this.getList();
        this.setState({
            height: window.innerHeight - 40
        }, () => {
            this.sc = new BScroll('#list-wrapper', {
                click: true,
                tap: true
            });
        });
        if (this.props.match.params.status) {
            this.setState({
                curr: this.props.match.params.status
            })
        }
        console.log(this.props, '我是props')
    }

    // 获取关注的列表
    getConcerList = async () => {
        await this.props.queryConcernGenealogy({ id: this.userInfo.id });
        let res = this.props.familyReducer.concerFamilyList.data;
        let newRes = JSON.parse(JSON.stringify(res));
        for (let item of newRes) {
            item.isDown = true;
            if (item.isConcern == 0 || item.isConcern == null) {
                item.isShow = true;
            } else {
                item.isShow = false;
            }
        }
        await this.setState({
            list: [...newRes]
        });
        console.log(this.state.list)
    }

    // 获取我的家谱或家谱集列表
    getList = async (isPublic = null) => {
        /*
         我的家谱传 cratorId  isConcern ： 1
         家谱集传isPublic为0
        */
        let res;
        if (isPublic === null) {
            // 我的家谱
            await this.props.GenealogyByMemberId({ id: this.userInfo.id });
            res = this.props.familyReducer.familyListByMemberId.data;
            console.log(res, "@@ress")
            // await this.props.queryGenealogyCondition({creatorId: this.userInfo.id,isPublic,isConcern: 1});
            // res = this.props.familyReducer.conditionFamilyList.data,
        } else {
            // 家谱集
            await this.props.queryGenealogyCondition({ isPublic, creatorId: this.userInfo.id });
            // await this.props.queryGenealogyCondition({ isPublic });
            res = this.props.familyReducer.conditionFamilyList.data
        }
        if (!res) return;
        let newRes = JSON.parse(JSON.stringify(res));
        for (let item of newRes) {
            item.isDown = true;

            if (item.isConcern == 0) {
                item.isShow = true;
            } else {
                item.isShow = false;

            }
        }
        await this.setState({
            list: [...newRes]
        });
        console.log(this.state.list);
    }

    // 修改state.list
    changeList = (id, key, value) => {
        let newList = JSON.parse(JSON.stringify(this.state.list));
        for (let item of newList) {
            if (item.id == id) {
                item[key] = value
            }
        }
        this.setState({
            list: [...newList]
        }, () => {
            console.log(this.state.list, "list")
        });
    }

    goCreateFamily = () => {
        this.props.history.push("/create-family")
    }

    render() {
        return (
            <div className="family-tree-list">
                <Nav title="云家谱" className="prl-0" ellipsisIsShow={false} />
                {/*<HomeBackGround>*/}
                <div id="list-wrapper" style={{
                    height: this.state.height + "px",
                    overflow: "hidden",
                    boxSizing: "border-box"
                }}>
                    <div>
                        <div style={{
                            padding: "14px",
                            paddingBottom: "61px"
                        }} ref={this.listRef}>
                            <img className="tree-list-banner" src={banner} alt="" />
                            <div className="tree-list">
                                <div className="tree-list-title">
                                    {this.tabTileList.map((item, index) =>
                                        <div className='title-nav'>
                                            <div
                                                key={index}
                                                className={this.state.curr == index ? "tree-list-title-selected Semibold" : 'Regular'}
                                                onClick={() => this.selectTab(index)}
                                                style={{fontSize:'13px'}}
                                            >{item.title}</div>
                                            <div className={this.state.curr == index ? "tree-hr" : null}></div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {/*<div>*/}
                                    <ListTemplate
                                        list={this.state.list}
                                        addConcer={this.props.addConcer}
                                        deleteConcer={this.props.deleteConcer}
                                        userInfo={this.userInfo}
                                        curr={this.state.curr}
                                        changeList={this.changeList}
                                        getConcerList={this.getConcerList}
                                        selectTab={this.selectTab}
                                        getList={this.getList}
                                    />
                                    {/*</div>*/}
                                </div>
                                {/*{this.state.curr == 1 && <div><ListTemplate list={this.state.concerList} curr={this.state.curr}/></div>}*/}
                                {/*{this.state.curr == 2 && <div><ListTemplate list={this.state.allPublicList} addConcer={this.props.addConcer} userInfo={this.userInfo} curr={this.state.curr}/></div>}*/}
                                <div className="tree-list-btn" onClick={this.goCreateFamily}>添加新家谱</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*</HomeBackGround>*/}

                {

                }
            </div>
        );
    }
}

export default Index;