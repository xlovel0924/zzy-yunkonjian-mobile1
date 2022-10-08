import React, {Component} from 'react';
import "./index.css"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {selectPeopleInfo} from "@/redux/family/family.action"
import Nav from "../../../components/nav/nav";
import {InputItem} from "antd-mobile";
import HomeBackGround from "../../../components/HomeBackGround";
import qs from "qs";

import {queryRelationshipByMemberIdAxios, getMemberInfoAxios} from "@/server/family.js";

@connect(
    state => ({familyReducer: state.familyReducer}),
    {selectPeopleInfo}
)
@withRouter
class Index extends Component {

    constructor() {
        super();
        this.state = {
            search: "",
            allMemberList: []
        }
        this.type = ""
    }

    componentDidMount() {
        console.log(this.props,"PPP")
        let parse = qs.parse(this.props.location.search.split("?")[1]);
        console.log(parse,"parse")
        this.type = parse.type;

        console.log(this.props.familyReducer.selectPeopleInfo, "Infofo")
        this.getMemberInfo();
    }

    handleInputChange = (key, value) => {


        this.setState({
            [key]: value
        },() => {
            let data = {
                name: value
            }
            this.getMemberInfo(data);
        });
    }

    // 根据家谱id获取家谱人员列表
    getMemberInfo = (obj) => {
        console.log(this.props,"PPP@@")
        let data = {genealogyId: this.props.match.params.genealogyId, ...obj}
        getMemberInfoAxios(data).then(res => {
            if (res.data.status == 200) {
                let newData = res.data.data;
                for (let key in newData){
                    if (newData[key].id == this.props.match.params.id){
                        newData.splice(key, 1);
                    }
                }

                this.setState({
                    allMemberList: newData
                });
            }
        })
    }

    // 点击确定按钮
    clickConfirm = () => {
        let obj = {};
        obj.name = this.state.search;
        this.props.selectPeopleInfo(obj)
        this.props.history.goBack();
        // obj.firstId =
    }


    // 点击列表中的人
    selectPeople = (item) => {
        if (item.id){
            console.log(item,"itemtem")
            let newItem = JSON.parse(JSON.stringify(item));
            newItem.id = this.props.match.params.id;
            newItem.secondId = item.id
            if (newItem.avatarUrl == ""){
                newItem.avatarUrl = "-1"
            }
            this.props.selectPeopleInfo(newItem)
        } else {
            this.props.selectPeopleInfo(item)
        }

        if (this.type == "edit"){
            this.props.history.push({
                pathname: `/create-family-tree/${this.props.match.params.id}/${this.props.match.params.genealogyId}/0/-2`,
                search: "?add_edit=edit",
                state: {generation: this.props.location.state.generation}
            })
        } else {
            this.props.history.goBack();
        }

    }

    getInput = () => {
        return <div style={{
            width: "264px",
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
            justifyContent: "space-around"
        }}>
            <InputItem
                type='text'
                placeholder='请输入搜索内容'
                clear
                onChange={v => {
                    this.handleInputChange('search', v)
                }}
                value={this.state.search}
                className="search"
                extra={
                    this.type == "edit" ? "" :
                        this.state.search == "" ? "" : <div
                            style={{
                                width: "49px",
                                padding: "3px 0",
                                textAlign: "center",
                                color: "#fff",
                                backgroundColor: "#CF9D85",
                                borderRadius: "35px" ,
                                fontSize: "11px",
                                marginRight: "5px"
                            }}
                            onClick={this.clickConfirm}
                        >确定</div>
                }
            >
            </InputItem>
            {/*<div style={{fontSize: "12px"}}>确定</div>*/}
        </div>
    }

    render() {
        let selectPeopleInfo = this.props.familyReducer.selectPeopleInfo;

        return (
            <div className="select-people">
                <Nav title={this.getInput()} ellipsisIsShow={false}/>

                <HomeBackGround>
                    <div>
                        {
                            JSON.stringify(selectPeopleInfo) !== "{}" && <div>
                                <div className="select-address-title">当前选择人物</div>
                                <div className="select-address-list">
                                    <div onClick={() => this.selectPeople(selectPeopleInfo)}>{selectPeopleInfo.name}</div>
                                </div>
                            </div>
                        }
                        <div>
                            <div className="select-address-title">请选择人物</div>
                            <div className="select-address-list">
                                {this.state.allMemberList.map(item =>
                                    <div key={item.id} onClick={() => this.selectPeople(item)}>{item.name}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </HomeBackGround>
            </div>

        );
    }
}

export default Index;