import React, {Component} from 'react';
import {Icon,Accordion} from "antd-mobile";
import { withRouter } from 'react-router-dom';
import "./index.css";
import icon from '../../../../assets/img/yun-family-tree-list/icon.png'

import yun from "@/assets/img/yun-family-tree-list/yun.png" 

@withRouter
class Index extends Component {
    constructor() {
        super();
    }
    // 点击关注
    concer = async (item) => {
        await this.props.addConcer({
            genealogyId: item.id,
            memberId: this.props.userInfo.id
        })
        await this.props.getList(0);
        // await this.props.getConcerList();
    }
    // 展开、收起取消关注
    showColl = (item) => {
        let type = !item.isShow;
         this.props.changeList(item.id,"isShow",type);
         this.props.changeList(item.id,"isDown",!item.isDown); 
    }

    // 取消关注
    cancle = async (item) => {
        await this.props.deleteConcer({id: item.relationId});
        // await this.props.getList();
        if (this.props.curr == 2){
            await this.props.getList(0);
        } else {
            await this.props.getConcerList();
        }
    }
    // 跳转详情页面
    goDetail = (id) => {
        this.props.history.push("/family-tree-detail/" + id);
    }

    render() {
        return (
            <>
            {
                this.props.list.length !== 0 ?
                this.props.list.map(item =>
                    <div className="list-template" key={item.id}>
                        {/*左*/}
                        <div className="left">
                            <div className="template-pic">
                                <div className="template-name">
                                    <div>{item.name}</div>
                                </div>
                                <img src={yun} alt=""/>
                            </div>
                            {/*中*/}

                            <div key={item.id} className="template-info">
                                <div>{item.name}</div>
                                <div style={{whiteSpace:"nowrap"}}>创建时间：{item.creatorTime ? item.creatorTime.split(" ")[0] : null}</div>
                                <div>创建人：{item.creatorName}</div>
                                {
                                    this.props.curr !== 0 ?
                                    <div>
                                        {item.isConcern == 1 && <div onClick={() => this.concer(item)}>+关注</div>}
                                        {(item.isConcern == 0 || item.isConcern == null) && <div onClick={() => this.showColl(item)}>
                                            已关注
                                            <img src={icon} alt='icon图标' style={{width:"10px",height:"6px",transition: "all 1s"}} className={item.isDown ? 'down' : 'up'}/>
                                            {/*<Icon size="xxs" type={item.isDown ? "down" : "up"}  />*/}
                                        </div>}
                                        <div style={item.isDown ? {display: "none"} : {display: "block"}} onClick={() => this.cancle(item)}>取消关注</div>
                                    </div>
                                        :
                                        null
                                }

                            </div>
                        </div>

                        {/*右*/}
                        {
                            item.isShield == 0 || item.isShield == null ?
                            <div className="template-more" onClick={() => this.goDetail(item.id)}>
                                <Icon type="right" size="xxs" color="#C79F89"/>
                            </div> : null
                        }
                    </div>
                ) : <div className="no-message">暂无信息</div>
            }
            </>
        );
    }
}

export default Index;