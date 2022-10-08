import React, {Component} from 'react';
import {Toast} from 'antd-mobile';
import {withRouter} from "react-router-dom";
import {InputItem, List, DatePicker, TextareaItem} from "antd-mobile";
import "./index.css";
import Nav from "../../../../components/nav/nav";
import moment from "moment";

import {
    createFamilyHistoryAxios, createFamilyPrecepts,
    createFamilyMinutes, getHistoriesById,
    updateHistoriesAxios, updatePreceptsAxios,
    updateMinutesAxios, getPreceptsById,
    getMinutesById
} from "@/server/family";

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
            content: "",    // 页面上的内容
            date: "",
            isEdit: false,  // 是否是修改页面
            formData: {
                anecdoteTime: "",   // 轶事时间
                anecdoteTitle: "",  // 轶事事件
                anecdoteContent: "", // 轶事内容
                parentalContent: "",    // 家训内容
                parentalTitle: "", // 家训标题
                memberName: "", // 家训名称
                summaryTime: "",    // 纪要时间
                summaryContent: "", // 纪要内容
            }
        }

        this.historyRules = [
            {label: "anecdoteTime", required: true, msg: "请选择时间"},
            {label: "anecdoteTitle", required: true, msg: "请输入事件"},
            {label: "anecdoteContent", required: true, msg: "请输入内容"},
        ]

        this.minutesRules = [
            {label: "summaryTime", required: true, msg: "请选择时间"},
            {label: "summaryContent", required: true, msg: "请输入内容"},
        ]
    }

    componentDidMount() {
        this.getIdEdit();
    }

    getIdEdit = () => {
        let currId = this.props.match.params.currId;
        this.setState({
            isEdit: currId ? true : false
        }, () => {
            if (this.state.isEdit) {
                let type = this.props.match.params.type;
                switch (type) {
                    case "histories":
                        return getHistoriesById({id: this.props.match.params.currId}).then(res => {
                            if (res.data.status == 200) {
                                this.setState({
                                    formData: {...this.state.formData, ...res.data.data},
                                    content: this.props.match.params.type == "histories" ? res.data.data.anecdoteContent :
                                        this.props.match.params.type == "precepts" ? res.data.data.parentalContent :
                                            this.props.match.params.type == "minutes" ? res.data.data.summaryContent : ""
                                });
                            }
                        })
                    case "precepts":
                        return getPreceptsById({id: this.props.match.params.currId}).then(res => {
                            if (res.data.status == 200) {
                                this.setState({
                                    formData: {...this.state.formData, ...res.data.data},
                                    content: this.props.match.params.type == "histories" ? res.data.data.anecdoteContent :
                                        this.props.match.params.type == "precepts" ? res.data.data.parentalContent :
                                            this.props.match.params.type == "minutes" ? res.data.data.summaryContent : ""
                                });
                            }
                        })
                    case "minutes":
                        return getMinutesById({id: this.props.match.params.currId}).then(res => {
                            if (res.data.status == 200) {
                                this.setState({
                                    formData: {...this.state.formData, ...res.data.data},
                                    content: this.props.match.params.type == "histories" ? res.data.data.anecdoteContent :
                                        this.props.match.params.type == "precepts" ? res.data.data.parentalContent :
                                            this.props.match.params.type == "minutes" ? res.data.data.summaryContent : ""
                                });
                            }
                        })
                }

            }
        });
    }

    // 创建家族纪要
    createMinutes = async () => {
        this.genealogyId = this.props.match.params.id;

        let obj = {...this.state.formData, genealogyId: this.genealogyId}
        let validate = validateForm(obj,this.minutesRules);
        if (!validate) return;

        // 敏感词校验
        await this.props.textReviewAxios(obj);
        let textReviewData = this.props.familyReducer.textReviewData;
        console.log(textReviewData,"tetetetete")
        if (textReviewData.conclusionType == 2){
            return Toast.info(textReviewData.data[0].msg, 2);
        }


        createFamilyMinutes(obj).then(res => {
            if (res.data.status == 200) {
                this.props.history.goBack();
            } else {
                Toast.info(res.data.message, 1);
            }
        })
    }


    // 创建家风家训
    createPrecepts = () => {
        this.genealogyId = this.props.match.params.id;
        createFamilyPrecepts({...this.state.formData, genealogyId: this.genealogyId}).then(res => {
            if (res.data.status == 200) {
                this.props.history.goBack();
            } else {
                Toast.info(res.data.message, 1);
            }
        })
    }

    // 创建家族轶事
    createHistory = async () => {
        this.genealogyId = this.props.match.params.id

        console.log(this.state.formData,"data")
        let obj = {...this.state.formData, genealogyId: this.genealogyId}
        let validate = validateForm(obj,this.historyRules);
        if (!validate) return;

        // 敏感词校验
        await this.props.textReviewAxios(obj);
        let textReviewData = this.props.familyReducer.textReviewData;
        console.log(textReviewData,"tetetetete")
        if (textReviewData.conclusionType == 2){
            return Toast.info(textReviewData.data[0].msg, 2);
        }

        createFamilyHistoryAxios(obj).then(res => {
            console.log(res, "res")
            if (res.data.status == 200) {
                this.props.history.goBack();
            } else {
                Toast.info(res.data.message, 1);
            }
        })
    }
    // 动态改变title
    getTitle = (type) => {
        switch (type) {
            case "histories":
                return "家族轶事"
            case "precepts":
                return "家风家训"
            case "minutes":
                return "族氏纪要"
        }
    }

    // 改变内容
    changeTextArea = (v) => {
        let type = this.props.match.params.type;
        switch (type) {
            case "histories":
                return this.setState({
                    content: v,
                    formData: {...this.state.formData, anecdoteContent: v}
                });
            case "precepts":
                return this.setState({
                    content: v,
                    formData: {...this.state.formData, parentalContent: v}
                }, () => {
                    console.log(this.state.content)
                })
            case "minutes":
                return this.setState({
                    content: v,
                    formData: {...this.state.formData, summaryContent: v}
                })
        }
    }

    // 修改轶事
    editHistories = async () => {
        this.genealogyId = this.props.match.params.id

        let obj = {...this.state.formData, genealogyId: this.genealogyId};
        // 非空验证
        let validate = validateForm(obj,this.historyRules);
        if (!validate) return;

        // 敏感词校验
        await this.props.textReviewAxios(obj);
        let textReviewData = this.props.familyReducer.textReviewData;
        console.log(textReviewData,"tetetetete")
        if (textReviewData.conclusionType == 2){
            return Toast.info(textReviewData.data[0].msg, 2);
        }


        updateHistoriesAxios(obj).then(res => {
            if (res.data.status == 200) {
                this.props.history.goBack();
            } else {
                Toast.info(res.data.message, 1);
            }
        })
    }

    // 修改家训
    editPrecepts = () => {
        this.genealogyId = this.props.match.params.id
        updatePreceptsAxios({...this.state.formData, genealogyId: this.genealogyId}).then(res => {
            if (res.data.status == 200) {
                this.props.history.goBack();
            } else {
                Toast.info(res.data.message, 1);
            }
        })
    }

    // 修改纪要
    editMinutes = async () => {
        this.genealogyId = this.props.match.params.id

        let obj = {...this.state.formData, genealogyId: this.genealogyId}
        // 非空验证
        let validate = validateForm(obj,this.minutesRules);
        if (!validate) return;

        // 敏感词校验
        await this.props.textReviewAxios(obj);
        let textReviewData = this.props.familyReducer.textReviewData;
        console.log(textReviewData,"tetetetete")
        if (textReviewData.conclusionType == 2){
            return Toast.info(textReviewData.data[0].msg, 2);
        }

        updateMinutesAxios(obj).then(res => {
            if (res.data.status == 200) {
                this.props.history.goBack();
            } else {
                Toast.info(res.data.message, 1);
            }
        })
    }

    //保存
    save = () => {
        let type = this.props.match.params.type
        if (this.state.isEdit) {
            switch (type) {
                case "histories":
                    return this.editHistories()
                case "precepts":
                    return this.editPrecepts()
                case "minutes":
                    return this.editMinutes()
            }
        } else {
            switch (type) {
                case "histories":
                    return this.createHistory()
                case "precepts":
                    return this.createPrecepts()
                case "minutes":
                    return this.createMinutes()
            }
        }
    }
    // 改变时间
    changeDate = (date) => {
        console.log(date.getFullYear(), "Date")
        this.props.match.params.type == "histories" ?
            this.setState({
                date,
                formData: {...this.state.formData, anecdoteTime: moment(date).format("YYYY-MM-DD 00:00:00")}
            }) :
            this.setState({
                date,
                formData: {...this.state.formData, summaryTime: moment(date).format("YYYY-MM-DD 00:00:00")}
            })
    }

    render() {
        return (
            <div className="add-content">
                <Nav title={`添加${this.getTitle(this.props.match.params.type)}`} ellipsisIsShow={false}/>
                <div className="add-content-container">
                    {/*时间选择*/}
                    {/*轶事和纪要有时间*/}
                    {(this.props.match.params.type == "histories" || this.props.match.params.type == "minutes") &&
                    <List style={{
                        borderRadius: "6px",
                        overflow: "hidden",
                        backgroundColor: "rgba(255,255,255,0.6)",
                        boxShadow: "0 1px 0 0 rgba(0, 0, 0, 0.1600)"
                    }}>
                        <DatePicker
                            value={this.state.date}
                            onChange={(date) => this.changeDate(date)}
                            mode="date"
                            extra=" "
                        >
                            <List.Item arrow="horizontal">
                                <div
                                    style={{color: this.state.formData.anecdoteTime || this.state.formData.summaryTime ? "#666666" : "#999999"}}
                                >
                                    {/*"请选择时间"*/}
                                    {this.props.match.params.type == "histories" ?
                                        this.state.formData.anecdoteTime ? this.state.formData.anecdoteTime.split(" ")[0] : "请选择时间"
                                        : this.state.formData.summaryTime ? this.state.formData.summaryTime.split(" ")[0]
                                            : "请选择时间"
                                    }
                                </div>
                            </List.Item>
                        </DatePicker>
                    </List>}

                    {/*轶事有事件*/}
                    {this.props.match.params.type == "histories" && <List style={{
                        marginTop: "12px",
                        borderRadius: "6px",
                        overflow: "hidden",
                        backgroundColor: "rgba(255,255,255,0.6)",
                        boxShadow: "0 1px 0 0 rgba(0, 0, 0, 0.1600)"
                    }}>
                        <InputItem
                            placeholder='请输入事件'
                            clear
                            value={this.state.formData.anecdoteTitle}
                            onChange={v => this.setState({formData: {...this.state.formData, anecdoteTitle: v}})}
                        >
                        </InputItem>
                    </List>}

                    {/*家训标题*/}
                    {this.props.match.params.type == "precepts" && <List style={{
                        marginTop: "12px",
                        borderRadius: "6px",
                        overflow: "hidden",
                        backgroundColor: "rgba(255,255,255,0.6)",
                        boxShadow: "0 1px 0 0 rgba(0, 0, 0, 0.1600)"
                    }}>
                        <InputItem
                            placeholder='请输入标题'
                            clear
                            value={this.state.formData.parentalTitle}
                            onChange={v => this.setState({formData: {...this.state.formData, parentalTitle: v}})}
                        >
                        </InputItem>
                    </List>}

                    {/*家训姓名*/}
                    {this.props.match.params.type == "precepts" && <List style={{
                        marginTop: "12px",
                        borderRadius: "6px",
                        overflow: "hidden",
                        backgroundColor: "rgba(255,255,255,0.6)",
                        boxShadow: "0 1px 0 0 rgba(0, 0, 0, 0.1600)"
                    }}>
                        <InputItem
                            placeholder='请输入姓名'
                            clear
                            value={this.state.formData.memberName}
                            onChange={v => this.setState({formData: {...this.state.formData, memberName: v}})}
                        >
                        </InputItem>
                    </List>}


                    <List style={{
                        marginTop: "12px",
                        borderRadius: "6px",
                        overflow: "hidden",
                        backgroundColor: "rgba(255,255,255,0.6)",
                        boxShadow: "0 1px 0 0 rgba(0, 0, 0, 0.1600)"
                    }}>
                        <TextareaItem
                            placeholder="输入内容"
                            // value={this.state.formData.anecdoteContent}
                            value={this.state.content}
                            // onChange={v => this.setState({formData: {...this.state.formData, anecdoteContent: v}})}
                            onChange={v => this.changeTextArea(v)}
                            rows={10}
                        />
                    </List>
                    <div style={{position: "relative", marginTop: "10px"}}>
                        <div className="add-content-save-btn" onClick={() => this.save()}>保存</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;