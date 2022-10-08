import React, {Component} from 'react';
import "./index.css"
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Nav from "../../../../components/nav/nav";
import {queryBlessingGoodsList} from "@/redux/family/family.action"
import HomeBackGround from "@/components/HomeBackGroundTransformNone";

import banner from "@/assets/img/yun-blessings/banner.png"
import {Swiper, SwiperSlide} from "swiper/react";
// import "swiper/swiper-bundle.min.css";
import {BASE_URL_STATIC} from "../../../../server/service";
import {Toast, InputItem, TextareaItem} from "antd-mobile";

import lanternMain from '../../../../assets/img/yun-blessings/lantern_type_main.png';
import lantern1 from '../../../../assets/img/yun-blessings/gif02.gif';
// import lantern2 from '../../../../assets/img/yun-blessings/lantern_type_2.png';
import lantern2 from '../../../../assets/img/yun-blessings/gif01.gif';
import lantern3 from '../../../../assets/img/yun-blessings/gif03.gif';
import sucessText from '../../../../assets/img/yun-blessings/sucessText.png';
import BG_reel from '../../../../assets/img/yun-blessings/gifMain.gif';

@connect(
    state => {
        return {
            familyReducer: state.familyReducer,
        }
    },
    {queryBlessingGoodsList}
)
@withRouter
class Index extends Component {
    constructor() {
        super();
        this.state = {
            personName: '',     // 祈福人名字
            inputValue: '',      // 祈福内容
            pageType: 0,    // 页面
            page2BtnStatus: 0, // 显示点亮天灯还是上拉
        }
    }

    componentDidMount() {
        // this.getBlessingsList();
    }

    getBlessingsList = async () => {
        await this.props.queryBlessingGoodsList();
        let res = this.props.familyReducer.blessings;
        let list = JSON.parse(JSON.stringify(res.data))
        let picArr = [];
        // 默认第一个选中
        list[0].isSelect = true;
        for (let item of list){
            if (item.isSelect){
                item.isSelect = true;
                picArr.push(item)
            } else {
                item.isSelect = false;
            }
        }
        this.setState({
            blessingsList: [
                ...list
            ],
            picUrl: [...picArr]
        });
    }

    // 改变state
    changeState=(key,value)=>{
        this.setState({
            [key]:value
        })
    }

    // 跳转页面状态
    gotoPage=(num)=>{
        const {  personName, inputValue } = this.state;
        if(personName!=='' && inputValue!==''){
            this.changeState('pageType', num)            
        }else{
            Toast.fail('请输入祈福人姓名及祈福内容', 1.3);
        }
    }


    render() {
        const { personName, inputValue, pageType, page2BtnStatus } = this.state;
        return (
            <div className="lantern">
                <Nav title="许愿祈福" textColor='#FDD8A4' ellipsisIsShow={false} />
                <HomeBackGround>
                    <div className='blessings-container'>
                        <div className='lantern-animateBG'>
                            <div className='animateBox' style={{right:15, top: '11%',  transform:'rotate(30deg)'}}>
                                <div className='animateItem1'>
                                    <img src={lantern2} alt='img' width='100%' height='100%' />
                                </div>
                            </div>
                            <div className='animateBox' style={{left:90, top: '1%', transform:'scale(0.5)'}}>
                                <div className='animateItem1'>
                                    <img src={lantern1} alt='img' width='100%' height='100%' />
                                </div>
                            </div>
                            <div className='animateBox' style={{left:30, top: '10%', transform:'scale(0.7)'}}>
                                <div className='animateItem2'>
                                    <img src={lantern1} alt='img' width='100%' height='100%' />
                                </div>
                            </div>
                            <div className='animateBox' style={{left:150, top: '17%', transform:'scale(0.7) rotate(30deg)'}}>
                                <div className='animateItem1Far'>
                                    <img src={lantern3} alt='img' width='100%' height='100%' />
                                </div>
                            </div>
                            <div className='animateBox' style={{left:65, top: '25%', transform:'scale(0.5) rotate(30deg)'}}>
                                <div className='animateItem1Far'>
                                    <img src={lantern3} alt='img' width='100%' height='100%' />
                                </div>
                            </div>
                            <div className='animateBox' style={{left:20, top: '50%', transform:'scale(0.7) rotate(30deg)'}}>
                                <div className='animateItem2Far'>
                                    <img src={lantern3} alt='img' width='100%' height='100%' />
                                </div>
                            </div>
                            <div className='animateBox' style={{right:-10, top: '60%', transform:'rotate(30deg)'}}>
                                <div className='animateItem2'>
                                    <img src={lantern3} alt='img' width='100%' height='100%' />
                                </div>
                            </div>
                            <div className='animateBox' style={{left:20, bottom: '10%', transform:'scale(1.7) rotate(10deg)'}}>
                                <div className='animateItem1'>
                                    <img src={lantern2} alt='img' width='100%' height='100%' />
                                </div>
                            </div>
                            <div className='animateBox' style={{right:60, bottom: '10%', transform:'scale(0.6) rotate(30deg)'}}>
                                <div className='animateItem1Far'>
                                    <img src={lantern2} alt='img' width='100%' height='100%' />
                                </div>
                            </div>
                        </div>

                        {pageType===0?<div className='lantern-mainContainer'>
                            <div className="lantern-container">
                                <div className='lantern-titleInfo'>想祈福什么快写下来放飞天灯吧~</div>
                                <div className='nameInputBox'>
                                    <div className='nameInputItem'>
                                        <InputItem
                                            style={{marginTop:-4}}
                                            maxLength={10}
                                            value={personName}
                                            onInput={(e)=>{this.changeState('personName',e.target.value)}}
                                            placeholder="祈福人"
                                        />
                                    </div>
                                </div>

                                <div className='valueInputBox'>
                                    <div className='valueInputItem'>
                                        <TextareaItem
                                            rows={4}
                                            placeholder='祈福内容'
                                            value={inputValue}
                                            onChange={val => {
                                                this.changeState('inputValue', val)
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='lantern-btnBox'>
                                    <div className="lantern-btn" onClick={()=>this.gotoPage(1)}>立即祈福</div>
                                </div>
                            </div>
                        </div>:null}
                        {pageType===1?<div className='lantern-mainContainer'>
                            <div className="lantern-container">
                                <div className='lantern-mainLanternBox'>
                                    <div className='lantern-mainLantern'>
                                        <img src={lanternMain} style={{ filter: page2BtnStatus===0?'brightness(50%) contrast(60%)':'brightness(100%) contrast(100%)'}} alt='img' width='100%' height='100%' />
                                    </div>
                                </div>
                                {page2BtnStatus===0?<div className='lantern-btnBox'>
                                        <div className="lantern-btn" onClick={()=>this.changeState('page2BtnStatus', 1)}>立即点亮天灯</div>
                                    </div>:null
                                }
                            </div>
                            {page2BtnStatus===1?<div className='lantern-btnBoxGhost'>
                                    <img onClick={()=>this.gotoPage(2)} src={sucessText} width='145px' height='58px' alt = 'img' />
                                </div>:null}
                        </div>:null}

                        {pageType===2?
                        <div className='lantern-mainContainer'>
                            <div className='lantern-mainAnimate'>
                                <div style={{width:'310px', height:'874px', position:'relative'}}>
                                    <img src={BG_reel} alt='img' width='310px' height='auto' />
                                    <div className='lantern-animateContainer' style={{height: 280, left: 45, right: 45}}>
                                        <div className='lantern-animateContainerName'>{personName} :</div>
                                        <div>
                                            <div className='lantern-animateContainerText'>{inputValue}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>:null}
                    </div>
                </HomeBackGround>
            </div>
        );
    }
}

export default Index;