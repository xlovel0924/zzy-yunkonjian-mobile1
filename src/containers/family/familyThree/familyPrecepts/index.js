import React, { Component, Fragment } from 'react';
import "./index.css"
import { withRouter } from "react-router-dom";
import {
    queryHomeTrainingByGenealogyIdAxios,
    LookCelebrityFamilyTraining,
    ApiCelebrityDetails,
    ApiAddMyFmaily
} from "@/server/family";
import { Toast } from 'antd-mobile';

import { textReviewAxios} from '@/redux/family/family.action'


import {validateForm} from "@/utils/validate";
import {connect} from "react-redux";

@connect(
    state => {
        return {
            familyReducer: state.familyReducer
        }
    },
    {textReviewAxios}
)
@withRouter
class Index extends Component {

    constructor() {
        super();
        this.state = {
            preceptsList: [],
            celebrityList: [],
            currentStatus: 1, // 1_名人家训 2_我的家训
            signed: "",
            mainText: "",
            addFamilyName: '',
            addSignOff: '',
            addMainText: '',
            userDate: null,
            genealogyID: null
        }
/*
*
* memberName: this.state.addSignOff,
            parentalContent: this.state.addMainText,
            parentalTitle: this.state.addFamilyName*/
        this.rules = [
            {label: "parentalTitle", required: true, msg: "请输入家氏"},
            {label: "memberName", required: true, msg: "请输入落款"},
            {label: "parentalContent", required: true, msg: "请输入正文"}
        ]
    }

    componentDidMount() {
        this.getCelebrityFamily();
        if (localStorage.getItem('token')) {
            this.setState({
                userDate: JSON.parse(localStorage.getItem('user')).data.id
            }, () => {
                this.getMyFamily()
            })
        }
        this.setState({
            genealogyID: this.props.match.params.id
        })
    }

    // 跳转详情
    gotoDetail = (currId, type) => {
        this.props.history.push(`/histories-detail/${this.props.match.params.id}/${type}/${currId}`)
    }

    // 获取名人家训
    getCelebrityFamily = () => {
        LookCelebrityFamilyTraining({
            isCelebrity: 1
        }).then(res => {
            console.log(res, '我是名人家训')
            if (res.status === 200) {
                this.setState({
                    celebrityList: res.data.data
                })
                this.props.getGoBack(this.goBackToOne);

            }
            console.log(this.state.celebrityList)
        })
    }


    // 返回成品家训
    goBackToOne = () => {
        if (this.state.currentStatus == 0 || this.state.currentStatus == 4) {
            this.setState({
                currentStatus: 1
            })
        } else {
            this.props.history.goBack();
        }
    }
    // 根据id查询名人家训详情
    getCelebrityDetails = (id) => {
        this.setState({
            currentStatus: 0
        })
        ApiCelebrityDetails(id).then(res => {
            console.log(res)
            if (res.status === 200) {
                this.setState({
                    signed: res.data.data.memberName,
                    mainText: res.data.data.parentalContent
                })
            }
        })
    }

    // 根据id查询我的家训
    getMyFamily = () => {
        LookCelebrityFamilyTraining({
            memberId: this.state.userDate,
            genealogyId: this.state.genealogyID
        }).then(res => {
            console.log(res, '我的家训')
            if (res.status === 200) {
                this.setState({
                    preceptsList: res.data.data
                })
            }
            console.log(this.state.preceptsList, 'xxx')
        })
    }

    // 添加我的家训
    addMyFamily = async () => {

        let formData = {
            memberName: this.state.addSignOff,
            parentalContent: this.state.addMainText,
            parentalTitle: this.state.addFamilyName
        }

        let validate = validateForm(formData,this.rules);
        if (!validate) return;
        // 敏感词校验
        await this.props.textReviewAxios(formData);
        let textReviewData = this.props.familyReducer.textReviewData;
        console.log(textReviewData,"tetetetete")
        if (textReviewData.conclusionType == 2){
            return Toast.info(textReviewData.data[0].msg, 2);
        }



        ApiAddMyFmaily({
            genealogyId: this.state.genealogyID,
            memberId: this.state.userDate,
            memberName: this.state.addSignOff,
            parentalContent: this.state.addMainText,
            parentalTitle: this.state.addFamilyName
        }).then(res => {
            if (res.status === 200) {
                Toast.success('添加成功')
                this.setState({
                    currentStatus: 2,
                    addFamilyName: '',
                    addSignOff: '',
                    addMainText: ''
                })
                this.getMyFamily();
            }
        })
    }

    render() {
        return (
            <Fragment>
                <div className="family-precepts"
                    style={{ display: (this.state.currentStatus == 1 || this.state.currentStatus == 2 ? 'block' : 'none') }}>
                    <div className="family-precepts-title">
                        <div className={this.state.currentStatus == 1 ? 'active Semibold' : 'item Regular'}
                            onClick={() => {
                                this.setState({ currentStatus: 1 }, () => {
                                    this.props.getGoBack(this.goBackToOne);
                                })
                            }}>成品家训
                        </div>
                        <div className={this.state.currentStatus == 2 ? 'active Semibold' : 'item Regular'}
                            onClick={() => {
                                this.setState({ currentStatus: 2 }, () => {
                                    this.props.getGoBack(this.goBackToOne);

                                })
                            }}>我的家训
                        </div>
                    </div>
                    {/*内容*/}
                    {/* 名人家训 or 我的家训 */}
                    <div className='family-list'>
                        <div className='menu' style={{ display: (this.state.currentStatus == 1 ? 'block' : 'none') }}>
                            {this.state.celebrityList.length > 0
                                ? <ul>
                                    {this.state.celebrityList.map((item, index) => {
                                        return <Fragment key={index}>
                                            <li onClick={() => this.getCelebrityDetails(item.id)}>{item.memberName}</li>
                                        </Fragment>
                                    })}
                                </ul>
                                : <div className='no-infos Semibold'>暂无信息</div>
                            }
                        </div>
                        <div className='menu' style={{ display: (this.state.currentStatus == 2 ? 'block' : 'none') }}>
                            {this.state.preceptsList.length > 0
                                ? <Fragment>
                                    {this.state.preceptsList.map(item =>
                                        <div className="family-precepts-content" key={item.id}
                                            onClick={() => this.gotoDetail(item.id, "precepts")}>
                                            <div className="family-precepts-content-left">
                                                <div>{item.parentalTitle}</div>
                                                <div className='Semibold'>{item.memberName}</div>
                                            </div>
                                            <div className="family-precepts-content-right Regular">
                                                {item.parentalContent}
                                            </div>
                                        </div>
                                    )
                                    }</Fragment>
                                : <div className='no-infos Semibold'>暂无信息</div>
                            }

                            {/*btn*/}
                            {
                                this.props.isInclude &&
                                <div className="family-precepts-btn" onClick={() => {
                                    this.setState({ currentStatus: 4 })
                                    this.props.getGoBack(this.goBackToOne);

                                }}>
                                    添加家风家训
                                </div>
                            }
                        </div>

                    </div>
                </div>
                {/* 名人家训具体信息 */}
                <div className='family-precepts celebrity-family'
                    style={{ display: (this.state.currentStatus == 0 ? 'block' : 'none') }}>
                    <div className='part-one'>
                        <span>落款</span>
                        <span className='Regular'>{this.state.signed}</span>
                    </div>
                    <div className='part-two'>
                        <span>正文</span>
                        <span className='Regular'>{this.state.mainText}</span>
                    </div>
                </div>

                {/* 添加我的家训 */}
                <div className='family-precepts add-family'
                    style={{ display: (this.state.currentStatus == 4 ? 'block' : 'none') }}>
                    <div className='add-family-content'>
                        <div className='add-title Semibold'>添加家风家训</div>
                        <textarea type='text' placeholder='请输入家氏' value={this.state.addFamilyName} onChange={(e) => {
                            this.setState({ addFamilyName: e.target.value })
                        }} className='part-one Semibold' />
                        <textarea type='text' placeholder='请输入落款' value={this.state.addSignOff} onChange={(e) => {
                            this.setState({ addSignOff: e.target.value })
                        }} className='part-two Semibold' />
                        <textarea type='text' placeholder='请输入正文' value={this.state.addMainText} onChange={(e) => {
                            this.setState({ addMainText: e.target.value })
                        }} className='part-three Semibold' />
                        {this.props.isInclude && <button className='Semibold' onClick={() => {
                            this.addMyFamily()
                        }}>生成家训
                        </button>}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Index;