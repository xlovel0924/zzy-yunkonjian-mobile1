import React, { Component } from 'react';
import "./index.css"
import down from "@/assets/img/yun-home/down.png"
import search from "@/assets/img/yun-home/search.png"
import scanning from "@/assets/img/yun-home/scanning.png"
import banner from "@/assets/img/yun-home/banner.png"
import store from "@/assets/img/yun-home/store.png"
import service from "@/assets/img/yun-home/service.png"
import martyrs from "@/assets/img/yun-home/martyrs.png"
import AR from "@/assets/img/yun-home/AR.png"
import VR from "@/assets/img/yun-home/VR.png"
import tombstone from '@/assets/img/yun-home/supreme-icon1.png'
import timespace from '../../assets/img/yun-home/supreme-icon2.png'
import moreRight from '@/assets/img/yun-home/more-right.png'

import axios from "axios";
import { withRouter, Redirect } from 'react-router-dom'
import { isShow, getAllCityAndPic, setCurrentCity, getAllRoute, addRecords } from "@/redux/index/index.action"
import { connect } from 'react-redux';
import Tabbar from "../../components/tabbar"
import HomeBackGround from "../../components/HomeBackGround"
import Form from '@/components/form';
import { InputItem, Toast } from "antd-mobile";
import Memorial from "./Components/Memorial";
import BScroll from "@better-scroll/core";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import { BASE_URL, BASE_URL_STATIC } from "../../server/service";
import qs from "qs";
import Date from './Components/Date';
import { querySpecialHolidayReminders } from '../../server/homePage';
import { cloudService } from '../../server/cloud'
import { Carousel, WingBlank } from 'antd-mobile';

const tabbarRef = React.createRef();

@connect(
    state => {
        return {
            indexReducer: state.indexReducer
        }
    },
    { isShow, getAllCityAndPic, setCurrentCity, getAllRoute, addRecords }
)
@Form
@withRouter
class Index extends Component {
    constructor() {
        super();
        this.state = {
            search: "",
            city: "上海",
            cityList: [],
            cityAndPicList: {},
            currPicList: [],
            allRouteList: [],    // 所有外部链接列表
            // indexRouteList: [], // 首页的外部链接4
            smallStoreUrl: "",  // 至尊微店url
            VRUrl: "",  // VRurl
            ARUrl: "",  // AR url
            SpecialDate: '',
            isShow: true,
            selectedIndex: 1,
            isImplement: false // token存在_true or token不存在_false
        }

        this.modules = [Autoplay]

        this.serviceRef = React.createRef();

        this.userInfo = JSON.parse(window.localStorage.getItem("user")) ? JSON.parse(window.localStorage.getItem("user")).data : null;

    }

    navigatorTo = (url) => {
        // console.log(this.props)
        this.props.history.push(url)
    }
    // 子组件触发
    getCityAndPic = ({ city, picture }) => {

    }

    getCityPicList = async () => {
        await this.props.getAllCityAndPic();
        let res = this.props.indexReducer.cityAndPicList
        // let res = await axios.get(BASE_URL + 'cityPicture/tCityPicture/getAll')
        // await this.props.getCityPicList(res.data);

        console.log(this.props, "proppoop$$")
        console.log(res, "Res")
        let city = this.props.indexReducer.currentCity
        if (!res.data) return;
        let picArr = res.data[city];
        console.log(picArr, "@@ARR")
        this.setState({
            city,
            currPicList: [...picArr]
        }, () => {
            console.log(this.state.currPicList, "@@PIC");
        });
    }

    getAllRouteList = async () => {
        await this.props.getAllRoute();
        let res = this.props.indexReducer.allRouteList;
        let smallStoreUrl;
        let VRUrl;
        let ARUrl;
        // 后期需要优化，做成动态展示
        for (let item of res.data) {
            if (item.serviceName === "至尊微店") {
                smallStoreUrl = item.serviceUrl
            }

            if (item.serviceName === "VR游园") {
                VRUrl = item.serviceUrl
            }

            if (item.serviceName === "AR导航") {
                ARUrl = item.serviceUrl
            }
        }

        this.setState({
            allRouteList: [...res.data],
            smallStoreUrl,
            VRUrl,
            ARUrl
        });
    }

    async componentDidMount() {
        await this.getCityPicList();
        await this.getAllRouteList();
        await this.getSpecialDate();


        console.log(navigator.userAgent, '我想要判断机型')
        console.log(localStorage.getItem('token'), '我是token')
    }

    // 页面跳转
    openPageNavigator = () => {
        if (localStorage.getItem('token')) {
            this.props.addRecords({ personnelId: this.userInfo && this.userInfo.id, behaviorType: "功能使用", button: "至尊微店" })
            this.goOutRoute(this.state.smallStoreUrl)
        }else{
            return ;
        }
    }


    handleInputChange = (key, v) => {
        this.setState({
            [key]: v,
        })
    }

    getIndex = (e) => {
        e.preventDefault();
    }
    // 聚焦后调转
    inputFocus = () => {
        this.props.history.push("/search")
        // console.log(this.props,"propss")
    }

    goFamilyTree = () => {
        this.props.history.push("/familytree")
    }
    // 选择地址
    selectAddress = () => {
        this.props.history.push({
            pathname: "/select-address",
            // search: qs.stringify({city})
        })
    }

    // 跳转尾部链接
    goOutRoute = (url) => {
        // window.location.href = url
        window.open(url, "_self")
    }

    // 获取特殊日期
    getSpecialDate = () => {
        return querySpecialHolidayReminders(0).then(res => {
            if (res.status === 200) {
                this.setState({
                    SpecialDate: res.data.data
                })
            }
        })
    }

    // VR导购跳转
    pageVR = (name) => {
        cloudService(name).then(res => {
            if (res.status === 200) {
                window.open(res.data.data.serviceUrl, "_self");
            }
        })
    }

    render() {
        return (
            <div className="home">
                {/*顶部*/}
                <div className="top">
                    <div style={{ marginRight: "15px", width: "50px", display: "flex", alignItems: "center" }} onClick={this.selectAddress}>
                        <span style={{ marginRight: "4px", fontWeight: "bold", fontSize: "15px", whiteSpace: "nowrap" }}>{this.state.city}</span>
                        <img src={down} style={{ width: "8px", height: "7px" }} />
                    </div>
                    <div style={{ width: "100%" }}>
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
                            extra={<img src={scanning} style={{ width: "18px", height: "18px", marginRight: "9px" }}
                                alt="" />}
                            onFocus={this.inputFocus}
                        >
                            <img src={search} style={{ width: "12px", height: "12px" }} alt="" />
                        </InputItem>
                    </div>
                </div>
                <HomeBackGround>
                    <div style={{ paddingBottom: "61px" }}>
                        <div>
                            {/*banner*/}
                            <div className="banner">
                                {/*<img style={{*/}
                                {/*    width: "100%"*/}
                                {/*}} src={banner} alt=""/>*/}
                                {this.state.currPicList.length > 0 &&
                                    <WingBlank>
                                        <Carousel
                                            autoplay
                                            infinite
                                            dots={true}
                                            dotActiveStyle={{backgroundColor:"rgba(255, 255, 255, 1)"}}
                                            dotStyle={{backgroundColor:"rgba(255, 255, 255, 0.6)"}}
                                            autoplayInterval={2000}
                                        >

                                            {
                                                this.state.currPicList.map((item, index) =>
                                                    <div className="v-item" key={index}>
                                                        <img style={{ width: "100%" }}
                                                            src={BASE_URL_STATIC + item.pictureUrl.replace(/\\/, "/")}
                                                        />
                                                    </div>
                                                )
                                            }
                                        </Carousel>
                                    </WingBlank>
                                }
                                {/* <Swiper
                                    modules={this.modules}
                                    slidesPerView={1}
                                    onSlideChange={() => console.log('slide change')}
                                    onSwiper={(swiper) => console.log(swiper)}
                                    loop
                                    autoplay={{ delay: 3000 }}
                                >

                                    {
                                        this.state.currPicList.length > 0 && this.state.currPicList.map((item, index) =>
                                            <SwiperSlide key={index}>
                                                <img style={{ width: "100%"}} src={BASE_URL_STATIC + item.pictureUrl.replace(/\\/, "/")} alt="" />
                                            </SwiperSlide>
                                        )
                                    }
                                </Swiper> */}
                            </div>
                            {/*通知*/}
                            <div style={{
                                padding: "8px 19px 0px 19px"
                            }}>
                                <div className="notice">
                                    <span className='Regular' style={{
                                        borderRight: "1px solid #B4B2B2",
                                        paddingRight: "9px",
                                        marginRight: "9px",
                                        fontWeight: "bold",
                                        color: "#333333",
                                        fontSize: "14px",
                                    }}>特殊日期提醒</span>
                                    <span className='Regular' style={{
                                        color: "#777777",
                                        fontSize: "12px"
                                    }}>{this.state.SpecialDate}</span>
                                </div>
                            </div>
                        </div>
                        {/*园区服务*/}
                        <div style={{ padding: '0px 15px' }}>
                            <div className="park-service" onClick={this.getIndex}>
                                <div className='park-title'>
                                    <div className='left'>园区服务</div>
                                    <div className='right Regular' style={{ fontSize: "12px" }}>
                                        {/* 农历 天干地支 */}
                                        <Date />
                                        {/* 阳历 */}
                                    </div>
                                </div>
                                {/*<div>园区内专业人士提供一站式服务备份</div>*/}
                                <div className="service-list">
                                    <div onClick={() => {
                                        this.props.addRecords({ personnelId: localStorage.getItem('token') && this.userInfo && this.userInfo.id, behaviorType: "功能使用", button: "至尊微店" })
                                        this.goOutRoute(this.state.smallStoreUrl)
                                    }}>
                                        <img src={store} alt="" />
                                        <div className='Regular'>至尊微店</div>
                                    </div>
                                    <div onClick={() => {
                                        this.props.addRecords({ personnelId: localStorage.getItem('token') && this.userInfo && this.userInfo.id, behaviorType: "功能使用", button: "AR导航" })
                                        this.goOutRoute(this.state.ARUrl)
                                    }}>
                                        <img src={AR} alt="" />
                                        <div className='Regular'>AR导航</div>
                                    </div>
                                    <div onClick={() => {
                                        this.props.addRecords({ personnelId: localStorage.getItem('token') && this.userInfo && this.userInfo.id, behaviorType: "功能使用", button: "在线祭扫" })
                                        this.navigatorTo("/cloud-martyrs")
                                    }}>
                                        <img src={martyrs} alt="" style={{
                                            width: "20px",
                                            height: "30px"
                                        }} />
                                        <div className='Regular'>在线祭扫</div>
                                    </div>
                                    <div onClick={() => {
                                        this.props.addRecords({ personnelId: localStorage.getItem('token') && this.userInfo && this.userInfo.id, behaviorType: "功能使用", button: "VR游园" })
                                        this.goOutRoute(this.state.VRUrl)
                                    }}>
                                        <img src={VR} alt="" />
                                        <div className='Regular'>VR游园</div>
                                    </div>
                                    <div onClick={() => {
                                        this.props.addRecords({ personnelId: localStorage.getItem('token') && this.userInfo && this.userInfo.id, behaviorType: "功能使用", button: "自助办理" })
                                        this.navigatorTo("/clound-service")
                                    }}>
                                        <img src={service} alt="" />
                                        <div className='Regular'>自助办理</div>
                                    </div>
                                </div>
                            </div>
                            {/*云纪念*/}
                            <div className='park-memorial' ref={this.serviceRef}>
                                <div className="mark" id="mark">
                                    <div className='mark-title' id="title">
                                        <span className='left'>云纪念</span>
                                        <span className='right Light' onClick={() => this.setState({ isShow: !this.state.isShow })}>
                                            查看更多
                                            <img src={moreRight} />
                                        </span>
                                    </div>
                                    {/*云纪念选项*/}
                                    <Memorial isShow={this.state.isShow} addRecords={this.props.addRecords} />
                                </div>
                            </div>

                            <div className='park-memorial'>
                                <div className="mark zhizun">
                                    <div className='mark-title'>
                                        <span className='left'>至尊科技</span>
                                        {/* <span className='right'>{">"}</span> */}
                                    </div>
                                    {/*至尊科技选项*/}
                                    <div className='science-list'>
                                        <div className='item' onClick={() => {
                                            this.props.addRecords({ personnelId: localStorage.getItem('token') && this.userInfo && this.userInfo.id, behaviorType: "功能使用", button: "VR导购" })
                                            this.pageVR('VR导购')
                                        }}>
                                            <div className='left'>
                                                <div className='big-title'>VR导购</div>
                                                <div className='desc Regular'>随时随地看</div>
                                            </div>
                                            <img src={tombstone} alt="" />
                                        </div>
                                        <div className='item' onClick={() => this.navigatorTo('/no-found')}>
                                            <div className='left'>
                                                <div className='big-title'>数字孪生</div>
                                                <div className='desc Regular'>虚拟现实</div>
                                            </div>
                                            <img src={timespace} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </HomeBackGround >
                <Tabbar ref={tabbarRef} initScroll={this.initScroll}></Tabbar>
            </div >
        );
    }
}

export default Index;