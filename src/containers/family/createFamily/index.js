import React, {Component} from 'react';
import {connect} from "react-redux";
import "./index.css"
import { createFamily, familyList,editFamily,tMemberGenealogyAdd,GenealogyByMemberId,queryFamily,textReviewAxios} from '@/redux/family/family.action'
import { withRouter, Redirect } from 'react-router-dom'

import BScroll from "@better-scroll/core"

import Nav from "../../../components/nav/nav";
import Form from '@/components/form';
import ConfirmModal from "./Components/ConfirmModal";

import Book from "@/assets/img/yun-create-family/book.png";
import yun from "@/assets/img/yun-create-family/yun.png";
import left from "@/assets/img/yun-create-family/left.png";
import right from "@/assets/img/yun-create-family/right.png";

import {validateForm} from "@/utils/validate";

import {InputItem, Switch, Toast} from "antd-mobile";


const familyRef = React.createRef();

@connect(
    state => {
        return {
            familyReducer: state.familyReducer
        }
    },
    {createFamily,familyList,editFamily,tMemberGenealogyAdd,GenealogyByMemberId,queryFamily,textReviewAxios}
)
@Form
@withRouter
class Index extends Component {
    constructor() {
        super();
        this.state = {
            form: {
                creatorName: "", // 姓名
                creatorAddress: "", // 地址
                name: "",   // 家谱名称
                creatorPhone: "", // 联系方式
                creatorId: "",  // 创建人id
                useName: "", // 使用人
                familyId:"",
                isCreation: 0 //创建人类型  (0 => 申请人 1 => 发起人 )
            },
            checked: false, // switch 是否开启
            isAllow: false, // 协议框是否选中
            height: 0,
            modalIsShow: false,  // 弹窗是否开启
            isEdit: false,  // 是否为修改页面
        }
        this.userInfo = JSON.parse(window.localStorage.getItem("user")).data;

        this.rules = [
            {label: "creatorName", required: true, msg: "姓名不能为空"},
            {label: "creatorAddress", required: true, msg: "地址不能为空" },
            // {label: "name", required: true, msg: "家谱名称不能为空"},
            {label: "creatorPhone", required: true, msg: "联系方式不能为空"},
        ]
    }

    handleInputChange = (key, v) => {
        this.setState({
            form: {...this.state.form,[key]: v},
        })
    }

    initScroll = () => {
        this.setState({
            height: familyRef.current.clientHeight - 58
        },() => {
            new BScroll(".family-wrapper",{
                click: true,
                tap: true
            })
        })
    }

    async componentDidMount() {
        this.setState({
            form: {...this.state.form,creatorId: this.userInfo.id }
        });
        this.initScroll();
        // await this.getFamilyId()
        await this.isEdit();
    }

    // 获取参数判断是否为修改参数
    isEdit = async () => {

        console.log(this.props.location.state,"@@@@11")

        if (this.props.location.state){
            console.log(this.props.location.state,"@@@@")
            let userId = this.props.location.state.userId;
            let isEdit = this.props.location.state.isEdit;
            let genId = this.props.location.state.genId;
            console.log(userId,"ididid")
            // await this.props.familyList({id: familyId});
            await this.props.GenealogyByMemberId({id: this.userInfo.id});


            console.log(this.props.familyReducer.familyListByMemberId.data);
            let data = this.props.familyReducer.familyListByMemberId.data;

            let obj = {};
            for (let item of data){
                if (item.id == genId){
                    obj = item
                }
            }

            this.setState({
                form: {...this.state.form,...obj},
                isEdit
            },() => {
                console.log(this.state.form)
            });
        } else {
            console.log("啥也没")
            this.setState({
                isEdit: false
            });
        }
    }
    // 同意框
    changeAllow = () => {
        console.log(this.state.isAllow,"allow")
        if (this.state.isAllow === false){
            // 拉起协议弹窗
            this.openModal();
        } else {
            // 是否同意
            this.setState({
                isAllow: false
            });
        }
    }

    childrenAllow = () => {
        this.setState({
            isAllow: true
        });
    }

    // close
    closeModal = () => {
        this.setState({
            modalIsShow: false
        });
    }

    // 开启弹窗
    openModal = () => {
        this.setState({
            modalIsShow: true
        });
    }

    closeModal = () => {
        this.setState({
            modalIsShow: false
        });
    }
    // 创建 / 修改
     operaBtn = async () => {
        if (this.state.isAllow == false){
            Toast.info("请勾选协议",1);
            return;
        }

        if(this.state.isEdit){
            // 修改云家谱
            let validate = validateForm(this.state.form,this.rules);
            if (!validate) return;
            // 敏感词校验
            await this.props.textReviewAxios(this.state.form);
            let textReviewData = this.props.familyReducer.textReviewData;
            console.log(textReviewData,"tetetetete")
            if (textReviewData.conclusionType == 2){
                return Toast.info(textReviewData.data[0].msg, 2);
            }

            await this.props.editFamily(this.state.form);
            let editFamilyRes = this.props.familyReducer.editFamily;
            if (editFamilyRes.status === 200){
                Toast.info("修改成功",1,() => {
                    this.props.history.replace("/family-tree-detail/" + editFamilyRes.data)
                })
            }
        } else {
            let data = {
                sex: this.userInfo.sex,
                // genealogyId: genealogyId,  // 家谱id
                memberId: this.userInfo.id,
                avatarUrl: this.userInfo.profilePhoto,   //头像url
                birthday: this.userInfo.birthday,    //	生日
                death: 0,    //	是否健在(0、是 1、否)
                memberType: 5,	// 类别(0、母亲 1、父亲 2、妻子(现任) 3、妻子(前任) 4、儿子/女儿 5、自己)
                name: this.userInfo.name,    //	人员名称
                originalAddress: "", //	祖籍
                phone: this.userInfo.phone, // 手机号
            }

            let formSend = {...this.state.form, ...data};
            //  必填项校验
            let validate = validateForm(formSend, this.rules);
            if (!validate) return;
            // 敏感词校验
            await this.props.textReviewAxios(formSend);
            let textReviewData = this.props.familyReducer.textReviewData;
            console.log(textReviewData,"tetetetete")
            if (textReviewData.conclusionType == 2){
                return Toast.info(textReviewData.data[0].msg, 2);
            }
            // 创建云家谱
            await this.props.createFamily(formSend);
            let createFamilyRes = this.props.familyReducer.createFamily;
            console.log(createFamilyRes,"resssiioo")
            if (createFamilyRes.status === 200){
                Toast.info("创建成功",1,() => {
                    this.props.history.replace("/family-tree-detail/" + createFamilyRes.data.data)
                })
            }
            console.log(createFamilyRes,"res")
            // const userInfo = JSON.parse(window.localStorage.getItem("user")).data;
            if (JSON.stringify(createFamilyRes) == "{}" || createFamilyRes.data.status !== 200) return;
            // 根据用户id查家谱，为了家谱id
            // await this.props.GenealogyByMemberId({id: this.userInfo.id});
            // let genealogyId = this.props.familyReducer.familyListByMemberId.data[0].id;
            // 在图谱中创建自己

            // await this.props.tMemberGenealogyAdd(data)
            // let addRes = this.props.familyReducer.addMember;
            // console.log(addRes,"ress")
            // if (addRes.status === 200){
            //     Toast.info("创建成功",1,() => {
            //         this.props.history.replace("/family-tree-detail")
            //     })
            // }
        }
    }

    // 获取家庭id(后期要用)
    // getFamilyId = async () => {
    //     await this.props.queryFamily({id:this.userInfo.id});
    //     let familyRes = this.props.familyReducer.family
    //     console.log(familyRes,"res")
    //     let familyId = familyRes.data[0].familyId;
    //     this.setState({
    //         form: {...this.state.form,familyId}
    //     });
    // }

    render() {
        return (
            <div className="create-family" ref={familyRef}>
                <Nav title={this.state.isEdit ? "修改云家谱" : "创建云家谱" } ellipsisIsShow={false} className="pdlr-0" />
                <div className="family-wrapper" style={{
                    height: this.state.height,
                    overflow: "hidden"
                }}>
                    <div>
                        <div className="book-bg">
                            <img src={Book} alt=""/>
                            <img src={yun} alt=""/>
                            <div>
                                <div>
                                    <div>云</div>
                                    <div>家</div>
                                    <div>谱</div>
                                </div>
                            </div>
                        </div>

                        <div className="family-form">
                            <InputItem labelNumber={2} className="family-input" placeholder="请输入姓名" clear onChange={v => {this.handleInputChange('creatorName', v)}} value={this.state.form.creatorName}>姓名：</InputItem>
                            <InputItem labelNumber={2} className="family-input" placeholder="请输入地址" clear onChange={v => {this.handleInputChange('creatorAddress', v)}} value={this.state.form.creatorAddress}>地址：</InputItem>
                            <div style={{display: "none"}}>
                                <InputItem labelNumber={4} className="family-input" placeholder="请输入家谱名称" clear onChange={v => {this.handleInputChange('name', v)}} value={this.state.form.name}>家谱名称：</InputItem>
                            </div>
                            <InputItem labelNumber={4} className="family-input" placeholder="请输入联系方式" clear onChange={v => {this.handleInputChange('creatorPhone', v)}} value={this.state.form.creatorPhone}>联系方式：</InputItem>
                            {this.state.isEdit ? null : <div className="family-input family-switch">
                                <div>您是否在至尊园或静园购墓？</div>
                                <div style={{
                                    display: "flex",
                                    flexFlow: "row nowrap",
                                    alignItems: "center"
                                }}>
                                    <span className="no">{this.state.form.isCreation == 1 ? "是" : "否"}</span>
                                    <Switch
                                        checked={this.state.checked}
                                        onChange={() => {
                                            this.setState({
                                                checked: !this.state.checked
                                            }, () => {
                                                if (this.state.checked) {
                                                    this.setState({
                                                        form: {...this.state.form, isCreation: 1}
                                                    });
                                                } else {
                                                    this.setState({
                                                        form: {...this.state.form, isCreation: 0}
                                                    });
                                                }
                                            });
                                        }}
                                        color="#CF9D85"
                                    />
                                </div>
                            </div>}
                            {this.state.checked && <InputItem labelNumber={5} className="family-input" placeholder="请输入墓穴使用人" clear onChange={v => {this.handleInputChange('userName', v)}} value={this.state.form.userName}>墓穴使用人：</InputItem>}
                        </div>

                        <div style={{
                            padding: "0 4px"
                        }}>
                            <div className="agreement">
                                <img src={left} alt=""/>
                                <div>
                                    <div className={this.state.isAllow ? "yes yes-confirm" : "yes"} onClick={this.changeAllow}></div>
                                    <div>我已详细阅读并同意</div>
                                </div>
                                <img src={right} alt=""/>
                            </div>
                        </div>

                        <div style={{
                            padding: "0 4px"
                        }}>
                            <div className="create-btn" onClick={this.operaBtn}>{this.state.isEdit ? "修改云家谱" : "创建云家谱"}</div>
                        </div>
                    </div>
                </div>

                {this.state.modalIsShow && <ConfirmModal closeModal={this.closeModal} childrenAllow={this.childrenAllow}/>}
            </div>
        );
    }
}

export default Index;