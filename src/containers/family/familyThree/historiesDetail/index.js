import React, {Component} from 'react';
import "./index.css"
import {withRouter} from "react-router-dom";
import Nav from "../../../../components/nav/nav";
import HomeBackGround from "@/components/HomeBackGround"
import {getHistoriesById, getPreceptsById, getMinutesById} from "@/server/family"

import {getAllfamilyById} from "@/utils/familyUtils";

@withRouter
class Index extends Component {
    constructor() {
        super();
        this.state = {
            title: "",  // 标题
            historiesList: {},  // 家族轶事
            preceptsList: {},   // 家风家训
            minutesList: {},    // 纪要
            isInclude: true,
        }

        this.userInfo = JSON.parse(window.localStorage.getItem("user")).data
    }

    async componentDidMount() {

        let type = this.props.match.params.type
        switch (type) {
            case "histories":
                return this.getHistoriesDetail()
            case "precepts":
                return this.getPrecepts()
            case "minutes":
                return this.getMinutes()
        }

        let res = await getAllfamilyById(this.userInfo.id, this.props.match.params.id);
        this.setState({
            isInclude: res
        });
    }

    // 获取家族轶事详情
    getHistoriesDetail = () => {
        getHistoriesById({id: this.props.match.params.currId}).then(res => {
            console.log(res, "hisRRREEESSS")
            if (res.data.status == 200) {
                this.setState({
                    historiesList: res.data.data
                });
            }
        })
    }

    // 获取家风家训
    getPrecepts = () => {
        getPreceptsById({id: this.props.match.params.currId}).then(res => {
            if (res.data.status == 200) {
                this.setState({
                    preceptsList: res.data.data
                });
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

    // 获取纪要
    getMinutes = () => {
        getMinutesById({id: this.props.match.params.currId}).then(res => {
            if (res.data.status == 200) {
                this.setState({
                    minutesList: res.data.data
                });
            }
        })
    }

    // 编辑
    gotoEdit = () => {
        this.props.history.push(`/add-content/${this.props.match.params.id}/${this.props.match.params.type}/${this.props.match.params.currId}`)
    }


    render() {
        return (
            <div className="histories-detail">
                <Nav title={this.getTitle(this.props.match.params.type)} ellipsisIsShow={false}/>
                <HomeBackGround>
                    <div>
                        {
                            this.props.match.params.type == "histories" &&
                            <div className="histories-detail-content">
                                <div>
                                    <div
                                        className="histories-detail-content-time">{this.state.historiesList.anecdoteTime && this.state.historiesList.anecdoteTime.split(" ")[0]}</div>
                                    <div
                                        className="histories-detail-content-title">{this.state.historiesList.anecdoteTitle}</div>
                                    <div
                                        className="histories-detail-content-content">{this.state.historiesList.anecdoteContent}</div>
                                </div>
                                {this.state.isInclude && <div className="family-histories-btn" onClick={() => this.gotoEdit()}>
                                    编辑
                                </div>}
                            </div>
                        }

                        {
                            this.props.match.params.type == "precepts" &&
                            <div className="histories-detail-content">
                                <div>
                                    <div
                                        className="histories-detail-content-time">{this.state.preceptsList.parentalTitle}</div>
                                    <div
                                        className="histories-detail-content-title">{this.state.preceptsList.memberName}</div>
                                    <div
                                        className="histories-detail-content-content">{this.state.preceptsList.parentalContent}</div>
                                </div>
                                {this.state.isInclude && <div className="family-histories-btn" onClick={() => this.gotoEdit()}>
                                    编辑
                                </div>}
                            </div>
                        }

                        {
                            this.props.match.params.type == "minutes" &&
                            <div className="histories-detail-content">
                                <div>
                                    <div
                                        className="histories-detail-content-time">{this.state.minutesList.summaryTime && this.state.minutesList.summaryTime.split(" ")[0]}</div>
                                    <div
                                        className="histories-detail-content-title"></div>
                                    <div
                                        className="histories-detail-content-content">{this.state.minutesList.summaryContent}</div>
                                </div>
                                {this.state.isInclude && <div className="family-histories-btn" onClick={() => this.gotoEdit()}>
                                    编辑
                                </div>}
                            </div>
                        }
                    </div>

                </HomeBackGround>
            </div>
        );
    }
}

export default Index;