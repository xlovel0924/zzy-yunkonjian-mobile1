import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import "./index.css"
import Nav from "../../../components/nav/nav";
import {InputItem, Icon, Modal, Switch, DatePicker, Toast, Picker} from "antd-mobile";
import AddModal from "./addModal"
import qs from "qs";
import BScroll from "@better-scroll/core";
import moment from "moment";
import headerImg from '@/assets/img/life-biography/headportrait.png';
import {
    tMemberGenealogyAdd,
    queryMemberGenealogySon,
    queryMemberGenealogyWife,
    updateInfo, copyDataInfo,
    getMemberInfo, selectPeopleInfo,
    selectAvatar,textReviewAxios
} from "@/redux/family/family.action"

import {addCustomizationAxios} from "@/server/family.js"
import {BASE_URL_STATIC, YZFILE} from "@/server/service";

import {validateForm} from "@/utils/validate";

import {getAddRelation, getReproductive} from "@/utils/familyUtils";
import axios from "axios";

const containerRef = React.createRef();
const imgRef = React.createRef();
const FAMILY_TREE = "familyTree"

const url = require("url")

@connect(state => {
        return {
            familyReducer: state.familyReducer
        }
    },
    {
        tMemberGenealogyAdd,
        queryMemberGenealogySon,
        queryMemberGenealogyWife,
        updateInfo,selectAvatar,
        getMemberInfo,textReviewAxios,
        selectPeopleInfo,
        copyDataInfo
    })
@withRouter
class Index extends Component {
    constructor() {
        super();
        this.state = {
            value: "", // 用作子组件回显
            height: 0,
            add_edit: "",   // 是否是修改关系页面
            memberTypeTitle: "", // 标题
            modal: false,
            type: "",
            optionsModal: false,
            relationMiddle: [], // 忽悠组件的
            reproductive: ["0"], // 称呼  （忽悠组件的）
            birthday: "2022-01-01", // 生日 （忽悠组件的）
            formData: {
                sex: 2,
                firstId: null, // 第一关系id （固定本人）
                secondId: null, // 第二关系id （选择已有的传入id，不选传null）
                genealogyId: "",
                generation: "",  // 世代关系，填写当前时代关系
                avatarUrl: "",   //头像url
                birthday: "",    //	生日
                death: 1,    //	是否健在(0、是 1、否)
                memberType: "",	// 类别(0、母亲 1、父亲 2、妻子(现任) 3、妻子(前任) 4、儿子/女儿 5、自己)
                name: "",    //	人员名称
                originalAddress: "", //	祖籍
                phone: "", // 手机号
                relationshipName: "",   // 自定义关系名称
            },
            avatarPath: ""
        };

        this.rules = [
            {label: "avatarUrl", required: true, msg: "请上传头像"},
            {label: "name", required: true, msg: "请填写姓名"},
            {label: "phone", required: true, msg: "请填写手机号"},
            {label: "birthday", required: true, msg: "请选择生日"},
            {label: "originalAddress", required: true, msg: "请填写祖籍"},
        ]

        this.isFromSelectPeople = false


        this.relationData = [
            {
                label: '哥哥',
                value: '3',
            },
            {
                label: "姐姐",
                value: '5',
            },
            {
                label: "弟弟",
                value: '4',
            },
            {
                label: "妹妹",
                value: '6',
            },
        ];

        this.customData = [
            {
                label: "其他",
                value: "-2",
            },
            {
                label: '母亲',
                value: '0',
            },
            {
                label: "父亲",
                value: '1',
            },
            {
                label: "妻子",
                value: '2',
            },
            {
                label: '哥哥',
                value: '3',
            },
            {
                label: "姐姐",
                value: '5',
            },
            {
                label: "弟弟",
                value: '4',
            },
            {
                label: "妹妹",
                value: '6',
            },
            {
                label: "儿女",
                value: '7',
            },
        ]

        this.reproductiveList = [
            {
                label: "鼻祖辈",
                value: "9"
            },
            {
                label: "远祖辈",
                value: "8"
            },
            {
                label: "太祖辈",
                value: "7"
            },
            {
                label: "烈祖辈",
                value: "6"
            },
            {
                label: "天祖辈",
                value: "5"
            },
            {
                label: "高祖辈",
                value: "4"
            },
            {
                label: "曾祖辈",
                value: "3"
            },
            {
                label: "祖父辈",
                value: "2"
            },
            {
                label: "父辈",
                value: "1"
            },
            {
                label: "同辈",
                value: "0"
            },
            {
                label: "子辈",
                value: "-1"
            },
            {
                label: "孙辈",
                value: "-2"
            },
            {
                label: "曾孙辈",
                value: "-3"
            },
            {
                label: "玄孙辈",
                value: "-4"
            },
            {
                label: "来孙辈",
                value: "-5"
            },
            {
                label: "晜孙辈",
                value: "-6"
            },
            {
                label: "仍孙辈",
                value: "-7"
            },
            {
                label: "云孙辈",
                value: "-8"
            },
            {
                label: "耳孙辈",
                value: "-9"
            }
        ]
    }

    async componentDidMount() {
        console.log(this.props.familyReducer.avatarUrl,"PEOEP@@@")

        if (this.props.familyReducer.avatarUrl){
            this.setState({
                formData: {...this.state.formData, avatarUrl: this.props.familyReducer.avatarUrl}
            },() => {
                console.log(this.state.avatarUrl,"##URL")
            });
        }

        let parse = qs.parse(this.props.location.search.split("?")[1]);
        console.log(parse, "parse")
        this.setState({
            add_edit: parse.add_edit
        });

        // const obj = qs.parse(this.props.location.search.split("?")[1]);
        // let newObj = JSON.parse(JSON.stringify(obj));
        // let id = newObj.id;
        // delete newObj.id;
        // console.log(obj, "obj")
        //
        // this.setState({
        //     formData: {...this.state.formData, ...newObj}
        // }, () => {
        //     console.log(this.state.formData, "form")
        //     this.getMemberType(this.state.formData.memberType, this.state.formData.sex)

        // window.addEventListener("hashchange", (e) => {
        //     console.log(this,"Eee");
        //     let urlWithStringQuery = url.parse(e.oldURL);
        //     console.log(urlWithStringQuery.hash.split("/")[1]  == "select-people","###RRRUWEUIWQUQUW");
        //     if (urlWithStringQuery.hash.split("/")[1] == "select-people"){
        //         this.isFromSelectPeople = true
        //     } else {
        //         this.isFromSelectPeople = false
        //     }
        //
        //     this.setState({});
        // })

        setTimeout(() => {
            let selectPeopleInfo = this.props.familyReducer.selectPeopleInfo;
            let copyDataInfo = this.props.familyReducer.copyDataInfo;
            console.log(selectPeopleInfo, "selectPeopleInfo");

            console.log(this.isFromSelectPeople,"DDD@@")
            // if (this.isFromSelectPeople){
                this.setState({
                    formData: {...this.state.formData, ...copyDataInfo, ...selectPeopleInfo},
                    birthday: selectPeopleInfo.birthday ? selectPeopleInfo.birthday : "2022-01-01"
                },() => {
                    console.log(this.state.formData," famooorroDD@@");
                });
            // }
            this.setState({
                height: containerRef.current.clientHeight - 61
            });
            let sc = new BScroll('#create-family-tree-wrapper', {
                click: true,
                tap: true
            });
        }, 500)

        // });
    }

    // 清空
    clearnFormData = () => {
        this.props.selectPeopleInfo({});
        this.props.copyDataInfo({});
        this.props.selectAvatar();
    }

    // 选择兄弟姐妹关系
    selectRelation = (value) => {
        console.log(value)
        this.setState({
            formData: {...this.state.formData, memberType: value[0]},
            relationMiddle: value
        });
    }

    // 选择辈分
    selectReproductive = (value) => {
        this.setState({
            formData: {...this.state.formData, generation: value[0]},
            reproductive: value
        }, () => {
            console.log(this.state.formData, "logogogo");
        });
    }

    // 根据传来的memberType转换标题
    getTitle = (type) => {
        this.setState({
            memberTypeTitle: type
        });
    }
    // 根据传来的memberType转换标题
    getMemberType = (memberType, sex) => {
        switch (memberType) {
            case "0":
                console.log(memberType, "type")
                this.getTitle("母亲")
                break;
            case "1":
                this.getTitle("父亲")
                break;

            case "2":
                this.getTitle("妻子")
                break;
            case "4":
                this.getTitle("子女")
                break;
            default:
                return ""
        }
    }

    openModal = (type) => {
        this.setState({
            modal: true,
            type,
            value: this.state.formData[type]
        });
    }

    closeModal = () => {
        this.setState({
            modal: false
        });
    }

    setValue = (type, value) => {
        console.log(type, value)
        this.setState({
            formData: {...this.state.formData, [type]: value}
        });
    }

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
                    formData: {...this.state.formData, avatarUrl: filePath},
                    avatarPath: filePath
                });
            })


        }
    }
    // 确定修改
    confirm = async () => {

        const obj = qs.parse(this.props.location.search.split("?")[1]);
        if (obj.type === "true") {
            await this.props.updateInfo(this.state.formData);
            const updateRes = this.props.familyReducer.message;
            console.log(updateRes, "updateRes")
            if (updateRes.status === 200) {
                Toast.info("修改成功", 1, () => {
                    this.clearnFormData();
                })
            }
        } else {
            let newFormData = JSON.parse(JSON.stringify(this.state.formData));
            const {id, type, genealogyId, generation} = this.props.match.params
            newFormData.firstId = id;
            if (type >= 0) newFormData.memberType = type;
            newFormData.genealogyId = genealogyId;
            if (type != "-2") newFormData.generation = generation;
            // addCustomizationAxios

            if (this.state.add_edit == "edit") {
                if (this.state.formData.memberType == "-2") {
                    let res = await addCustomizationAxios(newFormData);
                    if (res.data.status == 200) {
                        Toast.info("添加成功", 1, () => {
                            this.clearnFormData();
                            if (this.state.add_edit == "edit") {
                                this.props.history.replace(`/familytree/${this.props.match.params.genealogyId}/${this.props.match.params.id}`)
                            } else {
                                this.props.history.replace(`/familytree/${this.props.match.params.genealogyId}/${this.props.match.params.id}`)
                            }
                        })
                    }
                } else {
                    newFormData.generation = this.props.location.state.generation
                    await this.props.tMemberGenealogyAdd(newFormData);
                    const addRes = this.props.familyReducer.addMember
                    console.log(addRes)
                    if (addRes.status === 200) {
                        Toast.info("添加成功", 1, () => {
                            this.clearnFormData();
                            if (this.state.add_edit == "edit") {
                                this.props.history.replace(`/familytree/${this.props.match.params.genealogyId}/${this.props.match.params.id}`)
                            } else {
                                this.props.history.replace(`/familytree/${this.props.match.params.genealogyId}/${this.props.match.params.id}`);
                            }
                        })
                    }
                    return;
                }
            }

            if (type == "-2" || this.state.add_edit == "edit") {
                // 为自定义时候需要加2条验证规则
                let copyRules = JSON.parse(JSON.stringify(this.rules));
                if (type == "-2"){
                    let newRule = [
                        {label: "relationshipName", required: true, msg: "请选择关系"},
                        {label: "generation", required: true, msg: "请选择辈分"}
                    ]
                    copyRules = [...copyRules, ...newRule]
                }

                let validate = validateForm(newFormData,copyRules);
                if(!validate) return;

                // 敏感词校验
                await this.props.textReviewAxios(newFormData);
                let textReviewData = this.props.familyReducer.textReviewData;
                console.log(textReviewData,"tetetetete")
                if (textReviewData.conclusionType == 2){
                    return Toast.info(textReviewData.data[0].msg, 2);
                }



                let res = await addCustomizationAxios(newFormData);
                if (res.data.status == 200) {
                    Toast.info("添加成功", 1, () => {
                        this.clearnFormData();
                        if (this.state.add_edit == "edit") {
                            this.props.history.replace(`/familytree/${this.props.match.params.genealogyId}/${this.props.match.params.id}`)
                        } else {
                            this.props.history.replace(`/familytree/${this.props.match.params.genealogyId}/${this.props.match.params.id}`);
                        }
                    })
                }
            } else {
                // 为兄弟姐妹时候需要加一条验证规则
                let copyRules = JSON.parse(JSON.stringify(this.rules));
                if (type == "-1"){
                    let newRule = [
                        {label: "memberType", required: true, msg: "请选择关系"}
                    ]
                    copyRules = [...copyRules, ...newRule]
                }

                let validate = validateForm(newFormData,copyRules);
                if(!validate) return;

                // 敏感词校验
                await this.props.textReviewAxios(newFormData);
                let textReviewData = this.props.familyReducer.textReviewData;
                console.log(textReviewData,"tetetetete")
                if (textReviewData.conclusionType == 2){
                    return Toast.info(textReviewData.data[0].msg, 2);
                }

                await this.props.tMemberGenealogyAdd(newFormData);
                const addRes = this.props.familyReducer.addMember
                console.log(addRes)
                if (addRes.status === 200) {
                    Toast.info("添加成功", 1, () => {
                        this.clearnFormData();
                        this.props.history.replace(`/familytree/${this.props.match.params.genealogyId}/${this.props.match.params.id}`);
                    })
                }
            }
        }
    }

    setChildValue = (e) => {
        this.setState({
            value: e
        });
    }

    //选择头像
    goSelectAvatar = () => {
        if (this.state.formData.avatarUrl){
            this.props.selectAvatar(this.state.formData.avatarUrl);
        }
        this.props.history.push("/select-avatar");
    }

    // 跳转选择人物页面
    pushSelectPeople = () => {
        this.props.copyDataInfo(JSON.parse(JSON.stringify(this.state.formData)));
        this.props.history.push("/select-people/" + this.props.match.params.id + "/" + this.props.match.params.genealogyId)
    }

    render() {
        return (
            <div className="create-family-tree" ref={containerRef}>
                <Nav
                    title={this.state.add_edit == "edit" ? `修改关系` : `添加${getAddRelation(this.props.match.params.type)}`}
                    clearnFormData={this.clearnFormData}/>
                <div id="create-family-tree-wrapper" style={{
                    height: this.state.height,
                    overflow: "hidden"
                }}>
                    <div>
                        <div className="tree-form">
                            {
                                this.state.add_edit !== "edit" && <div className="tree-form-item">
                                    <div className="tree-form-label">头像</div>
                                    <div className="tree-form-context" onClick={this.goSelectAvatar}>
                                        {/*<input style={{*/}
                                        {/*    opacity: 0,*/}
                                        {/*    position: "absolute",*/}
                                        {/*    width: "100%",*/}
                                        {/*}} id="file" type="file" accept="image/png, image/jpeg, image/jpg"*/}
                                        {/*       onChange={this.changeAvatarUrl}/>*/}
                                        {this.state.formData.avatarUrl ?
                                            <div style={{
                                                width: "40px",
                                                height: "40px",
                                                backgroundImage: `url(${this.state.formData.avatarUrl == "-1" ? headerImg : BASE_URL_STATIC + this.state.formData.avatarUrl.replace(/\\/, "/")})`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "cover",
                                                borderRadius: "50%"
                                            }}>
                                                {/*<img src={this.state.formData.avatarUrl} alt="" style={{*/}
                                                {/*    width: "20px",*/}
                                                {/*    height: "20px"*/}
                                                {/*}}/>*/}
                                            </div> : <div>请上传</div>}
                                        <div><Icon type="right"/></div>
                                    </div>
                                </div>
                            }

                            {
                                this.state.add_edit !== "edit" && <div className="tree-form-item">
                                    <div className="tree-form-label">姓名</div>
                                    {/*<div className="tree-form-context" onClick={() => this.openModal("name")}>*/}
                                    <div className="tree-form-context" onClick={() => this.pushSelectPeople()}>

                                        <div>{this.state.formData.name || "请输入"}</div>
                                        <div><Icon type="right"/></div>
                                    </div>
                                </div>
                            }

                            {
                                this.state.add_edit !== "edit" && <div className="tree-form-item">
                                    <div className="tree-form-label">性别</div>
                                    <div className="tree-form-context sex-switch">
                                        <div style={{
                                            display: "flex",
                                            flexFlow: "row nowrap",
                                            alignItems: "center"
                                        }}>
                                            <span className="no">{this.state.formData.sex == 1 ? "男" : "女"}</span>
                                            <Switch
                                                checked={this.state.formData.sex == "1"}
                                                onChange={(e) => {
                                                    console.log(e)
                                                    this.setState({
                                                        formData: {...this.state.formData, sex: e ? "1" : "2"}
                                                    });
                                                }}
                                                color="#CF9D85"
                                            />
                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                this.state.add_edit !== "edit" && <div className="tree-form-item">
                                    <div className="tree-form-label">手机号</div>
                                    <div className="tree-form-context" onClick={() => this.openModal("phone")}>
                                        <div>{this.state.formData.phone || "请输入"}</div>
                                        <div><Icon type="right"/></div>
                                    </div>
                                </div>
                            }

                            {
                                this.state.add_edit !== "edit" && <div className="tree-form-item">
                                    <div className="tree-form-label">生日</div>
                                    {/*<div className="tree-form-context" onClick={() => this.openModal("birthday")}>*/}
                                    {/*    <div>{this.state.formData.birthday || "请输入"}</div>*/}
                                    {/*    <div><Icon type ="right"/></div>*/}
                                    {/*</div>*/}
                                    <DatePicker
                                        mode="date"
                                        title="选择日期"
                                        minDate={new Date(1900,0,1,0,0,0)}
                                        extra={<Icon type="right"/>}
                                        value={new Date(this.state.birthday)}
                                        onChange={date => {
                                            moment.locale("zh-cn");         // zh-cn
                                            console.log(date, "date")

                                            this.setState({
                                                birthday: moment(date).format("YYYY-MM-DD 00:00:00"),
                                                formData: {
                                                    ...this.state.formData,
                                                    birthday: moment(date).format("YYYY-MM-DD 00:00:00")
                                                }
                                            }, () => {
                                                console.log(new Date(this.state.formData.birthday))
                                            })
                                        }}
                                    >
                                        <div className="tree-form-context">
                                            <div>{this.state.formData.birthday ? this.state.formData.birthday.split(" ")[0] : "请选择"}</div>
                                            <Icon type="right"/>
                                        </div>

                                    </DatePicker>
                                </div>
                            }


                            {
                                this.state.add_edit !== "edit" && <div className="tree-form-item">
                                    <div className="tree-form-label">祖籍</div>
                                    <div className="tree-form-context"
                                         onClick={() => this.openModal("originalAddress")}>
                                        <div>{this.state.formData.originalAddress || "请输入"}</div>
                                        <div><Icon type="right"/></div>
                                    </div>
                                </div>
                            }

                            {
                                this.state.add_edit == "edit" ?
                                    <div className="tree-form-item">
                                        <div className="tree-form-label">选择关系</div>
                                        <Picker
                                            data={this.customData}
                                            cols="1"
                                            value={this.state.relationMiddle}
                                            onOk={value => this.selectRelation(value)}
                                        >
                                            <div className="tree-form-context">
                                                <div>{this.state.formData.memberType ? getAddRelation(this.state.formData.memberType) : "请选择"}</div>
                                                <Icon type="right"/>
                                            </div>
                                        </Picker>
                                    </div> :

                                    this.props.match.params.type == -1 && <div className="tree-form-item">
                                        <div className="tree-form-label">选择关系</div>
                                        <Picker
                                            data={this.relationData}
                                            cols="1"
                                            value={this.state.relationMiddle}
                                            onOk={value => this.selectRelation(value)}
                                        >
                                            <div className="tree-form-context">
                                                <div>{this.state.formData.memberType ? getAddRelation(this.state.formData.memberType) : "请选择"}</div>
                                                <Icon type="right"/>
                                            </div>
                                        </Picker>
                                    </div>
                            }

                            {
                                this.state.add_edit == "edit" ?
                                    this.state.formData.memberType == "-2" &&
                                    <div className="tree-form-item">
                                        <div className="tree-form-label">关系</div>
                                        <div className="tree-form-context"
                                             onClick={() => this.openModal("relationshipName")}>
                                            <div>{this.state.formData.relationshipName || "请输入"}</div>
                                            <div><Icon type="right"/></div>
                                        </div>
                                    </div> :

                                    (this.props.match.params.type == -2 || this.state.add_edit == "edit") &&
                                    <div className="tree-form-item">
                                        <div className="tree-form-label">关系</div>
                                        <div className="tree-form-context"
                                             onClick={() => this.openModal("relationshipName")}>
                                            <div>{this.state.formData.relationshipName || "请输入"}</div>
                                            <div><Icon type="right"/></div>
                                        </div>
                                    </div>
                            }

                            {
                                this.state.add_edit == "edit" ?
                                    this.state.formData.memberType == "-2" &&
                                    <div className="tree-form-item">
                                        <div className="tree-form-label">选择辈分</div>
                                        <Picker
                                            data={this.reproductiveList}
                                            cols="1"
                                            value={this.state.reproductive}
                                            onOk={value => this.selectReproductive(value)}
                                        >
                                            <div className="tree-form-context">
                                                <div>{this.state.formData.generation ? getReproductive(this.state.formData.generation.toString()) : "请选择"}</div>
                                                <Icon type="right"/>
                                            </div>
                                        </Picker>
                                    </div> :

                                    (this.props.match.params.type == -2 || this.state.add_edit == "edit") &&
                                    <div className="tree-form-item">
                                        <div className="tree-form-label">选择辈分</div>
                                        <Picker
                                            data={this.reproductiveList}
                                            cols="1"
                                            value={this.state.reproductive}
                                            onOk={value => this.selectReproductive(value)}
                                        >
                                            <div className="tree-form-context">
                                                <div>{this.state.formData.generation ? getReproductive(this.state.formData.generation.toString()) : "请选择"}</div>
                                                <Icon type="right"/>
                                            </div>
                                        </Picker>
                                    </div>
                            }

                            {
                                this.state.add_edit !== "edit" && <div className="tree-form-item">
                                    <div className="tree-form-label">是否健在</div>
                                    <div className="tree-form-context">
                                        <div style={{
                                            display: "flex",
                                            flexFlow: "row nowrap",
                                            alignItems: "center"
                                        }}>
                                            <span className="no">{this.state.formData.death == 0 ? "是" : "否"}</span>
                                            <Switch
                                                checked={this.state.formData.death == "0" ? true : false}
                                                onChange={(e) => {
                                                    this.setState({
                                                        formData: {...this.state.formData, death: e ? "0" : "1"}
                                                    });
                                                }}
                                                color="#CF9D85"
                                            />
                                        </div>
                                    </div>
                                </div>
                            }


                            <div className="tree-edit-btn" onClick={this.confirm}>确定修改</div>

                        </div>
                    </div>
                </div>

                <AddModal modal={this.state.modal} setValue={this.setValue} closeModal={this.closeModal}
                          type={this.state.type} value={this.state.value} setChildValue={this.setChildValue}/>
            </div>
        );
    }
}

export default Index;