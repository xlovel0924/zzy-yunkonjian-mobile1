import React, {Component} from 'react';
import "./index.css"
import Nav from "../../../components/nav/nav";
import familyLogo from "@/assets/img/yun-homeTree/family-logo.png"

import {connect} from "react-redux";
import {familyList,queryFamily,GenealogyByMemberId,queryGenealogyCondition} from "@/redux/family/family.action"
import {number} from "echarts/src/export";
import {BASE_URL_STATIC} from "../../../server/service";
import defaultImg from "@/assets/img/yun-homeTree/family-logo.png"
import {Popover} from "antd-mobile";

import {getWXSign, queryGenealogyConditionAxios} from "@/server/family";

import {getAllfamilyById} from "@/utils/familyUtils";

import {localIp} from "../../../server/service";

import wx from "weixin-js-sdk";

// const wx = require("weixin-js-sdk");
const Item = Popover.Item;

@connect(
    state => {
        return {
            familyReducer: state.familyReducer
        }
    },
    { familyList,queryFamily,GenealogyByMemberId,queryGenealogyCondition }
)
class Index extends Component {
    constructor() {
        super();
        this.state = {
            familyListRes: {},
            overlay: [
                (<Item key="4" value="share" style={{fontSize: "12px"}} data-seed="logId">一键分享</Item>),
                (<Item key="5" value="my_focus" style={{fontSize: "12px"}}>我的关注</Item>),
                (<Item key="6" value="edit" style={{fontSize: "12px"}}>编辑</Item>),
                (<Item key="7" value="focus_me" style={{fontSize: "12px"}}>关注我的人</Item>),
            ],
        }
        this.allFamily = [];
        // this.overlay =  [
        //     (<Item key="4" value="share" style={{fontSize: "12px"}} data-seed="logId">一键分享</Item>),
        //     (<Item key="5" value="my_focus" style={{fontSize: "12px"}}>我的关注</Item>),
        //     (<Item key="6" value="edit" style={{fontSize: "12px"}}>编辑</Item>),
        //     (<Item key="7" value="focus_me" style={{fontSize: "12px"}}>关注我的人</Item>),
        // ]
        this.userInfo = JSON.parse(window.localStorage.getItem("user")).data
    }

    async componentDidMount() {
        await this.getFamilyList();
        await this.getAllfamily();
    }
    // 根据用户id查所有家谱
    getAllfamily = () => {
        // return queryGenealogyConditionAxios({creatorId: this.userInfo.id}).then(res => {
        //     console.log(res,"REESS");
        //     if (res.data.status == 200){
        //         this.allFamily = res.data.data;
        //         let ids = this.allFamily.map(element => {
        //             return {
        //                 id: element.id
        //             }
        //         })
        //         if (ids.includes(this.props.match.params.id)){
        //             this.setState({
        //                 overlay: [
        //                     (<Item key="4" value="share" style={{fontSize: "12px"}} data-seed="logId">一键分享</Item>),
        //                     (<Item key="5" value="my_focus" style={{fontSize: "12px"}}>我的关注</Item>),
        //                     (<Item key="6" value="edit" style={{fontSize: "12px"}}>编辑</Item>),
        //                     (<Item key="7" value="focus_me" style={{fontSize: "12px"}}>关注我的人</Item>),
        //                 ]
        //             });
        //         } else {
        //             this.setState({
        //                 overlay: [
        //                     (<Item key="4" value="share" style={{fontSize: "12px"}} data-seed="logId">一键分享</Item>),
        //
        //                 ]
        //             });
        //         }
        //     }
        // })
    }

    // 获取家谱基本信息
    getFamilyList = async () => {
        // 根据家谱id查家谱信息 
        await this.props.queryGenealogyCondition({id: this.props.match.params.id});
        console.log(this.props.familyReducer.conditionFamilyList,"lliisstt")
        if(JSON.stringify(this.props.familyReducer.conditionFamilyList) == "{}") return;
        let res = this.props.familyReducer.conditionFamilyList.data[0];
        this.setState({
            familyListRes: {...this.state.familyListRes,...res}
        });


        let isInclude = await getAllfamilyById(this.userInfo.id, this.props.match.params.id);
        console.log(isInclude," isIncludeisIncludeisInclude")
        if (isInclude) {
            this.setState({
                overlay: [
                    (<Item key="4" value="share" style={{fontSize: "12px"}} data-seed="logId">一键分享</Item>),
                    // (<Item key="5" value="my_focus" style={{fontSize: "12px"}}>我的关注</Item>),
                    (<Item key="6" value="edit" style={{fontSize: "12px"}}>编辑</Item>),
                    (<Item key="7" value="focus_me" style={{fontSize: "12px"}}>关注我的人</Item>),
                ]
            });
        } else {
            this.setState({
                overlay: [
                    (<Item key="4" value="share" style={{fontSize: "12px"}} data-seed="logId">一键分享</Item>),
                ]
            });
        }
        // 后期要用
        // // 根据用户获取家庭
        // let familyId = await this.getFamilyId();
        // // 根据家庭id获取族谱
        // await this.props.familyList({id: familyId});
        // this.setState({
        //     familyListRes: {...this.state.familyListRes,...this.props.familyReducer.familyList.data}
        // });

    //    目前先用根据用户id查家谱信息 
        // await this.props.GenealogyByMemberId({id: this.userInfo.id})
        // console.log(this.props.familyReducer.familyListByMemberId.data)
        // this.setState({
        //     familyListRes: {...this.state.familyListRes,...this.props.familyReducer.familyListByMemberId.data[this.props.familyReducer.familyListByMemberId.data.length - 1]}
        // });
    }

    // 获取家庭id
    // getFamilyId = async () => {
    //     await this.props.queryFamily({id:this.userInfo.id});
    //     let familyRes = this.props.familyReducer.family
    //     let familyId = familyRes.data[0].familyId;
    //     return familyId;
    // }

    // 跳转修改家谱页面
    editFamily = async () => {
        // 根据用户获取家庭
        // let familyId = await this.getFamilyId();

        this.props.history.replace({
            pathname: "/create-family",
            state: {
                userId: this.userInfo.id,
                genId: this.props.match.params.id,
                isEdit: true
            }
        })
    }

    // 分享到微信
    shareToWeixin = () => {
        // 获取签名
        // console.log(this.props.location,"local")
        let pathname = window.location.href.split("#")[0];
        console.log( pathname,"pathname")
        getWXSign({url: window.location.href}).then(res => {
            console.log(JSON.parse(res.data.data),"resss");

            let data = JSON.parse(res.data.data);

            window.wx.config({
                debug: true,
                appid: data.appId,
                timestamp: data.timestamp, // 必cls填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名
                jsApiList: ["onMenuShareAppMessage"] // 必填，需要使用的 JS 接口列表
            });

            window.wx.error(function(res){
                // config信息验证失败会执行 error 函数，如签名过期导致验证失败，具体错误信息可以打开 config 的debug模式查看，也可以在返回的 res 参数中查看，对于 SPA 可以在这里更新签名。
                console.log(res,"失败了")
            });

            window.wx.ready(function(){
                console.log("ready执行", window.wx)
                // config信息验证后会执行 ready 方法，所有接口调用都必须在 config 接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在 ready 函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在 ready 函数中。

                window.wx.checkJsApi({
                    jsApiList: ['onMenuShareAppMessage'], // 需要检测的 JS 接口列表，所有 JS 接口列表见附录2,
                    success: function(res) {
                        // 以键值对的形式返回，可用的 api 值true，不可用为false
                        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                        console.log(res,"onMenuShareAppMessage--Res")

                        window.wx.onMenuShareAppMessage({
                            title: '标题', // 分享标题
                            desc: '描述', // 分享描述
                            link: 'http://graveguide.zhizunyuan.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
                            imgUrl: '', // 分享图标
                            success: function () {
                                // 设置成功
                                console.log("成功")
                            },

                        })
                    }
                });

            });
        })

        console.log(this.props.location.pathname,"")


    }

    // 跳转
    gotoPush(url){
        this.props.history.push(url);
    }

    // 修改家徽
    goSelectBadge = () => {
        this.props.history.push("/house-badge")
    }

    render() {
        return (
            <div className="family-tree-detail">
                <Nav title="云家谱"  overlay={this.state.overlay} editFamily={this.editFamily} shareToWeixin={this.shareToWeixin} />
                <div className="logo">
                    {/*<img src={familyLogo} style={{*/}
                    {/*    width: "157px",*/}
                    {/*    height: "157px"*/}
                    {/*}} alt=""/>*/}
                    <div className="family-logo-out">
                        <div className="family-logo" onClick={this.goSelectBadge} style={{ padding: !this.state.familyListRes.familyCrestUrl && "0 0"}}>
                            {/*<div onClick={this.editFamily}>修改</div>*/}
                            <img src={this.state.familyListRes.familyCrestUrl ? BASE_URL_STATIC +  this.state.familyListRes.familyCrestUrl.replace(/\\/,"/") : defaultImg} alt=""/>
                        </div>
                    </div>
                    <div className="detail-info">
                        <div>
                            <div>创建人:</div>
                            <div>{this.state.familyListRes.creatorName}</div>
                        </div>
                        <div>
                            <div>创建时间:</div>
                            <div>{this.state.familyListRes.creatorTime}</div>
                        </div>
                        <div>
                            <div>联系方式:</div>
                            <div>{this.state.familyListRes.creatorPhone}</div>
                        </div>
                        <div>
                            <div>入谱人数:</div>
                            <div>{this.state.familyListRes.number}</div>
                        </div>
                    </div>
                </div>
                <div className="options">
                    <div onClick={() => this.gotoPush("/generation-map/" + this.props.match.params.id)}>家族图谱</div>
                    <div onClick={() => this.gotoPush("/family-three/" + this.props.match.params.id)}>家族纪事</div>
                    <div onClick={() => this.gotoPush("/blessings/"+this.props.match.params.id)}>许愿祈福</div>
                    <div onClick={() => this.gotoPush("/find-root")}>追根溯源</div>
                </div>
            </div>
        );
    }
}

export default Index;