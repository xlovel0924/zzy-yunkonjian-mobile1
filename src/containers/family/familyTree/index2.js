import React, {Component} from 'react';
import FamilyTree from "@/components/mytree"
import avatar from "@/assets/img/yun-create-family/avatar.png"
import "./index.css"
import {queryGenealogyMember,GenealogyByMemberId} from "@/redux/family/family.action"
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Icon, Modal, Toast} from "antd-mobile";
import {BASE_URL_STATIC} from "../../../server/service";
import qs from "qs";


@connect(
    state => {
        return {
            familyReducer: state.familyReducer
        }
    },
    {queryGenealogyMember,GenealogyByMemberId}
)
@withRouter
class Index2 extends Component {

    constructor() {
        super();
        this.state = {
            familyVOS: [],
            optionsModal: false,
            ids: {},
        }
        this.userInfo = JSON.parse(window.localStorage.getItem("user")).data;
        this.ids = {};
        this.family = ""
    }

    async componentDidMount() {
        await this.getGenealogyMember();
    }

    // 获取世代关系图
    getGenealogyMember = async () => {
        // 后期跟换
        // await this.props.GenealogyByMemberId({id: this.userInfo.id})

        // let id = this.props.familyReducer.familyListByMemberId.data[0].id
        // console.log(this.props,"props")
        await this.props.queryGenealogyMember({id: this.props.match.params.id});

        let genealogyMember = this.props.familyReducer.genealogyMember.data;

        console.log(this.props.familyReducer.genealogyMember,"21312321")

        // this.setState({
        //     familyVOS: [...this.state.familyVOS, ...genealogyMember.familyVOS]
        // });
    //  关系数组
        let familyVOS = genealogyMember.familyVOS;
        let husbandVO = genealogyMember.husbandVO;
        let wifeVO = genealogyMember.wifeVO;
    //    处理familyVOS
        let newFamilyVOS = JSON.parse(JSON.stringify(familyVOS));
        let newHusbandVO = JSON.parse(JSON.stringify(husbandVO));
        let newwifeVO = JSON.parse(JSON.stringify(wifeVO));
        for (let item of newFamilyVOS){
            item.avatarUrl = item.avatarUrl ? (BASE_URL_STATIC + item.avatarUrl.replace(/\\/,"/")) : avatar
            // 有爹加爹
            if (item.father !== null && item.father[0].id){
                item.fid = item.father[0].id
            }
            // 有妈加妈
            if (item.mother !== null && item.mother[0].id){
                item.mid = item.mother[0].id
            }
            // 在父亲的数组中添加母亲的id
            let pidsArr = [];
            // // 在母亲的数组中添加父亲的id
            let midsArr = [];

            for (let i of newHusbandVO){
                if (item.id === i.id){
                    for (let v of i.husbandWifeVOS){
                        pidsArr.push(v.id)
                    }
                    item.pids = pidsArr;
                    break;
                }
            }

            for (let i of newwifeVO){
                if (item.id === i.id){
                    for (let v of i.husbandWifeVOS){
                        midsArr.push(v.id)
                    }
                    item.pids = midsArr;
                    break;
                }
            }

            if (item.sex === 1){
                item.gender = "male"
            } else {
                item.gender = "female"
            }
        }

        this.setState({
            familyVOS: [...this.state.familyVOS,...newFamilyVOS]
        },() => {
            console.log(this.state.familyVOS,"VOSOS@@")
            // 选中项
            this.family.center(this.props.match.params.nodeId)
        });
    }

    gotoBack = () => {
        this.props.history.goBack();
    }

    openOptionsModal = () => {
        this.setState({
            optionsModal: true
        });
    }

    closeOptionsModal = () => {
        this.setState({
            optionsModal: false
        });
        console.log("执行了")
    }

    // 获取那些id
    // 子组件触发
    getId = (ids) => {
        console.log(ids,"ids");
        this.ids = ids;
        this.setState({
            ids: {...ids}
        });
    }
    // 添加成员
    addFamily = (memberType,sex,type) => {
        const {genealogyId, memberId,id, generation} = this.state.ids;
        if (memberType == "1" && this.state.ids.fid){
            return Toast.info("已有一位父亲",1)
        }

        if (memberType == "0" && this.state.ids.mid){
            return Toast.info("已有一位母亲",1)
        }

        if (memberType == "3" && this.state.ids.pids){
            return Toast.info("已有一位配偶",1)
        }

        this.props.history.push({
            pathname: "/create-family-tree",
            /*
            *genealogyId 家谱id
            * memberId  用户id
            * memberType  类别(0、母亲 1、父亲 2、妻子(现任) 3、妻子(前任) 4、儿子/女儿 5、自己)
            * sex: 性别 (1 => 男 2 => 女)
            * type: 是否为修改
            * */
            search: qs.stringify({genealogyId,memberType,sex,memberId,id,generation,type})
        })
    }
    // 查看 、 隐藏关系
    relation = () => {
        let myInfo = this.state.ids;
        let newFamilyVOS = JSON.parse(JSON.stringify(this.state.familyVOS));
        if (!myInfo.flag){
            for (let item of newFamilyVOS){
                item.relation = ""
                item.flag = false;
                if (myInfo.fid && myInfo.fid == item.id){
                    console.log(item,"item")
                    item.relation = "父亲"
                }

                if (myInfo.mid && myInfo.mid == item.id){
                    console.log(item,"item")
                    item.relation = "母亲"
                }

                if (myInfo.pids && myInfo.pids[0] == item.id){
                    console.log(item,"item")
                    item.relation = "配偶"
                }

                if (item.fid && item.fid == myInfo.id || item.mid && item.mid == myInfo.id ){
                    if (item.sex == 1){
                        item.relation = "儿子"
                    } else {
                        item.relation = "女儿"
                    }
                }

                if (myInfo.id == item.id){
                    item.flag = true
                }
            }

            this.setState({
                familyVOS: [...newFamilyVOS],
            });
        } else {
            for (let item of newFamilyVOS){
                item.relation = ""

                if (myInfo.id == item.id){
                    item.flag = false
                }
            }
            this.setState({
                familyVOS: [...newFamilyVOS],
            });
        }

        this.closeOptionsModal();
    }

    // 获取实例
    getFamily = (family) => {
        this.family = family
    }


    render() {
        return (
            <div className="family-tree" style={{height:"100%"}}>
                <div className="family-top">
                    <Icon onClick={this.gotoBack} type="left" />
                    <Icon type="ellipsis"/>
                </div>
                <Modal
                    popup
                    visible={this.state.optionsModal}
                    animationType="slide-up"
                    maskClosable={false}
                    closable
                    onClose={this.closeOptionsModal}
                >
                    <div className="options-modal">
                        <div className="ptb-10" onClick={() => this.addFamily(null,null,true)}>{this.state.ids.name}的资料</div>
                        <div className="ptb-10" onClick={() => this.relation()}>{this.state.ids.flag ? "隐藏关系" : "查看关系"}</div>
                        <div className="family-parent">
                            <div className="ptb-10" onClick={() => this.addFamily("1","1",false)} style={this.state.ids.fid && {backgroundColor: "#CF9D85",color: "#fff"}}>添加父亲</div>
                            <div className="ptb-10" onClick={() => this.addFamily("0","2",false)} style={this.state.ids.mid && {backgroundColor: "#CF9D85",color: "#fff"}}>添加母亲</div>
                        </div>
                        <div className="family-children">
                            <div className="ptb-10" onClick={() => this.addFamily("3","2",false)} style={this.state.ids.pids && {backgroundColor: "#CF9D85",color: "#fff"}}>添加妻子</div>
                            <div className="ptb-10" onClick={() => this.addFamily("4","1",false)}>添加子女</div>
                        </div>
                        {/*<div className="ptb-10" onClick={this.closeOptionsModal}>取消</div>*/}
                    </div>
                </Modal>
                <FamilyTree getFamily={this.getFamily} getId={this.getId}  openOptionsModal={this.openOptionsModal} nodes={this.state.familyVOS} />
            </div>
        );
    }
}

export default Index2;