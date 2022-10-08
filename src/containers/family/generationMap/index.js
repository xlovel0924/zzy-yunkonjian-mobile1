import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom"
import "./idnex.css"
import Nav from "../../../components/nav/nav";
import BScroll from "@better-scroll/core";
import yun from "@/assets/img/yun-generation-map/yun.png"
import avatar from "@/assets/img/yun-generation-map/avatar.png"
import HomeBackGround from "@/components/HomeBackGround"
import {queryGenealogyMemberList,GenealogyByMemberId} from "@/redux/family/family.action"
import {numberToChinese} from "@/utils/baseUtil";
import {BASE_URL_STATIC} from "../../../server/service";
import headerImg from '@/assets/img/life-biography/headportrait.png';

const generationMapRef = React.createRef();
@connect(state => {
        return {
            familyReducer: state.familyReducer
        }
    },
    {queryGenealogyMemberList,GenealogyByMemberId}
)
@withRouter
class Index extends Component {

    constructor() {
        super();
        this.state = {
            memberList: [],
            height: ""
        }

        this.userInfo = JSON.parse(window.localStorage.getItem("user")).data;
    }

    componentDidMount() {
        setTimeout(() => {
            this.initScroll()
        },500)
        this.getMemberList();
    }

    initScroll = () => {
        this.setState({
            height: generationMapRef.current.clientHeight - 80
        },() => {
            new BScroll(".family-wrapper",{
                click: true,
                tap: true
            })
        })
    }
    // 获取世代图列表
    getMemberList = async () => {
        // 根据用户获取家谱id（后期需要换接口）
        // await this.props.GenealogyByMemberId({id: this.userInfo.id});
        // let id = this.props.familyReducer.familyListByMemberId.id;
        // 根据家谱id查世代图
        await this.props.queryGenealogyMemberList({id: this.props.match.params.id});
        let memberList = this.props.familyReducer.memberList
        let newMemberList = JSON.parse(JSON.stringify(memberList));
        let map = new Map();
        newMemberList = newMemberList.data.filter(item => !map.has(item.generation) && map.set(item.generation,item))
        console.log(newMemberList,"map")
        let list = []
        for (let item of newMemberList){
            let arr = [];
            for (let i of memberList.data){
                if (item.generation === i.generation){
                    arr.push(i)
                }
            }
            list.push(arr);
            // this.setState({
            //     memberList: [...this.state.memberList, arr]
            // },() => {
            //     console.log(this.state.memberList,"memberLsit")
            // });
        }

         list.sort((a,b) => {
            return b[0].generation - a[0].generation
        })
        console.log(list,"list")
        this.setState({
            memberList: [...this.state.memberList, ...list]
        },() => {
            console.log(this.state.memberList,"memberLsit")
        });
        console.log(memberList,"@@list")
        // this.setState({
        //     memberList: [...this.props.familyReducer.memberList.data]
        // });
    }

    goDetail = (genealogyId,nodeId) => {
        this.props.history.push(`/familytree/${genealogyId}/${nodeId}`);
    }

    render() {
        return (
            <div className="generation-map" ref={generationMapRef}>
                <Nav title="家族图谱" ellipsisIsShow={false} className="plr-0" />
                {/*<div id="generation-map-wrapper" style={{*/}
                {/*    height: this.state.height,*/}
                {/*    overflow: "hidden"*/}
                {/*}}>*/}
                {/*<HomeBackGround>*/}
                    <div style={{overflow: "auto"}}>
                        <div className="member-parent">
                            {
                                this.state.memberList.map((item,index) =>
                                    <div className="member-item" key={index} style={{width: "100%",overflow: "auto"}}>
                                        {/*代数*/}
                                        <div className="member-title">第{numberToChinese(index + 1)}代</div>
                                        {/*图标*/}
                                        <img src={yun} alt=""/>
                                        {/*成员*/}
                                        {
                                            item.map(i =>
                                                <div className="three-div" key={i.id}>
                                                    <div style={{padding: "8px 0"}}  onClick={() => this.goDetail(i.genealogyId,i.id)}>
                                                        <div style={{borderRadius: "50%",overflow:"hidden"}}>
                                                            <img  src={i.avatarUrl ? BASE_URL_STATIC + i.avatarUrl.replace(/\\/,"/") : headerImg} alt=""/>
                                                        </div>
                                                        <div style={{
                                                            marginTop: "5px"
                                                        }}>{i.name}</div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                {/*</div>*/}
                {/*</HomeBackGround>*/}
            </div>
        );
    }
}

export default Index;