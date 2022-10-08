import React, {Component} from 'react';
import family from "@/assets/img/yun-homeTree/family.png"
import house from "@/assets/img/yun-homeTree/house.png";
import topUl from "@/assets/img/yun-space-time-mail/spaceTimeMailTopUl.png";
import bottomUl from "@/assets/img/yun-space-time-mail/spaceTimeMailBottomUl.png";
import { createFamily, familyList,editFamily,tMemberGenealogyAdd,GenealogyByMemberId,queryFamily} from '@/redux/family/family.action'
import { withRouter, Redirect } from 'react-router-dom'


import "./index.css"
import {Icon} from "antd-mobile";
import Nav from "../../../components/nav/nav";
import {connect} from "react-redux";

@connect(
    state => {
        return {
            familyReducer: state.familyReducer
        }
    },
    {createFamily,familyList,editFamily,tMemberGenealogyAdd,GenealogyByMemberId,queryFamily}
)
@withRouter
class Index extends Component {
    constructor() {
        super();
        // 是否添加
        this.state = {
            isAdd: true
        }
        this.userInfo = JSON.parse(window.localStorage.getItem("user")).data
    }

    gotoListPage = async () => {
        this.props.history.push("/space-time-mail-list")
    }

    // 判断是否已经添加过
    getisAdd = async () => {
        await this.props.GenealogyByMemberId({id: this.userInfo.id})
        if (this.props.familyReducer.familyListByMemberId.data.length > 0) {
            return false;
        }
        return true;
    }

    render() {
        return (
            <div className="spaceTime-mail-homepage">
                <Nav ellipsisIsShow={false}/>
                <img className="top-ul-main" src={topUl} alt="img"/>
                <div className='space-time-mail-homeText'></div>
                <div className='space-time-mail-homeBtn' onClick={this.gotoListPage}></div>
                <img className="bottom-ul-img" src={bottomUl} alt='img' />
            </div>
        );
    }
}

export default Index;