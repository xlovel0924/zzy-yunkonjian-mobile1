import React, {Component} from 'react';
import "./index.css";
import Nav from "../../../components/nav/nav";
import HomeBackGround from "@/components/HomeBackGround";
import {connect} from "react-redux";
import {selectAvatar,copyDataInfo} from "../../../redux/family/family.action";

import {queryTAvatarConditionAxios} from "@/server/family";
import {BASE_URL_STATIC} from "@/server/service";

@connect(
    state => ({familyReducer: state.familyReducer}),
    {selectAvatar,copyDataInfo}
)
class Index extends Component {

    constructor() {
        super();
        this.state = {
            avatarList: [],
            avatarUrl: "", // 背景墙
        }
    }

    componentDidMount() {
        this.getDefaultAvatars();
    }

    // 获取默认头像
    getDefaultAvatars = () => {
        //	图片状态（0、默认头像 1、旧头像
        queryTAvatarConditionAxios({avatarType: 0}).then(res => {
            if (res.data.status == 200) {
                this.setState({
                    avatarList: res.data.data,

                    // avatarUrl: BASE_URL_STATIC + res.data.data[0].avatarUrl.replace(/\\/, "/")
                });
            }
        })
    }

    // 点击头像
    clickAvatar = (item) => {
        // this.props.selectAvatar(item.avatarUrl);
        this.props.history.push(`/upload-img/${item.avatarUrl}`);

        // this.setState({
        //     avatarUrl: BASE_URL_STATIC + item.avatarUrl.replace(/\\/, "/")
        // });
    }

    // 上传头像
    gotoUploadImg = () => {
        this.props.history.push("/upload-img");
    }

    render() {

        // let avatarUrl = this.props.familyReducer.avatarUrl;
        let avatarUrl = this.props.familyReducer.copyDataInfo.avatarUrl;


        return (
            <div className="select-avatar">
                <Nav title="选择头像" ellipsisIsShow={false}/>
                <HomeBackGround>
                    <div style={{height: window.innerHeight - 58 + "px",paddingBottom: "100px"}}>
                        {/* 北京墙*/}
                        <div className="select-avatar-top">
                            {avatarUrl && <div>当前头像</div>}
                            {avatarUrl && <img src={BASE_URL_STATIC + avatarUrl.replace(/\\/, "/")} alt=""/>}
                            {!avatarUrl && <p
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%,-50%)",
                                    fontWeight: "bold"
                                }}
                            >请上传或选择头像</p>}
                        </div>

                        <div className="select-avatar-item">
                            <div>
                                <div>选择头像</div>
                                <p></p>
                                {/*<div onClick={this.gotoUploadImg}>上传头像</div>*/}
                            </div>
                            {/* 列表*/}
                            <div>
                                {
                                    this.state.avatarList.map(item =>
                                        <div key={item.id} className="select-avatar-pic"
                                             onClick={() => this.clickAvatar(item)}>
                                            <img src={BASE_URL_STATIC + item.avatarUrl.replace(/\\/, "/")} alt=""/>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </HomeBackGround>
            </div>
        );
    }
}

export default Index;