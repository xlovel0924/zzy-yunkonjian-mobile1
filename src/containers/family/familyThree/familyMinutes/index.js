import React, {Component} from 'react';
import {Steps} from "antd-mobile";
import "./index.css"
import {withRouter} from "react-router-dom";

import {querySummaryByGenealogyIdAxios} from "@/server/family";

const Step = Steps.Step;

@withRouter
class Index extends Component {
    constructor() {
        super();
        this.state = {
            minutesList: []
        }
    }
    componentDidMount() {
        this.getMinutesList();
    }

    // 添加内容
    addContent = (type) => {
        this.props.history.push("/add-content/" + this.props.match.params.id + "/" + type)
    }

    // 获得列表
    getMinutesList = () => {
        querySummaryByGenealogyIdAxios({id: this.props.match.params.id}).then(res => {
            if (res.data.status == 200){
                this.setState({
                    minutesList: res.data.data
                });
                console.log(this.state.minutesList,"list")
            }
        })
    }

    // 跳转详情
    gotoDetail = (currId,type) => {
        this.props.history.push(`/histories-detail/${this.props.match.params.id}/${type}/${currId}`)
    }


    render() {
        return (

            <div className="family-minutes">
                <div className="family-minutes-title">族氏纪要</div>
                {this.state.minutesList.length !== 0 ?
                    this.state.minutesList.map((item,index) =>
                        <div style={index !== 0 ? {marginTop: "0"} : {marginTop: "12px"}} key={item.id}>
                            <div
                                className={index == this.state.minutesList.length - 1 ? "family-minutes-step family-minutes-step-last" : "family-minutes-step"}
                                onClick={() => this.gotoDetail(item.id,"minutes")}
                                style={{height: "82px"}}
                            >
                                <div className="family-minutes-step-top"></div>
                                <div style={{marginBottom: "10px",minHeight: "1px"}}>{item.summaryTime && item.summaryTime.split(" ")[0]}</div>
                                <div>{item.summaryContent}</div>
                            </div>
                            {/*<div className="family-minutes-step">*/}
                            {/*    <div className="family-minutes-step-top"></div>*/}
                            {/*    <div style={{marginBottom: "10px"}}>2022</div>*/}
                            {/*    <div>例：李世民:唐太宗,创造了”从谏如流,道不拾遗、夜不闭户”的贞观盛世。</div>*/}
                            {/*</div>*/}
                            {/*<div className="family-minutes-step family-minutes-step-last">*/}
                            {/*    <div className="family-minutes-step-top"></div>*/}
                            {/*    <div style={{marginBottom: "10px"}}>2022</div>*/}
                            {/*    <div>例：李世民:唐太宗,创造了”从谏如流,道不拾遗、夜不闭户”的贞观盛世。</div>*/}
                            {/*</div>*/}
                        </div>
                    )
                    :

                    <div  className='no-infos Semibold'>暂无信息</div>
                }
                {/*btn*/}
                {this.props.isInclude && <div className="family-minutes-btn" onClick={() => this.addContent("minutes")}>添加族氏纪要</div>}

            </div>
        );
    }
}

export default Index;