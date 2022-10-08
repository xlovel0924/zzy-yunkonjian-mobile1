import React, {Component} from 'react';
import HomeBackGround from "../../components/HomeBackGround"
import {getAllCityAndPic,setCurrentCity} from "@/redux/index/index.action"
import "./index.css";
import Nav from "../../components/nav/nav";
import {connect} from "react-redux";
import {withRouter, Redirect} from 'react-router-dom'

@connect(
    state => ({indexReducer: state.indexReducer}),
    {getAllCityAndPic,setCurrentCity}
)
@withRouter
class Index extends Component {
    constructor() {
        super();
        this.state = {
            cityList: [],
            city: "",
        }
    }
    // 获取城市图片列表
    getCityPicList = async () => {
        await this.props.getAllCityAndPic();
        let res = this.props.indexReducer.cityAndPicList.data;
        console.log(res,"Res")
    }

    async componentDidMount() {
        // const obj = qs.parse(this.props.location.search.split("?")[1]);

        // await this.props.getAllCityAndPic();
        // let res = this.props.indexReducer.cityAndPicList.data;
        // 所有的城市和图片
        let cityData = this.props.indexReducer.cityAndPicList.data;
        this.setState({
            city: this.props.indexReducer.currentCity,
            cityList: Object.keys(cityData),
        });
        // console.log(res,"Res")
    }
    // 选择城市
    selectCity = async (city) => {
        await this.props.setCurrentCity(city)
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="select-address">
                <Nav title="" ellipsisIsShow={false} />
                <HomeBackGround>
                    <div>
                        <div>
                            <div className="select-address-title">当前定位城市</div>
                            <div className="select-address-list">
                                <div onClick={() => this.selectCity(this.state.city)}>{this.state.city}</div>
                            </div>
                        </div>
                        <div>
                            <div className="select-address-title">请选择城市</div>
                            <div className="select-address-list">
                                {this.state.cityList.map(item =>
                                    <div key={item} onClick={() => this.selectCity(item)}>{item}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </HomeBackGround>
            </div>
        );
    }
}

export default Index;