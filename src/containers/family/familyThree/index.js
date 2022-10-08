import React, {Component} from 'react';
import BScroll from "@better-scroll/core";
import {withRouter} from "react-router-dom";
import "./index.css"
import Nav from "../../../components/nav/nav";

import FamilyHistories from "./familyHistories"
import FamilyPrecepts from "./familyPrecepts"
import FamilyMinutes from "./familyMinutes"

import {getAllfamilyById} from "@/utils/familyUtils";


@withRouter
class Index extends Component {
    constructor() {
        super();
        this.state = {
            curr: 0,    // 当前选中项
            height: 0,  // 内容区域高度
            isInclude: true,
            callback: null
        }

        this.tabsList = [
            {id: "0", label: "家族轶事"},
            {id: "1", label: "家风家训"},
            {id: "2", label: "族氏纪要"}
        ]

        console.log("9999")

        this.userInfo = JSON.parse(window.localStorage.getItem("user")).data 
    }

    selectTab = (id) => {
        this.setState({
            curr: id
        },() => {
            setTimeout(() => {
                this.sc.refresh()
            },500)
        });
    }

    getGoBack = (callback) => {
        console.log(callback,"baback");
        this.setState({
            callback: callback
        })
    }

    async componentDidMount() {
        let res = await getAllfamilyById(this.userInfo.id, this.props.match.params.id)
        console.log("three");
        this.setState({
            isInclude: res,
            height: window.innerHeight - 90
        }, () => {
            setTimeout(() => {
                this.sc = new BScroll('#family-three-wrapper', {
                    click: true,
                    tap: true
                });
            },500)
        });

    }

    render() {
        return (
            <div className="family-three">
                <Nav title="家族纪事" ellipsisIsShow={false} goBackToOne={this.state.callback}/>
                <div className="family-three-tab">
                    {
                        this.tabsList.map(item =>
                            <div
                                key={item.id}
                                className={item.id == this.state.curr ? "family-three-select-tab Semibold" : " tab Regular"}
                                onClick={() => this.selectTab(item.id)}
                            >{item.label}</div>
                        )
                    }
                </div>
                {/*内容区域*/}
                <div
                    id="family-three-wrapper"
                    style={{
                        height: this.state.height + "px",
                        overflow: "hidden",
                        boxSizing: "border-box"
                    }}>
                    <div style={{padding: "0px 14px"}}>
                        {this.state.curr == 0 && <FamilyHistories isInclude={this.state.isInclude} />}
                        {this.state.curr == 1 && <FamilyPrecepts getGoBack={this.getGoBack} isInclude={this.state.isInclude} />}
                        {this.state.curr == 2 && <FamilyMinutes isInclude={this.state.isInclude} />}
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;