import React, {Component} from 'react';
import "./index.css";
import Nav from "../../../components/nav/nav";
import {Toast} from "antd-mobile";
import axios from "axios";
import {connect} from "react-redux";
import {selectAvatar, copyDataInfo} from "../../../redux/family/family.action";

import {BASE_URL_STATIC} from "@/server/service";

const FAMILY_TREE = "familyTree"

@connect(
    state => ({familyReducer: state.familyReducer}),
    {selectAvatar, copyDataInfo}
)
class Index extends Component {
    constructor() {
        super();
        this.state = {
            avatarUrl: ""
        }
    }

    componentDidMount() {
        this.setState({
            avatarUrl: this.props.match.params.avatarUrl
        });
    }
    // 上传头像
    changeAvatarUrl = (e) => {
        e.persist();
        console.log(e.target.files, "eeeee")
        console.log(e.files, "files")
        if (e.target.files && e.target.files[0]) {
            // let reader = new FileReader();
            // let f = document.getElementById('file').files[0];

            // 校验文件格式
            const reg = /\.(jpg|jpeg|png|JPG|PNG)$/;
            if (!reg.test(e.target.value)) {
                return Toast.info("请上传.png/.jpg/.jpeg格式的图片");
            }


            // 转换成formData格式上传
            const formData = new FormData();
            formData.append("file", e.target.files[0]);
            formData.append("customPath", FAMILY_TREE);

            axios.post(BASE_URL_STATIC + "commodity/StaticFile/imageUpload", formData).then(res => {
                console.log(res, "res,then");
                let filePath = res.data.data.data;
                console.log(filePath, "path");
                this.setState({
                    // formData: {...this.state.formData, avatarUrl: filePath},
                    // avatarPath: filePath
                    avatarUrl: filePath
                });

                // this.props.selectAvatar(filePath)
            })


        }
    }

    // 设置头像
    saveAvatar = () => {
        if (!this.state.avatarUrl){
            Toast.info("请上传头像",1)
            return;
        }

        // this.props.selectAvatar(this.state.avatarUrl);
        this.props.copyDataInfo({avatarUrl: this.state.avatarUrl})
        this.props.history.goBack();
    }

    render() {


        return (
            <div className="upload-img">
                <Nav title="上传头像" ellipsisIsShow={false}/>
                <div style={{padding: "30px 13px"}}>
                    <div style={ !this.state.avatarUrl ? {
                        height: "493px",
                        backgroundColor: "rgba(255,255,255,0.6)",
                        color: "#3A394D",
                        fontSize: "18px",
                        fontWeight: "bold",
                        letterSpacing: "2px",
                        textAlign: "center",
                        lineHeight: "493px",
                        position: "relative"
                    } : {
                        width: "100%",
                        height: "317px",
                        padding: "8px 0",
                        textAlign: "center",
                        backgroundColor: "rgba(238, 220, 183, 0.6)",
                        position: "absolute",
                        top: "50%",
                        left: "0",
                        transform: "translateY(-50%)",
                        boxSizing: "border-box"
                    }}>

                        <input
                            style={{
                                opacity: 0,
                                position: "absolute",
                                width: "100%",
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0
                            }}
                            id="file"
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={this.changeAvatarUrl}
                        />
                        {
                            this.state.avatarUrl ?
                                <div style={{
                                    width: "300px",
                                    height: "300px",
                                    // backgroundImage: `url(${this.state.formData.avatarUrl == "-1" ? headerImg : BASE_URL_STATIC + this.state.formData.avatarUrl.replace(/\\/, "/")})`,
                                    backgroundImage: `url(${ this.state.avatarUrl && BASE_URL_STATIC + this.state.avatarUrl.replace(/\\/, "/") })`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    borderRadius: "50%",
                                    position: "relative",
                                    left: "50%",
                                    zIndex: "-1",
                                    transform: "translateX(-50%)"
                                }}>
                                    {/*<img src={this.state.formData.avatarUrl} alt="" style={{*/}
                                    {/*    width: "20px",*/}
                                    {/*    height: "20px"*/}
                                    {/*}}/>*/}
                                </div> : <div>请上传图片</div>
                        }
                    </div>
                    <div className={this.state.avatarUrl ? "upload-img-btn-select" : ""}>
                        <div className={ "upload-img-btn"} onClick={this.saveAvatar}>设为头像</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;