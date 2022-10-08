import React, {Component} from 'react';
import "./idnex.css"
import Nav from "../../../components/nav/nav";

import HomeBackGround from "@/components/HomeBackGround"

import {queryFamilyCrestAxios} from "@/server/family";
import {BASE_URL_STATIC} from "../../../server/service";

import { editFamily } from '@/redux/family/family.action'
import {connect} from "react-redux";
import {Toast} from "antd-mobile";

@connect(
    state => ({familyReducer: state.familyReducer}),
    {editFamily}
)
class Index extends Component {
    constructor() {
        super();
        this.state = {
            badgeList: [],
            current: -1, // 当前选中项
            formData: {}
        }
    }

    componentDidMount() {
        console.log(this.props.familyReducer,"rfamily")
        this.setState({
            formData: this.props.familyReducer.conditionFamilyList.data[0]
        });
        queryFamilyCrestAxios().then(res => {
            if (res.data.status == 200){
                this.setState({
                    badgeList: res.data.data
                });
            }
        })
    }
    // 选择家辉
    selectBadge = (item) => {
        console.log(item,"item")
        this.setState({
            formData: {...this.state.formData, familyCrestUrl: item.crestUrl}
        },() => {
            console.log(this.state.formData,"DATA")
        });
    }

    // 确认
    confirmBadge = async () => {
        await this.props.editFamily(this.state.formData);
        let editFamilyRes = this.props.familyReducer.editFamily;
        if (editFamilyRes.status === 200){
            this.props.history.goBack();
        }
    }

    render() {
        return (
            <div className="house-badge">
                <Nav title="我的家徽"  ellipsisIsShow={false} />
                <HomeBackGround>
                    <div style={{height: window.innerHeight - 58 + "px",padding: "10px 40px 61px"}}>
                        <div className="house-badge-container">
                            {
                                this.state.badgeList.map((item,index) =>
                                    <div key={item.id} onClick={() => this.selectBadge(item)} className="house-badge-out" style={this.state.formData && this.state.formData.familyCrestUrl == item.crestUrl ? {backgroundColor: "rgba(232, 212, 158, 1)"} : {}}>
                                        <div className="hosue-badge-inner">
                                            <img src={BASE_URL_STATIC + item.crestUrl.replace(/\\/,"/")} alt=""/>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="house-badge-btn" onClick={() => this.confirmBadge()}>确认家徽</div>
                    </div>
                </HomeBackGround>
            </div>
        );
    }
}

export default Index;