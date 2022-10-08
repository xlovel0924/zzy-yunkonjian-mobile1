import React, {Component} from 'react';
import "./index.css"
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Nav from "../../../components/nav/nav";
import avatar from "@/assets/img/yun-create-family/avatar.png"
import {Switch} from "antd-mobile";
import {queryConcernMemberId,updateConcern} from "@/redux/family/family.action"

@connect(
    state => {
        return {
            familyReducer: state.familyReducer,
        }
    },
    {queryConcernMemberId,updateConcern}
)
@withRouter
class Index extends Component {
    constructor() {
        super();
        this.state = {
            isConcern: false,
            infoList: []    //信息列表
        }
    }

    componentDidMount() {
        this.getList();
    }

    getList = async () => {
        await this.props.queryConcernMemberId({id: this.props.match.params.id});
        let res = this.props.familyReducer.concernInfo;
        this.setState({
            infoList: [...res.data]
        });
    }

    changeSwitch = async (e,item) => {
        console.log(e,"eeee")
        let newInfoList = JSON.parse(JSON.stringify(this.state.infoList));
        for (let i of newInfoList){
            if (item.id == i.id){
                i.isShield = e ? 1 : 0
                this.props.updateConcern(i);
            }
        }
        this.setState({
            infoList: [...newInfoList]
        },() => {
            console.log(this.state.infoList,"list")
        });

    }

    render() {
        return (
            <div className="focus-me">
                <Nav title="我的家谱" ellipsisIsShow={false} className="plr-0" />
                <div className="focus-me-container">
                    <div>关注我的人</div>
                    {
                        this.state.infoList.map(item =>
                            <div className="focus-me-list" key={item.id}>
                                <div className="focus-me-img">
                                    <img src={avatar} alt=""/>
                                </div>
                                <div style={{width: "100%",color: "#6B6B6B"}}>
                                    <div style={{fontWeight: "bold"}}>{item.memberName}</div>
                                    <div className="focus-me-item"  style={{fontSize: "10px"}} >
                                        <div>
                                            关注了你
                                        </div>
                                        <div>不让他（她）看</div>
                                        <div>
                                            <span className="no">{item.isShield == "1" ? "是" : "否"}</span>
                                            <Switch
                                                checked={item.isShield == "1" ? true : false}
                                                onChange={(e) => this.changeSwitch(e,item)}
                                                color="#CF9D85"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )

                    }
                </div>
            </div>
        );
    }
}

export default Index;