import React, {Component} from 'react';
import family from "@/assets/img/yun-homeTree/family.png"
import house from "@/assets/img/yun-homeTree/house.png"
import {
    createFamily,
    familyList,
    editFamily,
    tMemberGenealogyAdd,
    GenealogyByMemberId,
    queryFamily
} from '@/redux/family/family.action'
import {withRouter, Redirect} from 'react-router-dom'
import more from "@/assets/img/yun-homeTree/more.png"

import "./index.css"
import {Icon} from "antd-mobile";
import Nav from "../../../components/nav/nav";
import {connect} from "react-redux";
import enterIcon from '@/assets/img/enter-icon.png'

@connect(
    state => {
        return {
            familyReducer: state.familyReducer
        }
    },
    {createFamily, familyList, editFamily, tMemberGenealogyAdd, GenealogyByMemberId, queryFamily}
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

    goDetail = async () => {
        // 需要一个是否已经添加过族谱的字段
        // let isAdd = await this.getisAdd();
        // console.log(isAdd,"isAdd")
        // if(isAdd){
        //     this.props.history.push("/create-family")
        //  } else {
        //     this.props.history.push("/family-tree-detail")
        // }
        this.props.history.push("/family-tree-list")
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
            <div className="family-tree-homepage">
                <Nav ellipsisIsShow={false}/>
                <img className="family-img" src={family} alt=""/>
                <img className='family-main' src={enterIcon} alt=""  onClick={this.goDetail} />
                {/* <div className="family-main">
                    <div style={{marginRight: "9px"}}>进入</div>
                    <div style={{width: "18px"}}>
                        <img src={more} style={{width: "100%"}} alt=""/>
                    </div>
                </div> */}
                <img className="house-img" src={house}/>
            </div>
        );
    }
}

export default Index;