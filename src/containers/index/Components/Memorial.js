import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import mylife from "@/assets/img/yun-home/mylife.png"
import book from "@/assets/img/yun-home/book.png"
import house from "@/assets/img/yun-home/house.png"
import email from "@/assets/img/yun-home/email.png"
import pic from "@/assets/img/yun-home/pic.png"
import xuyuan from '@/assets/img/yun-home/xuyuan.png'


@withRouter
class Memorial extends Component {
    state = {
        currentHeight: ''
    }
    constructor() {
        super();
        this.userInfo = JSON.parse(window.localStorage.getItem("user")) ? JSON.parse(window.localStorage.getItem("user")).data : null
    }

    componentDidMount() {
        console.log(this.props, 'xxx')
        var height = document.querySelector('.memorial-item').clientHeight;
        console.log(height, '我是高度呀')
        this.setState({
            currentHeight: height
        })
    }
    navigatorTo = (url) => {
        // console.log(this.props)
        this.props.history.push(url)
    }
    render() {
        return (
            <div className="memorial"
                style={{
                    height: (this.props.isShow ? this.state.currentHeight + 'px' : ''),
                    overflow: (this.props.isShow ? 'hidden' : '')
                }}
            >
                <div className="memorial-item" onClick={() => {
                    this.props.addRecords({ personnelId: localStorage.getItem('token') && this.userInfo && this.userInfo.id, behaviorType: "功能使用", button: "云家谱" })
                    this.navigatorTo("/familytreehomepage")
                }}>
                    <img src={book} alt="" />
                    <div className='Regular'>云家谱</div>
                </div>
                <div className="memorial-item" onClick={() => {
                    this.props.addRecords({ personnelId: localStorage.getItem('token') && this.userInfo && this.userInfo.id, behaviorType: "功能使用", button: "许愿祈福" })
                    this.navigatorTo("/blessings")
                }}>
                    <img src={xuyuan} alt="" />
                    <div className='Regular'>许愿祈福</div>
                </div>
                <div className="memorial-item" onClick={() => {
                    this.props.addRecords({ personnelId: localStorage.getItem('token') && this.userInfo && this.userInfo.id, behaviorType: "功能使用", button: "永恒照相馆" })
                    this.navigatorTo("/photo-studio-homepage")
                }}>
                    <img src={pic} alt="" />
                    <div className='Regular'>永恒照相馆</div>
                </div>
                <div className="memorial-item" onClick={() => {

                    this.props.addRecords({ personnelId: localStorage.getItem('token') && this.userInfo && this.userInfo.id, behaviorType: "功能使用", button: "时空信箱" })
                    this.navigatorTo("/space-time-mail-home")
                }}>
                    <img src={email} alt="" />
                    <div className='Regular'>时空信箱</div>
                </div>
                <div className="memorial-item" onClick={() => {
                    this.props.addRecords({ personnelId: localStorage.getItem('token') && this.userInfo && this.userInfo.id, behaviorType: "功能使用", button: "生平传记" })
                    this.navigatorTo("/biography-publicity")
                }}>
                    <img src={mylife} alt="" />
                    <div className='Regular'>生平传记</div>
                </div>
                <div className="memorial-item" onClick={() => {
                    this.props.addRecords({ personnelId: localStorage.getItem('token') && this.userInfo && this.userInfo.id, behaviorType: "功能使用", button: "云纪念馆" })

                    this.navigatorTo("/memorial-publicity")
                }}>
                    <img src={house} alt="" />
                    <div className='Regular'>云纪念馆</div>
                </div>
            </div>
        );
    }
}

export default Memorial;