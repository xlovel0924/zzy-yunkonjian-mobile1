import React, {Component} from 'react';
import "./index.css"
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Nav from "../../../components/nav/nav";
import {queryBlessingGoodsList} from "@/redux/family/family.action"
import HomeBackGround from "@/components/HomeBackGround"

import banner from "@/assets/img/yun-blessings/banner.png"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import {BASE_URL_STATIC} from "../../../server/service";
import {Toast} from "antd-mobile";

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
            blessingsList: [],
            picUrl: []
        }
    }

    componentDidMount() {
        this.getBlessingsList();
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



    selectTag = (item) => {
        if(item.name==='敬香'){
            // 跳转敬香页面
            this.props.history.push('/incense/'+this.props.match.params.id);
        }else if(item.name==='点灯'){
            // 跳转点灯页面
            this.props.history.push('/lantern/'+this.props.match.params.id);
        }
        let newBlessingsList = JSON.parse(JSON.stringify(this.state.blessingsList));
        let selectLength = newBlessingsList.filter(v => v.isSelect).length; // 几个选中
        console.log(selectLength,"length")
        let picArr = [];
        for (let i of newBlessingsList){
            if (item.id == i.id){

                if (i.isSelect == true && selectLength == 1){
                    return Toast.info("请至少选择一个",1)
                }
                    i.isSelect = !i.isSelect;
                // if(selectLength == 1 && i.isSelect == false){
                //     i.isSelect = true;
                // }
                // if (selectLength == 1 && i.isSelect == true) {
                //     return Toast.info("请至少选择一个",1)
                // }
                //
                // if (selectLength != 1){
                //     i.isSelect = !i.isSelect;
                // }
            }

            if (i.isSelect == true){
                picArr.push(i);
            }
        }
        this.setState({
            blessingsList: [...newBlessingsList],
            picUrl: [...picArr]
        },() => {
            console.log(this.state.picUrl,"URL")
        });
    }

    goDetail = () => {
        // this.props.history.push("https://k.youshop10.com/cZMQWhry")
        window.open("https://k.youshop10.com/cZMQWhry","_self")
    }

    render() {
        console.log(this.state.blessingsList);
        return (
            <div className="blessings">
                <Nav title="许愿祈福" ellipsisIsShow={false} />
                <HomeBackGround>
                    <div className="blessings-container">
                        <Swiper
                            slidesPerView={1}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                            loop
                            autoplay={{
                                delay: 3000
                            }}
                        >
                            {
                                this.state.picUrl.map(item =>
                                    <SwiperSlide key={item.id}>
                                        <img style={{width: "100%"}} src={BASE_URL_STATIC + item.imageUrl.replace(/\\/,"/")} alt=""/>
                                    </SwiperSlide>
                                )
                            }
                        </Swiper>
                        <div style={{marginTop: "20px",letterSpacing: "2px"}}>请选择您需要的服务，将自动进行下一步编辑</div>
                        <div className="blessings-tags">
                            {
                                this.state.blessingsList.map(item =>
                                    <div key={item.id} onClick={() => this.selectTag(item)} className={item.isSelect ? "blessings-tags-select" : ""}>
                                        {item.name}
                                    </div>
                                )
                            }
                        </div>
                        {/*<div className="blessings-btn">选好了</div>*/}
                        <div className="blessings-btn" onClick={this.goDetail}>查看代客祭扫套餐</div>
                    </div>
                </HomeBackGround>
            </div>
        );
    }
}

export default Index;