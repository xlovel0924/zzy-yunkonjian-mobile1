import React, { Component } from 'react';
import "./index.css"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Nav from "../../../../components/nav/nav";
import { queryBlessingGoodsList, queryAllIncenseBurner, submitIncense, queryInsenseType, queryIncense } from "@/redux/family/family.action";
import HomeBackGround from "@/components/HomeBackGround";

import moment from 'moment';

import _ from 'lodash';

// import banner from "@/assets/img/yun-blessings/banner.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { BASE_URL_STATIC } from "../../../../server/service";
import { Toast, TextareaItem } from "antd-mobile";

let intervalLeftTime = null;

@connect(
    state => {
        return {
            familyReducer: state.familyReducer,
        }
    },
    { queryBlessingGoodsList, queryAllIncenseBurner, submitIncense, queryInsenseType, queryIncense }
)
@withRouter
class Index extends Component {
    constructor() {
        super();
        this.state = {
            titleText: '为运势祈福', // 标题文字
            pageStatus: 0,   // 状态(选择哪种香类型)
            insenseTypeList: [],  // 香类型
            insenseTypeListStr: [],  // 香类型 (数组不会变,用于提交等取值)
            inputValue: '',      // 祈福内容
            incenseBurnerList: [],   // 香炉列表
            swiperRealIndex: 0,  // 滑动选择的香炉索引值
            timeLeft: 0, // 祈福剩余时间
            pageType: 0,     // 页面显示 ( 0:选择状态, 1:烧香状态 )
            hourStr:'--', // 到计时 时
            minStr:'--', // 到计时 分
            secStr:'--', // 到计时 秒

            selectedIncense: {},    // 选择的香
            textModalVisible: false,    // 输入祈福对象及祈福人弹窗
            blessedPerson: '',      // 祈福人姓名
            targetPerson:'',        // 祈福对象
        }
    }

    componentDidMount() {
        // 获取香列表
        this.getInsenseType();
        // 获取香炉列表
        this.getIncenseBurnerList();
        // 根据家族ID, 用户ID查询正在祈福的数据
        this.getInsense(0)
       
    }

    componentWillUnmount(){
        // 卸载定时器
        clearInterval(intervalLeftTime);
        intervalLeftTime = null;
    }

    // 查询当前上香状态
    getInsense = async () => {
        const payload = {
            genealogyId: this.props.match.params.id,
            memberid: JSON.parse(localStorage.getItem('user')).data.id
        }
        await this.props.queryIncense(payload);
        let res = this.props.familyReducer.insenseList;
        if (res.flag) {
            if(!_.isEmpty(res.data)){
                const fragrantIdId = res.data[0].fragrantId;    // 香id
                const incenseBurnerId = res.data[0].incenseBurnerId;    // 香炉id
                const leftTime = moment(res.data[0].endTime,'YYYY-MM-DD HH:mm:ss').diff(moment(),'seconds');
                console.log(leftTime);
            }
            // console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
            // console.log(res)
        }
    }

    // 获取香炉列表
    getInsenseType = async () => {
        await this.props.queryInsenseType();
        let res = this.props.familyReducer.insenseTypeList;
        if (res.flag) {
            let tempList = [];
            if (!_.isEmpty(res.data)) {
                res.data.map((e, index) => {
                    const item = { ...e, status: index + 1 };
                    tempList.push(item)
                })
            }
            this.setState({
                insenseTypeList: tempList,
                insenseTypeListStr: tempList
            })
        }
    }

    // 获取香炉列表
    getIncenseBurnerList = async () => {
        await this.props.queryAllIncenseBurner();
        let res = this.props.familyReducer.allIncenseBurner;
        if (res.flag) {
            this.setState({
                incenseBurnerList: res.data
            })
        }
    }

    // 改变state方法
    changeState = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    // 提交祈福
    onSubmitIncense = async () => {
        const { incenseBurnerList, swiperRealIndex, inputValue, insenseTypeListStr, pageStatus, blessedPerson, targetPerson } = this.state;
        const _this = this;
        if (pageStatus === 0) {
            Toast.info('请选择一种香', 1.3);
        } else {
            if(blessedPerson==='' || targetPerson===''){
                Toast.info('请输入祈福人及为谁祈福', 1.3);
            }else{
                const userInfo = JSON.parse(localStorage.getItem('user'));
                const payload = {
                    // content: inputValue,
                    memberName: blessedPerson,  // 香客
                    prayerPeopleName: targetPerson, // 为谁点香
                    endTime: moment().subtract(-1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
                    fragrantId: insenseTypeListStr[pageStatus - 1].id,
                    // genealogyId: this.props.match.params.id,
                    incenseBurnerId: incenseBurnerList[swiperRealIndex].id,
                    incenseType: 0,
                    memberId: userInfo.data.id
                };
                await this.props.submitIncense(payload);
                let res = this.props.familyReducer.insenseTypeList;
                if (res.flag) {
                    Toast.info('上香成功', 1.2);
                    this.setState({
                        pageType: 1,
                        timeLeft: 3600,
                        textModalVisible: false
                    });
                    setTimeout(function(){
                        intervalLeftTime = setInterval(function(){
                            _this.tick();
                        },1000)
                    },1000);
                }
            }
            
        }
    }

    tick = () => {
        const { timeLeft } = this.state;
        let tempTime = timeLeft;
        if(tempTime>0){
            let h, min, sec;
            h = parseInt(timeLeft/3600);
            min = parseInt(timeLeft%3600/60);
            sec = parseInt(timeLeft%60);
            tempTime-=1;
            this.setState({
                hourStr: h<10?'0'+h:h,
                minStr: min<10?'0'+min:min,
                secStr: sec<10?'0'+sec:sec,
                timeLeft: tempTime
            })
        }else{
            clearInterval(intervalLeftTime);
            intervalLeftTime = null;
            this.setState({
                hourStr: '00',
                minStr: '00',
                secStr: '00',
                timeLeft: 0,
                pageType: 0
            })
        }
        
    }

    // 选择香
    onSelectIncense=(e)=>{
        this.setState({
            selectedIncense: e,
            textModalVisible: true
        })
    }



    render() {
        const { 
            pageType, titleText, insenseTypeList, pageStatus, inputValue, incenseBurnerList, insenseTypeListStr, swiperRealIndex,
            hourStr, minStr, secStr, textModalVisible, selectedIncense, blessedPerson, targetPerson
         } = this.state;
         console.log(selectedIncense);
        // 标题文字
        const titleList = titleText.split('');
        // 点击显示输入框
        let incenseList = insenseTypeList.filter(e => e.name !== '输入框');
        if (pageStatus !== 0) {
            if (pageStatus !== 4) {
                // incenseList.splice(pageStatus, 0, { name: '输入框' });
            } else if (pageStatus === 4) {
                // incenseList.push({ name: '输入框' });
            }
        }
        // 香url
        let insenseUrl = '';
        if (!_.isEmpty(insenseTypeListStr) && pageStatus !== 0) {
            insenseUrl = BASE_URL_STATIC + insenseTypeListStr[pageStatus - 1].fragrantUrl.replace(/\\/, "/")
        }
        // 香炉url
        let incenseBurnerUrl = '';
        if (!_.isEmpty(incenseBurnerList) && pageType===1) {
            incenseBurnerUrl = BASE_URL_STATIC + incenseBurnerList[swiperRealIndex].incenseBurnerUrl.replace(/\\/, "/")
        }

     

        return (
            <div className="incense">
                <Nav title="敬香" ellipsisIsShow={false} />
                <HomeBackGround>
                    {pageType===0?<>
                        <div className="incense-container">
                            <div className='incense-title'>
                                {!_.isEmpty(titleList) ?
                                    titleList.map(e => (
                                        <div className='textItem' key={e}>
                                            {e}
                                        </div>
                                    )) : null
                                }
                            </div>
                            <div className='incenseItemBox'>
                                {!_.isEmpty(incenseList) ?
                                    incenseList.map(e => ((
                                        e.name !== '输入框' ? 
                                        <div className='incenseItem' onClick={() => {this.changeState('pageStatus', e.status); this.onSelectIncense(e)}} key={e.name}>
                                            {e.name}
                                        </div> :
                                            <div className='inputAreaContainer'>
                                                <TextareaItem
                                                    rows={4}
                                                    placeholder='请输入内容'
                                                    value={inputValue}
                                                    onChange={val => {
                                                        this.changeState('inputValue', val)
                                                    }}
                                                />
                                            </div>
                                    ))) : null
                                }
                            </div>
                            {/* 香图片 */}
                            <div className='incenseImg' style={{marginLeft:"16%"}}>
                                {insenseUrl !== '' ? <img width='100%' height='100%' src={insenseUrl} alt="img" /> : null}
                            </div>
                            {/* 香炉 */}
                            <div className='incenseBurnerContainer'>
                                <Swiper
                                    slidesPerView={1}
                                    onSlideChange={(e) => this.changeState('swiperRealIndex', e.realIndex)}
                                    onSwiper={(swiper) => console.log(swiper)}
                                    loop
                                    autoplay={{
                                        delay: 3000
                                    }}
                                >
                                    {
                                        incenseBurnerList.map(item =>
                                            <SwiperSlide key={item.id}>
                                                <img style={{ width: "100%" }} src={BASE_URL_STATIC + item.incenseBurnerUrl.replace(/\\/, "/")} alt="img" />
                                            </SwiperSlide>
                                        )
                                    }
                                </Swiper>
                            </div>
                            {textModalVisible?
                                <div className='incense-textModal'>
                                    <div className='incense-nameContainer'>
                                        <div className='incense-nameBG'>
                                            <div className='closBtn' onClick={()=>this.changeState('textModalVisible', false)}></div>
                                            <div className='textModalTitleBox'>
                                                <div className='textModalTitle'>{selectedIncense.name}</div>
                                            </div>
                                            <div className='textModalInputBox' style={{marginTop:10}}>
                                                <div className='incense-textTitle'>香客: </div>
                                                <div className='incense-textValue'>
                                                    <TextareaItem
                                                        rows={10}
                                                        placeholder='请输入香客姓名'
                                                        value={blessedPerson}
                                                        onChange={val => {
                                                            this.changeState('blessedPerson', val)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className='textModalInputBox'>
                                                <div className='incense-textTitle'>为谁祈福: </div>
                                                <div className='incense-textValue'>
                                                    <TextareaItem
                                                        rows={10}
                                                        placeholder='请输入为谁祈福'
                                                        value={targetPerson}
                                                        onChange={val => {
                                                            this.changeState('targetPerson', val)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className='textModalInputBox'>
                                                <div className='incense-textTitle'>祈福内容: </div>
                                                <div className='incense-textValue2'>
                                                    {selectedIncense.fragrantContext}
                                                </div>
                                            </div>

                                            <div className='incense-submitBtn' onClick={this.onSubmitIncense}>
                                                一键祈福
                                            </div>
                                        </div>
                                    </div>
                                </div>:null
                            }
                            {/* <div className='rightArr'></div>
                            <div className='leftArr'></div> */}
                            {/* <div className="incense-btn" onClick={this.onSubmitIncense}>开始祈福</div> */}
                        </div>
                    </>:
                    <>
                        <div className='prayTitle'>为{targetPerson}祈福</div>
                        <div className='praySubTitle'>本次祈福剩余时间</div>
                        <div className='leftTimeContainer'>
                            <div className='leftTime'>{hourStr}:{minStr}:{secStr}</div>
                        </div>
                        <div className='noticeContainerBox' >
                            <div className='noticeContainer' >
                                {selectedIncense.fragrantContext}
                            </div>
                        </div>
                        
                        <div className='incenseImg'>
                            {insenseUrl !== '' ? <img width='100%' height='100%' src={insenseUrl} alt="img" /> : null}
                        </div>
                        <div className='incenseBurnerContainer'>
                            <img style={{ width: "100%" }} src={incenseBurnerUrl} alt="img" />
                        </div>
                        <div className="incense-btn-ghost">祈福中</div>
                    </>
                    }
                </HomeBackGround>
            </div>
        );
    }
}

export default Index;