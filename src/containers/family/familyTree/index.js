import React, { Component } from 'react';
import "./index.css"
import * as echarts from 'echarts';
import Nav from "../../../components/nav/nav";
import fatherSelect from "@/assets/img/yun-family-tree/father-select.png";
import mother from "@/assets/img/yun-family-tree/mother.png";
import bro from "@/assets/img/yun-family-tree/bro.png";
import wife from "@/assets/img/yun-family-tree/wife.png";
import headerImg from '@/assets/img/life-biography/headportrait.png';


import doc from "@/assets/img/yun-family-tree/doc.png";
import son from "@/assets/img/yun-family-tree/son.png";

import other from "@/assets/img/yun-family-tree/other.png";
import edit from "@/assets/img/yun-family-tree/edit.png";

import {getAllfamilyById} from "@/utils/familyUtils";

import { InputItem, Popover, Modal } from "antd-mobile";


import { queryRelationshipByMemberIdAxios, getMemberInfoAxios } from "@/server/family.js";
import { BASE_URL_STATIC } from "../../../server/service";

const Item = Popover.Item;

class Index extends Component {

    constructor() {
        super();
        this.state = {
            searchList: [],
            search: "",
            topLeft: 0, // 展开
            topHeight: 0,
            centerLeft: 0,
            centerHeight: 0,
            bottomLeft: 0,
            bottomHeight: 0,

            allTopArr: [],
            allCenterArr: [],
            allBottomArr: [],

            isNone: "none",
            // topIsNone: "none",
            // centerIsNone: "none",
            // bottomIsNone: "none",


            isShow: true,
            modalIsShow: false, // 添加弹层
            allData: [],   // 所有数据
            links: [],  // 关系
            listModal: false,   // 列表弹窗
            allMemberList: [],  // 家谱所有人员列表

            overlay: [
                (<Item key="4" value="add_relation" style={{ fontSize: "12px" }} data-seed="logId">添加我的族人</Item>),
                (<Item key="5" value="look_relation" style={{ fontSize: "12px" }}>查看族人关系</Item>),
                (<Item key="6" value="edit_relation" style={{ fontSize: "12px" }}>修改族人关系</Item>)
            ]
        }

        this.topIndex = 0;
        this.centerIndex = 0;
        this.bottomIndex = 0;

        this.modalRef = React.createRef();

        this.data = [];

        this.links = [];

        // this.overlay = [
        //     (<Item key="4" value="add_relation" style={{ fontSize: "12px" }} data-seed="logId">添加我的族人</Item>),
        //     (<Item key="5" value="look_relation" style={{ fontSize: "12px" }}>查看族人关系</Item>),
        //     (<Item key="6" value="edit_relation" style={{ fontSize: "12px" }}>修改族人关系</Item>)
        // ];

        this.generation = "";  // 要传递到下一个页面的世代

        this.id = ""; // 当前人节点id

        this.userInfo = JSON.parse(window.localStorage.getItem("user")).data

    }


    getRandomNum = (Min, Max) => {
        let Range = Max - Min;
        let Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }


    async componentDidMount() {
        this.getMemberInfo();

        let isInclude = await getAllfamilyById(this.userInfo.id, this.props.match.params.id);
        console.log(isInclude,"WEWEQWWQ")
        if (isInclude) {
            this.setState({
                overlay: [
                    (<Item key="4" value="add_relation" style={{ fontSize: "12px" }} data-seed="logId">添加我的族人</Item>),
                    (<Item key="5" value="look_relation" style={{ fontSize: "12px" }}>查看族人关系</Item>),
                    (<Item key="6" value="edit_relation" style={{ fontSize: "12px" }}>修改族人关系</Item>)
                ]
            });
        } else {
            this.setState({
                overlay: [
                    (<Item key="5" value="look_relation" style={{ fontSize: "12px" }}>查看族人关系</Item>),
                ]
            });
        }

        this.chartDom = document.getElementById('main');
        this.myChart = echarts.init(this.chartDom);

        // 获取图谱信息
        this.getMyInfo();

        // this.option = {};


        this.option = {
            title: {

                text: "关\n系\n图\n谱",
                 borderColor: "rgba(68, 68, 68, 0.8)",
                borderWidth: 1,
                left: 28,
                borderRadius: 4,
                top: 26,
                padding: [8, 6],
                textStyle: {
                    lineHeight: 25,
                }
            },
            tooltip: {
                formatter: function (x) {
                    return x.data.des;
                }
            },
            scaleLimit: {
                min: 0.4,
                max: 3
            },
            series: [
                {
                    type: "graph",
                    layout: "none",
                    symbolSize: 50,
                    roam: true,
                    lineStyle: {
                        color: "rgba(207, 157, 133, 0.66)"
                    },
                    nodeScaleRatio: 0,
                    label: {
                        show: true,
                        position: "bottom",
                        formatter: function (params) {
                            return params.data.name;
                        },
                        color: "#fff",
                        backgroundColor: "rgba(207, 157, 133, 0.66)",
                        borderWidth: 46,
                        borderRadius: 15,
                        padding: [2, 6, 2, 6]
                    },
                    zoom: 0.1,
                    center: [1, 0],
                    // edgeSymbol: ['circle', 'arrow'],
                    // edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        fontSize: 20
                    },
                    data: [],
                    links: [],
                }
            ]
        }


        this.myChart.on("click", (param) => this.selectBtn(param));



        this.myChart.getDom().style.height = window.innerHeight - 58 + "px"


        this.myChart.resize()

        // })
    }

    // 搜索
    handleInputChange = (key, value) => {
        this.setState({
            [key]: value
        }, () => {
            let data = {
                name: value
            }
            this.getMemberInfo(data);
        });
    }

    selectBtn = (param) => {
        console.log(param, "param")
        let nowClick = 0;
        this.getMyInfo(param.data.id)
        // this.props.history.replace(`/familytree/${this.props.match.params.id}/${param.data.id}`)

    }
    // 打开人员列表
    openListModal = () => {
        this.setState({
            listModal: true
        }, () => {
            this.myChart.getDom().style.height = window.innerHeight - 58 - document.querySelector(".am-modal").clientHeight + "px"
            this.myChart.resize();
        });
    }

    // 关闭人员列表
    closeListModal = () => {
        this.setState({
            listModal: false
        }, () => {
            this.myChart.getDom().style.height = window.innerHeight - 58 + "px";
            this.myChart.resize()
        });
    }

    // 点击遮罩
    clickModal = () => {
        this.setState({
            modalIsShow: !this.state.modalIsShow
        });
    }

    getInput = () => {
        return <div style={{ width: "264px" }}>
            <InputItem
                type='text'
                placeholder='请输入搜索内容'
                clear
                onChange={v => {
                    this.handleInputChange('search', v)
                }}
                value={this.state.search}
                labelNumber={1}
                className="search"
            >
            </InputItem>
        </div>
    }

    // 根据家谱id获取家谱人员列表
    getMemberInfo = (obj = {}) => {
        getMemberInfoAxios({ genealogyId: this.props.match.params.id, ...obj }).then(res => {
            if (res.data.status == 200) {
                if (JSON.stringify(obj) == "{}") {
                    this.setState({
                        allMemberList: res.data.data
                    });
                } else {
                    this.setState({
                        searchList: res.data.data
                    });
                }
            }
        })
    }

    // 加载更多
    clickTopMore = () => {
        if (this.topIndex + 3 >= this.state.allTopArr.length) {
            this.topIndex = 0;
        } else if (this.topIndex < this.state.allTopArr.length) {
            this.topIndex += 3;
        }

        this.getMyInfo(this.id)

    }

    clickCenterMore = () => {
        console.log(this.centerIndex, " centerIndex")
        // if (this.centerIndex == 0){
        //     this.centerIndex -= 1;
        // }

        if (this.centerIndex + 7 >= this.state.allCenterArr.length) {
            this.centerIndex = 0;
            console.log("来这里")
        } else if (this.centerIndex < this.state.allCenterArr.length) {
            this.centerIndex == 0 ? this.centerIndex += 6 : this.centerIndex += 7;
            console.log(this.centerIndex, "来这里2")
        }

        this.getMyInfo(this.id, true);
    }

    clickBottomMore = () => {
        if (this.bottomIndex + 3 >= this.state.allBottomArr.length) {
            this.bottomIndex = 0;
        } else if (this.bottomIndex < this.state.allBottomArr.length) {
            this.bottomIndex += 3;
        }

        this.getMyInfo(this.id)

    }


    getImgData = (imgSrc, sex) => {

        var fun = function (resolve) {
            const canvas = document.createElement('canvas');
            const contex = canvas.getContext('2d');
            const img = new Image();
            img.crossOrigin = '';
            img.onload = function () {
                let center = {
                    x: img.width / 2,
                    y: img.height / 2
                }
                var diameter = img.width;
                canvas.width = diameter + 30;
                canvas.height = diameter + 30;
                contex.clearRect(0, 0, diameter, diameter);
                contex.save();
                contex.beginPath();
                let radius = img.width / 2;
                contex.arc(radius + 12, radius + 12, radius, 0, 2 * Math.PI); //画出圆
                contex.clip(); //裁剪上面的圆形
                let userAgent = navigator.userAgent;
                console.log(userAgent,"angenet")

                if (userAgent.includes("iPhone") || userAgent.includes("iPad")){
                    contex.drawImage(img, center.x - radius - 12, center.y - radius - 12, diameter + 6, diameter + 6, 0, 0,
                        diameter + 30, diameter + 24); // 在刚刚裁剪的园上画图
                } else {
                    contex.drawImage(img, center.x - radius - 12, center.y - radius - 12, diameter + 12, diameter + 12, 0, 0,
                        diameter + 12, diameter + 24); // 在刚刚裁剪的园上画图
                }


                contex.restore(); // 还原状态
                contex.closePath()

                contex.beginPath();

                contex.arc(radius + 12, radius + 12, radius + 10, 0, 2 * Math.PI); //画出圆
                contex.strokeStyle = sex == 1 ? "#00CBFF" : "#FF4777";
                contex.lineWidth = 5;
                contex.stroke();

                resolve(canvas.toDataURL('image/png', 1))
            }
            img.src = imgSrc;
        }

        var promise = new Promise(fun);

        return promise
    }

    pubdata = (newData) => {
        var picList = [];
        console.log(newData, "Data");

        for (let item of newData) {
            let p = this.getImgData(item.symbol, item.sex);
            p.then(image => {
                item.symbol = "image://" + image;
                this.option.series[0].data = newData;
                console.log(this.option.series[0].data)
                this.option && this.myChart.setOption(this.option);
                // this.model = this.myChart.getModel().getSeriesByIndex(0).getData()._itemLayouts;
                // console.log(this.model,"model")
            })
            // if (item.symbol){
            //     picList.push(p)
            // }
        }

        // this.option && this.myChart.setOption(this.option)

        // Promise.all(picList).then(image => {
        //     for (let item of newData){
        //         item.symbol = "image://" + image;
        //         this.option.series[0].data = newData;
        //         console.log(this.option.series[0].data)
        //     }
        // }).catch(e => {
        //     console.log("zhixingl3")
        // }).finally(() => {
        //     console.log("最后")
        // })

        // for (var i = 0; i < newData.length; i++) {
        //     var object = newData[i];
        //     var p =  this.getImgData(object.symbol);
        //     p.then(image => {
        //         newData[i].symbol = "image://" + image;
        //         this.option.series[0].data = newData;
        //     })
        //     // picList.push(p);
        //
        // }


        // Promise.all(picList).then(function (images) {
        //     console.log(images,"RRTT")
        //     // for (var i = 0; i < images.length; i++) {
        //     //     var img = "image://" + images[i];
        //     //     newData[i].symbol = img;
        //     // }
        //     // myChart.setOption({
        //     //     series: [{
        //     //         data: newData
        //     //     }]
        //     // })
        // })

    }


    // 获取跟当前人有关系的人员信息
    getMyInfo = (id = this.props.match.params.nodeId, type = false) => {

        queryRelationshipByMemberIdAxios({ id }).then(res => {
            console.log(res, "r@@@res")
            // console.log(id,"000999")
            this.id = id;

            if (res.data.status == 200) {
                // let links = [
                //     {
                //         source: "1570300570672775170",
                //         target: "1570290753195409409",
                //     }
                // ]

                let newData = JSON.parse(JSON.stringify(res.data.data));
                console.log(newData, "DATAAT")


                for (let item of newData) {
                    if (this.id == item.id) {
                        console.log("进来了")
                        this.generation = item.generation
                        item.symbolSize = 60
                    }
                }

                this.setState({
                    allTopArr: newData.filter(item => item.generation > this.generation),
                    allCenterArr: newData.filter(item => item.generation == this.generation),
                    allBottomArr: newData.filter(item => item.generation < this.generation)
                });

                // this.allTopArr = newData.filter(item => item.generation > this.generation);
                // this.allCenterArr = newData.filter(item => item.generation == this.generation);
                // this.allBottomArr = newData.filter(item => item.generation < this.generation);

                let topArr = this.state.allTopArr.slice(this.topIndex, this.topIndex + 3);
                let centerArr = this.state.allCenterArr.slice(this.centerIndex, this.centerIndex + 7);
                let bottomArr = this.state.allBottomArr.slice(this.bottomIndex, this.bottomIndex + 3);

                // 找出当前人世代
                for (let item of newData) {
                    if (this.id == item.id) {
                        console.log("进来了")
                        // this.generation = item.generation

                        // let arr = centerArr.filter(v => v.id == this.id);
                        let arr = [];

                        if (type) {
                            for (let i of centerArr) {
                                console.log(i, "iii")
                                if (i.id == item.id) {
                                    arr.push(i);
                                }
                            }

                            if (arr.length == 0) {
                                centerArr[centerArr.length - 1] = item
                                if (this.centerIndex != 0) this.centerIndex -= 1;
                            }
                        } else {
                            for (let i of centerArr) {
                                console.log(i, "iii")
                                if (i.id == item.id) {
                                    arr.push(i);
                                }
                                if (arr.length == 0) {
                                    centerArr[centerArr.length - 1] = item
                                    console.log(centerArr, "topCenter")
                                }
                            }
                        }
                    }
                }

                console.log(this.topIndex, "topIndex")
                console.log(topArr, "topArrr");
                console.log(centerArr, " centerArr");
                console.log(bottomArr, " bottomArr");

                this.myChart.on("finished", () => {

                    // top
                    let topConvertToPixel = [];
                    let centerConvertToPixel = [];
                    let bottomConvertToPixel = [];

                    if (topArr.length > 0 && topArr.length != 2) {
                        topConvertToPixel = this.myChart.convertToPixel({ seriesIndex: 0 }, [topArr[topArr.length - 1].x, topArr[topArr.length - 1].y + 11]);
                    } else if (topArr.length > 0 && topArr.length == 2) {
                        topConvertToPixel = this.myChart.convertToPixel({ seriesIndex: 0 }, [topArr[0].x, topArr[0].y + 11]);
                    }

                    // center
                    if (centerArr.length > 0) {
                        centerConvertToPixel = this.myChart.convertToPixel({ seriesIndex: 0 }, [centerArr[0].x, centerArr[0].y + 11]);
                    }
                    // bottom
                    if (bottomArr.length > 0 && bottomArr.length != 2) {
                        bottomConvertToPixel = this.myChart.convertToPixel({ seriesIndex: 0 }, [bottomArr[bottomArr.length - 1].x, bottomArr[bottomArr.length - 1].y + 11]);
                    } else if (bottomArr.length > 0 && bottomArr.length == 2) {
                        bottomConvertToPixel = this.myChart.convertToPixel({ seriesIndex: 0 }, [bottomArr[0].x, bottomArr[0].y + 11]);

                    }

                    this.setState({
                        topLeft: topConvertToPixel.length > 0 ? topConvertToPixel[0] : 0,
                        topHeight: topConvertToPixel.length > 0 ? topConvertToPixel[1] + 58 : 0,
                        centerHeight: centerConvertToPixel.length > 0 ? centerConvertToPixel[1] + 58 : 0,
                        centerLeft: centerConvertToPixel.length > 0 ? centerConvertToPixel[0] : 0,
                        bottomHeight: bottomConvertToPixel.length > 0 ? bottomConvertToPixel[1] + 58 : 0,
                        bottomLeft: bottomConvertToPixel.length > 0 ? bottomConvertToPixel[0] : 0,
                        isNone: "block"
                    });



                    console.log(topConvertToPixel, "convertToPixel")
                })


                // 上层半径
                let topR = 30;
                //
                console.log(newData, "newDAta")

                let newDataRender = [...topArr, ...centerArr, ...bottomArr]

                let links = [];

                let left = topArr.length % 2 == 0 ? 0 : -1;
                let right = 0;

                let cRight = -1;
                let cLeft = -1

                let bLeft = bottomArr.length % 2 == 0 ? 0 : -1
                let bRight = 0;
                console.log(newDataRender, " newDataRender")
                newDataRender.forEach(item => {
                    if (item.relationId) {
                        links.push({
                            source: item.id,
                            target: item.parentId,
                            label: {
                                show: true,
                                formatter: item.relationName,
                                fontSize: 9,
                                color: "rgba(107, 107, 107, 1)"
                            }
                        })
                    }

                    // 上边
                    if (item.generation > this.generation) {
                        for (let key in topArr) {
                            if (item.id == topArr[key].id) {
                                if (topArr.length == 1) {
                                    item.x = 0;
                                    item.y = topR * -1;
                                    break;
                                }


                                let deg = 180 / (topArr.length + 5);
                                // if (topArr.length > 2) {
                                //     deg = 180 / (topArr.length + 1)
                                // } else {
                                //     deg = 90 / topArr.length
                                // }


                                console.log(deg, "deggg")

                                if (key % 2 == 0) {
                                    left += 1

                                    if (topArr.length % 2 == 0) {
                                        item.x = 0 + topR * Math.cos((90 - deg * left + 5) * Math.PI / 180)
                                        item.y = 0 + topR * Math.sin((90 - deg * left + 5) * Math.PI / 180)
                                    } else {
                                        item.x = 0 + topR * Math.cos((90 - deg * left) * Math.PI / 180)
                                        item.y = 0 + topR * Math.sin((90 - deg * left) * Math.PI / 180)
                                    }

                                    if (item.y > 0) item.y = item.y * -1;

                                } else {
                                    right += 1;
                                    console.log(Math.sin(90 - deg * right) * topR, "right")
                                    // item.x = -Math.sin(90 - deg * right) * topR;
                                    if (topArr.length % 2 == 0) {
                                        item.x = -(0 + topR * Math.cos((90 - deg * right + 5) * Math.PI / 180))
                                        item.y = 0 + topR * Math.sin((90 - deg * right + 5) * Math.PI / 180)
                                    } else {
                                        item.x = -(0 + topR * Math.cos((90 - deg * right) * Math.PI / 180))
                                        item.y = 0 + topR * Math.sin((90 - deg * right) * Math.PI / 180)
                                    }
                                    if (item.y > 0) item.y = item.y * -1;

                                }
                            }
                        }


                    }
                    // 中间
                    if (item.generation == this.generation) {

                        let deg = 90 / 3

                        let centerY = Math.sin(deg) * topR;

                        for (let key in centerArr) {
                            if (item.id == centerArr[key].id) {
                                if (this.id == item.id) {
                                    item.x = 1;
                                    item.y = 0;
                                    break;
                                } else {
                                    if (key % 2 == 0) {
                                        cLeft += 1;

                                        // if (cLeft == 1) cLeft = -1
                                        if (cLeft == 2) cLeft = -1
                                        item.x = 0 + topR * Math.cos((deg * cLeft) * Math.PI / 180)

                                        item.y = 0 + topR * Math.sin((deg * cLeft) * Math.PI / 180)

                                    } else {
                                        cRight += 1;

                                        // if (cRight == 1) cRight = -1
                                        if (cRight == 2) cRight = -1

                                        item.x = -(0 + topR * Math.cos((deg * cRight) * Math.PI / (180)))

                                        item.y = 0 + topR * Math.sin((deg * cRight) * Math.PI / (180))
                                    }
                                }

                            }
                        }


                    }

                    console.log(item.generation, "item.generation");
                    console.log(this.generation, " this.genera")

                    // 下边
                    if (item.generation < this.generation) {
                        console.log(bottomArr, "Boytom@@")
                        for (let key in bottomArr) {
                            if (item.id == bottomArr[key].id) {
                                if (bottomArr.length == 1) {
                                    item.x = 0;
                                    item.y = topR;
                                    break;
                                }


                                let deg = 180 / (bottomArr.length + 5);
                                // if (topArr.length > 2) {
                                //     deg = 180 / (topArr.length + 1)
                                // } else {
                                //     deg = 90 / topArr.length
                                // }


                                console.log(deg, "deggg")

                                if (key % 2 == 0) {
                                    bLeft += 1

                                    if (bottomArr.length % 2 == 0) {
                                        item.x = 0 + topR * Math.cos((90 - deg * bLeft + 5) * Math.PI / 180)
                                        item.y = 0 + topR * Math.sin((90 - deg * bLeft + 5) * Math.PI / 180)
                                    } else {
                                        item.x = 0 + topR * Math.cos((90 - deg * bLeft) * Math.PI / 180)
                                        item.y = 0 + topR * Math.sin((90 - deg * bLeft) * Math.PI / 180)
                                    }

                                    if (item.y < 0) item.y = item.y * -1;

                                } else {
                                    bRight += 1;
                                    console.log(Math.sin(90 - deg * bRight) * topR, "right")

                                    if (bottomArr.length % 2 == 0) {
                                        item.x = -(0 + topR * Math.cos((90 - deg * bRight + 5) * Math.PI / 180))
                                        item.y = -(0 + topR * Math.sin((90 - deg * bRight + 5) * Math.PI / 180))
                                    } else {
                                        item.x = -(0 + topR * Math.cos((90 - deg * bRight) * Math.PI / 180))
                                        item.y = -(0 + topR * Math.sin((90 - deg * bRight) * Math.PI / 180))
                                    }
                                    if (item.y < 0) item.y = item.y * -1;

                                }
                            }
                        }



                    }
                })

                console.log(newDataRender, "data")
                this.setState({
                    allData: newDataRender,
                    links: links
                });

                this.option.series[0].data = this.state.allData;
                this.option.series[0].links = this.state.links;


                console.log(this.option.series[0].data, "@@data")
                let tLength = topArr.length;
                let cLength = centerArr.length;
                let bLength = bottomArr.length;

                if (
                    (tLength <= 3 && cLength == 1 && bLength == 0) ||
                    (tLength == 0 && cLength == 1 && bLength <= 3) ||
                    (tLength == 0 && cLength == 2 && bLength == 0) ||
                    (tLength == 1 && cLength == 2 && bLength == 0) ||
                    (bLength == 1 && cLength == 2 && tLength == 0)
                ) {
                    this.option.scaleLimit.min = 0.4
                } else if (tLength <= 3 && cLength == 2 && bLength <= 3) {
                    this.option.scaleLimit.min = 0.8
                } else {
                    this.option.scaleLimit.min = 1
                }

                // if (topArr.length + centerArr.length + bottomArr.length >= 4) {
                //     this.option.scaleLimit.min = 0.5
                // } else {
                //     this.option.scaleLimit.min = 0.4
                // }
                // 中心点

                console.log(this.id, "000999")
                for (let item of newDataRender) {
                    // if (item.avatarUrl){
                    item.symbol = `${item.avatarUrl ? BASE_URL_STATIC + item.avatarUrl.replace(/\\/, "/") : headerImg}`
                    // }

                    item.itemStyle = {
                        color: "#fff",
                        // borderWidth: 2,
                        // borderType: "solid"
                    }


                    if (item.id == this.id) {
                        this.option.series[0].center = [item.x, item.y]
                    }
                }


                this.pubdata(newDataRender)
                // this.option && this.myChart.setOption(this.option);
                // this.myChart.restore()
                console.log(this.myChart, "option")

                // let id = this.props.match.params.nodeId;
                // for (let item of res.data.data) {
                //     this.generation = item.generation
                //
                // }
            }
        })
    }

    // 点击添加关系
    clickAddRelation(e) {
        e.stopPropagation();
        e.persist()
        console.log(e, "eeee");
        /*
        * 类别(0、母 1、父 2、妻 3、兄 4、弟 5、姐 6、妹 7、儿) 空是兄弟姐妹
        * */
        switch (e.target.id) {
            // /:id?/:genealogyId?/:generation?/:type?/:sex?
            case "add_father":
                return this.props.history.push("/create-family-tree/" + this.id + "/" + this.props.match.params.id + "/" + this.generation + "/1" + "/1")
            case "add_mother":
                return this.props.history.push("/create-family-tree/" + this.id + "/" + this.props.match.params.id + "/" + this.generation + "/0" + "/2")
            case "add_bro":
                return this.props.history.push("/create-family-tree/" + this.id + "/" + this.props.match.params.id + "/" + this.generation + "/-1")
            case "add_wife":
                return this.props.history.push("/create-family-tree/" + this.id + "/" + this.props.match.params.id + "/" + this.generation + "/2" + "/2")
            case "add_doc":
                return this.props.history.push("/create-family-tree/" + this.id + "/" + this.props.match.params.id + "/" + this.generation + "/7" + "/2")
            case "add_son":
                return this.props.history.push("/create-family-tree/" + this.id + "/" + this.props.match.params.id + "/" + this.generation + "/7" + "/1")
            case "add_edit":
                return this.props.history.push("/select-people/" + this.id + "/" + this.props.match.params.id + "?type=edit")
            // 自定义
            case "add_other":
                return this.props.history.push("/create-family-tree/" + this.id + "/" + this.props.match.params.id + "/" + this.generation + "/-2")
        }
    }

    // 修改跳转
    gotoEdit = () => {
        this.props.history.push({
            pathname: "/select-people/" + this.id + "/" + this.props.match.params.id,
            search: "?type=edit",
            state: {generation: this.generation}
        });
    }


    render() {
        return (
            <div className="family-tree">
                {this.state.search !== "" && <div className="family-tree-search-list">
                    {
                        this.state.searchList.length > 0 ? this.state.searchList.map(item =>
                            <div key={item.id} className="family-tree-search-item" onClick={() => this.selectBtn({ data: item, dataType: "node" })}>
                                {item.name}
                            </div>) : <div style={{ textAlign: "center", lineHeight: "100px" }}>暂无信息</div>
                    }
                </div>}
                <div className="family-tree-add-modal" style={{ display: this.state.modalIsShow ? "block" : "none" }}
                    onClick={this.clickModal}>
                    <div className="add-modal-item" onClick={e => this.clickAddRelation(e)}>
                        <div className="add-modal-item-item" style={{ width: "101px", left: "18px", zIndex: 1 }}>
                            <img src={fatherSelect} id="add_father" alt="" />
                        </div>
                        <div className="add-modal-item-item" style={{ width: "101px", left: "124px", zIndex: 1 }}>
                            <img src={mother} id="add_mother" alt="" />
                        </div>
                        <div className="add-modal-item-item" style={{ width: "52px", top: "61px", zIndex: 1 }}>
                            <img src={bro} id="add_bro" alt="" />
                        </div>
                        <div className="add-modal-item-item"
                            style={{ width: "52px", top: "61px", left: "191px", zIndex: 1 }}>
                            <img src={wife} id="add_wife" alt="" />
                        </div>
                        <div className="add-modal-item-item"
                            style={{ width: "101px", top: "162px", left: "124px", zIndex: 1 }}>
                            <img src={doc} id="add_doc" alt="" />
                        </div>
                        <div className="add-modal-item-item"
                            style={{ width: "101px", top: "162px", left: "18px", zIndex: 1 }}>
                            <img src={son} id="add_son" alt="" />
                        </div>
                        <div className="add-modal-item-item"
                            style={{ width: "137px", top: "52px", left: "52px", zIndex: 2 }}>
                            <img src={other} id="add_other" alt="" />
                        </div>
                        <div className="add-modal-item-item"
                            style={{ width: "137px", top: "123px", left: "52px", zIndex: 2 }}>
                            <img src={edit} id="add_edit" alt="" />
                        </div>


                    </div>
                </div>
                <Nav title={this.getInput()} overlay={this.state.overlay} clickModal={this.clickModal}
                    openListModal={this.openListModal} gotoEdit={this.gotoEdit} />
                <div id="main" style={{ height: "0" }}></div>

                {/* top more*/}
                {
                    this.state.allTopArr.length > 3 && <div style={{
                        width: "59px",
                        backgroundColor: "#CF9D85",
                        position: "absolute",
                        top: this.state.topHeight + "px",
                        left: this.state.topLeft + "px",
                        color: "#fff",
                        transform: "   transLateX(-50%)",
                        borderRadius: "15px",
                        textAlign: "center",
                        padding: "5px 0",
                        fontSize: "9px",
                        display: this.state.isNone
                    }}
                        onClick={this.clickTopMore}
                    >
                        展开更多
                    </div>
                }

                {/* center more */}
                {
                    this.state.allCenterArr.length > 7 && <div style={{
                        width: "59px",
                        backgroundColor: "#CF9D85",
                        position: "absolute",
                        top: this.state.centerHeight + "px",
                        left: this.state.centerLeft + "px",
                        color: "#fff",
                        transform: " transLateX(-50%)",
                        borderRadius: "15px",
                        textAlign: "center",
                        padding: "5px 0",
                        fontSize: "9px",
                        display: this.state.isNone
                    }}
                        onClick={this.clickCenterMore}
                    >
                        展开更多
                    </div>
                }
                {/*bottom more*/}
                {
                    this.state.allBottomArr.length > 3 && <div style={{
                        width: "59px",
                        backgroundColor: "#CF9D85",
                        position: "absolute",
                        top: this.state.bottomHeight + "px",
                        left: this.state.bottomLeft + "px",
                        color: "#fff",
                        transform: " transLateX(-50%)",
                        borderRadius: "15px",
                        textAlign: "center",
                        padding: "5px 0",
                        fontSize: "9px",
                        display: this.state.isNone
                    }}
                        onClick={this.clickBottomMore}
                    >
                        展开更多
                    </div>
                }

                <Modal
                    popup
                    visible={this.state.listModal}
                    // onClose={this.onClose('modal2')}
                    animationType="slide-up"
                    wrapClassName="modal-wrapper-style"
                    className="modal-style"
                    maskClosable
                    onClose={this.closeListModal}
                    id="modal"
                >
                    <div style={{ padding: "6px 8px 14px 21px" }}>
                        <div style={{
                            fontSize: "11px",
                            display: "flex",
                            flexFlow: "row nowrap",
                            justifyContent: "space-between",
                            color: "#CF9D85",
                            marginBottom: "14px",
                        }}>
                            <div style={{ fontWeight: "bold" }}>族人列表</div>
                            <div style={{ fontSize: "13px" }} onClick={this.closeListModal}>×</div>
                        </div>
                        <div style={{ overflow: "auto" }}>
                            <div className="list-modal">
                                {
                                    this.state.allMemberList.map(item =>
                                        <div style={{
                                            marginRight: "3px",
                                            borderRadius: "3px",
                                            padding: "9px 8px 7px",
                                            textAlign: "center",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            alignItems: " center"
                                        }} key={item.id} onClick={() => {
                                            this.selectBtn({ data: item, dataType: "node" })
                                        }}>
                                            <div style={{
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "50%",
                                                border: item.sex == 1 ? "1px solid #00CBFF" : "1px solid #FF4777",
                                                overflow: "hidden"
                                            }}>
                                                <img
                                                    style={{ width: "100%" }}
                                                    src={item.avatarUrl ? BASE_URL_STATIC + item.avatarUrl.replace(/\\/, "/") : headerImg}
                                                    alt="" />
                                            </div>
                                            <div style={{
                                                width: "47px",
                                                backgroundColor: "#CF9D85",
                                                borderRadius: "4px",
                                                color: "#fff",
                                                fontSize: "9px",
                                                fontWeight: "bold",
                                                padding: "6px 10px",
                                                marginTop: "5px"
                                            }}>
                                                {item.name}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        {/*{*/}
                        {/*    this.state.allData.map(item =>*/}
                        {/*        <div style={{*/}
                        {/*            marginRight: "20px",*/}
                        {/*            marginBottom: "20px"*/}
                        {/*        }} key={item.id} onClick={() => {*/}
                        {/*            this.selectBtn({data: item, dataType: "node"})*/}
                        {/*        }}>{item.name}</div>*/}
                        {/*    )*/}
                        {/*}*/}
                    </div>
                </Modal>

                {/*<div style={{*/}
                {/*    height: "100px",*/}
                {/*    backgroundColor: "#fff",*/}
                {/*    display: "flex",*/}
                {/*    flexFlow: "row wrap",*/}

                {/*}}>*/}
                {/*    {*/}

                {/*    }*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default Index;