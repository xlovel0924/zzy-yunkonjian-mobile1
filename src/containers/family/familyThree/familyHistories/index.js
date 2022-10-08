import React, {Component} from 'react';
import "./index.css"
import {withRouter} from "react-router-dom";

import date from "@/assets/img/yun-family-three/date.png"
import marks from "@/assets/img/yun-family-three/marks.png"

import {queryAnecdoteByGenealogyIdAxios} from "@/server/family"

@withRouter
class Index extends Component {

    constructor() {
        super();
        this.state = {
            historiesList: []
        }
    }

    addContent = (type,e) => {
        if (e){
            e.stopPropagation();
        }
        this.props.history.push("/add-content/" + this.props.match.params.id + "/" + type)
    }

    componentDidMount() {
        this.getList();
    }

    // 家族轶事列表
    getList = () => {
        queryAnecdoteByGenealogyIdAxios({id: this.props.match.params.id}).then(res => {
            console.log(res," res")
            if (res.data.status == 200){
                this.setState({
                    historiesList: res.data.data
                });
                console.log(this.state.historiesList,"list")
            }
        })
    }
    // 跳转详情
    gotoDetail = (currId,type) => {
        this.props.history.push(`/histories-detail/${this.props.match.params.id}/${type}/${currId}`)
    }

    render() {
        return (
            <div>
                {
                     this.state.historiesList.length !== 0 ? this.state.historiesList.map((item,index) =>
                        <div className="family-histories" key={item.id} onClick={() => this.gotoDetail(item.id,"histories")}>
                            {index != 0 && <div className="family-histories-top">
                                <img src={marks} alt=""/>
                                <img src={marks} alt=""/>
                            </div>}

                            {
                                index == 0 &&  <div className="family-precepts-title">
                                    <div style={{fontSize: "14px",fontWeight: "bold",marginBottom: "10px"}}>家族轶事</div>
                                    <div></div>
                                </div>
                            }

                            <div style={{display: "inline-block"}}>
                                <div className="family-histories-date">
                                    <div>
                                        <img style={{width: "13px",height: "13px"}} src={date} alt=""/>
                                    </div>
                                    <div style={{lineHeight: "25px"}}>
                                        {item.anecdoteTime.split(" ")[0]}
                                    </div>
                                </div>
                            </div>
                            <div className="family-histories-content not-last-child">
                                <p>{item.anecdoteTitle}</p>
                                <p>{item.anecdoteContent}</p>
                                {
                                    (index == this.state.historiesList.length - 1 && this.props.isInclude) && <div className="family-histories-btn" onClick={(e) => this.addContent("histories",e)}>
                                    添加家族轶事
                                    </div>
                                }
                            </div>
                        </div>
                    ) : <div className="family-histories" >
                             <div className="family-histories-content not-last-child" style={{marginBottom: "0",borderBottom: "none"}}>
                                 <div className="family-precepts-title">
                                     <div style={{fontSize: "14px",fontWeight: "bold"}}>家族轶事</div>
                                     <div></div>
                                 </div>
                                 <div  className='no-infos Semibold'>暂无信息</div>
                                 {this.props.isInclude && <div className="family-histories-btn" onClick={() => this.addContent("histories")}>
                                     添加家族轶事
                                 </div>}

                             </div>
                         </div>
                }
            </div>
        );
    }
}

export default Index;