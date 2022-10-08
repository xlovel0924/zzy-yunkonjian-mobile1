import React, { Component, Fragment, useEffect, useState } from 'react';
import setUp from '@/assets/img/user-self/setup.png';
import headerImg from '@/assets/img/life-biography/headportrait.png';
import right from '@/assets/img/user-self/right1.png'
import order from '@/assets/img/user-self/order.png'
import vip from '@/assets/img/user-self/vip.png'
import jifen from '@/assets/img/user-self/jifen.png'
import "./index.css";
import { withRouter, useHistory } from 'react-router-dom';
import { ApiGetUserInfos } from '@/server/user';
import { BASE_URL_STATIC } from "../../server/service";
import RViewerJS from "viewerjs-react";
import { Modal, Progress } from 'antd-mobile';
import { ApiMySubscribe, ApiCloudCapacity } from '@/server/user'
import { queryConcernGenealogyAxios } from '@/server/family';
import HasTabBarBackGround from '../../components/HasTabBarBackGround';
import { cloudService } from '../../server/cloud'

// 未登录
function NotLogin() {
    return (
        <div className='desc'>
            <div className='left'>
                <div className='big-title'>登录/注册</div>
                <div className='small-title'>点击登录/注册</div>
            </div>
        </div>
    )
}

// 已登录
function HaveLogin(props) {
    const [phone, setPhone] = useState(null);
    const history = useHistory();
    const pageNavigtpr = (url) => {
        history.push(url)
    }
    useEffect(() => {
        if (props.userInfos) {
            var tel = props.userInfos.phone;
            setPhone(tel && tel.replace(tel.substring(3, 7), "****"))
        }
    })
    return (
        <div className='desc' onClick={() => pageNavigtpr(`/personal-data/${props.userInfos.id}`)}>
            <div className='left'>
                <div className='big-title'>{phone}</div>
                <div className='small-title'>修改个人资料</div>
            </div>
            <div className='right'>
                <img src={right} />
            </div>
        </div>
    )
}

@withRouter
class UserSelf extends Component {
    constructor() {
        super();
        this.state = {
            isEixtUserInfos: true,
            partOneList: [
                { icon: require('../../assets/img/user-self/icon1.png'), desc: '我的相册', url: '/my-photo', isFlag: 1 },
                { icon: require('../../assets/img/user-self/icon2.png'), desc: '我的预约', url: '/my-subscribe', isFlag: 1 },
                { icon: require('../../assets/img/user-self/zhizun.png'), desc: '至尊微店', url: 'http://h5.zhizunyuan.com/pages/shop/shop', isFlag: 1 },
                { icon: require('../../assets/img/user-self/icon7.png'), desc: '云家谱', url: '/familytreehomepage', isFlag: 1 },
                { icon: require('../../assets/img/user-self/vrdaogou@2x.png'), desc: 'VR导购', isFlag: 2 },
            ],
            partTwoList: [
                { icon: require('../../assets/img/user-self/icon4.png'), desc: '联系客服', isFlag: 3 },
                // { icon: require('../../assets/img/user-self/icon3.png'), desc: '系统通知', url: '/no-found' },
                { icon: require('../../assets/img/user-self/jiaoton.png'), desc: '交通信息', url: 'https://map.baidu.com/search/%E8%87%B3%E5%B0%8A%E5%9B%AD%C2%B7%E9%9D%99%E5%9B%AD/@13475561.018708088,3622113.1863786504,17.31z?querytype=s&da_src=shareurl&wd=%E8%87%B3%E5%B0%8A%E5%9B%AD%C2%B7%E9%9D%99%E5%9B%AD&c=289&src=0&pn=0&sug=0&l=17&b=(13474771.292906415,3621696.4765550224;13476350.74450976,3622529.8962022783)&from=webmap&biz_forward=%7B%22scaler%22:2,%22styles%22:%22pl%22%7D&device_ratio=2', isFlag: 1 },
            ],
            userInfos: {},
            visible: false,
            AppliedList: [],
            CompletedList: [],
            MyFollowSum: 0,
            userDate: null,
            percent: 0,
            totalCapacity: 0,
            partCapacity: 0,
            sumPercent: 0
        }
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.setState({
                isEixtUserInfos: true,
                userDate: JSON.parse(localStorage.getItem('user')).data.id
            }, () => {
                this.getUserInfos();
                // this.getAppliedSubscribe();
                // this.getCompletedSubscribe();
                // this.getFamilyInfos();
                this.getCloundCapacity();
            })
        } else {
            this.setState({
                isEixtUserInfos: false
            })
        }
    }

    getUserInfos = () => {
        ApiGetUserInfos(this.state.userDate).then(res => {
            console.log(res)
            if (res.status === 200) {
                this.setState({
                    userInfos: res.data.data
                }, () => {
                    console.log(this.state.userInfos, 'xxxx')
                })
            }

        })
    }
    pageNavigator = (url) => {
        if (url.includes('http')) {
            window.open(url, "_self")
        } else {
            this.props.history.push(url)
        }
    }

    // 获取云空间容量
    getCloundCapacity = () => {
        ApiCloudCapacity({
            memberId: this.state.userDate
        }).then(res => {
            console.log(res, '我是容量')
            const total = res.data.data.totalCapacity / 1024;
            console.log(total, '我是总容量')
            if (res.data.data.usageCapacity && res.data.data.usageCapacity !== 0 && res.data.data.usageCapacity !== '0') {
                if (res.data.usageCapacity <= 1024) {
                    this.setState({
                        partCapacity: res.data.data.usageCapacity.toFixed(2) + 'KB'
                    })
                } else if (res.data.data.usageCapacity <= 1048576) {
                    this.setState({
                        partCapacity: (res.data.data.usageCapacity / 1024).toFixed(2) + 'M'
                    })
                } else {
                    this.setState({
                        partCapacity: (res.data.data.usageCapacity / 1048576).toFixed(2) + 'G'
                    })
                }
                // 计算百分比
                const sum = Math.ceil((res.data.data.usageCapacity / res.data.data.totalCapacity) * 100)
                this.setState({
                    sumPercent: sum,
                    percent: sum
                })
            }
            // } else {
            //     this.setState({
            //         partCapacity: 0 + 'G'
            //     })
            // }
            this.setState({
                totalCapacity: total
            })
        })
    }

    // VR跳转
    pageVR = (name) => {
        cloudService(name).then(res => {
            if (res.status === 200) {
                window.open(res.data.data.serviceUrl, "_self");
            }
        })
    }

    //#region 
    // 获取已申请预约信息
    // getAppliedSubscribe = () => {
    //     ApiMySubscribe({
    //         bookedState: 0,
    //         id: this.state.userDate
    //     }).then(res => {
    //         console.log(res)
    //         if (res.status === 200) {
    //             this.setState({
    //                 AppliedList: res.data.data
    //             })
    //         }
    //         console.log(this.state.AppliedList, '我是已申请数据')
    //     })
    // }

    // // 获取已完成预约信息
    // getCompletedSubscribe = () => {
    //     ApiMySubscribe({
    //         bookedState: 2,
    //         id: this.state.userDate
    //     }).then(res => {
    //         console.log(res)
    //         if (res.status === 200) {
    //             this.setState({
    //                 CompletedList: res.data.data
    //             })
    //         }
    //         console.log(this.state.CompletedList, '我是已完成数据')
    //     })
    // }

    // 我关注的家谱
    // getFamilyInfos = () => {
    //     queryConcernGenealogyAxios({ id: this.state.userDate }).then(res => {
    //         console.log(res)
    //         if (res.status === 200) {
    //             this.setState({
    //                 MyFollowSum: res.data.data.length
    //             })
    //         }
    //     })
    // }
    //#endregion

    render() {
        return (
            <div className="user-self">
                <HasTabBarBackGround>
                    <div>
                        <div className='user-self-content'>
                            <div className='part-one'>
                                <div className="user-self-title">
                                    <div></div>
                                    <div className='big-title'>个人中心</div>
                                    <img src={setUp} onClick={() => this.pageNavigator('/system-settings')} />
                                </div>
                                <div className='infos'>
                                    <RViewerJS>
                                        <img src={this.state.userInfos && this.state.userInfos.profilePhoto ? BASE_URL_STATIC + this.state.userInfos.profilePhoto.replace(/\\/, '/') : headerImg} className="img" />
                                    </RViewerJS>
                                    {this.state.isEixtUserInfos == true ? <HaveLogin userInfos={this.state.userInfos} /> : <NotLogin />}
                                </div>
                                <div className='vip'>
                                    <div className='vip-title'>至尊 VIP I</div>
                                    <div className='vip-options' onClick={() => this.pageNavigator('/no-found')}>开通</div>
                                </div>
                            </div>
                            <div className='part-two'>
                                <div className='list'>
                                    <div className='item' onClick={() => this.pageNavigator('/no-found')}>
                                        <img src={jifen} />
                                        <span>积分</span>
                                    </div>
                                    <div className='item' onClick={() => this.pageNavigator('/no-found')}>
                                        <img src={vip} />
                                        <span>至尊币</span>
                                    </div>
                                    <div className='item' onClick={() => this.pageNavigator('/no-found')}>
                                        <img src={order} />
                                        <span>订单中心</span>
                                    </div>
                                </div>
                                {/* 进度条 */}
                                <div className='progress'>
                                    <div className='show-infos'>
                                        <div className='left'>{this.state.partCapacity}/{this.state.totalCapacity}M</div>
                                        <div aria-hidden="true" className='right'>{this.state.sumPercent.toFixed(2)}%</div>
                                    </div>
                                    <div className="progress"><Progress percent={this.state.percent} position="normal" /></div>
                                </div>
                            </div>
                            <div className='part-three'>
                                <div className='part-title Semibold'>常用服务</div>
                                <ul className='list'>
                                    {this.state.partOneList.map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <li className='item' onClick={item.isFlag == 1 ? () => { this.pageNavigator(item.url) } : item.isFlag == 2 ? () => { this.pageVR('VR导购') } : () => this.setState({ visible: true })}>
                                                    <img src={item.icon} className={`one-icon${index}`} />
                                                    <span>{item.desc}</span>
                                                </li>
                                            </Fragment>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='part-three two'>
                                <div className='part-title Semibold'>帮助中心</div>
                                <ul className='list'>
                                    {this.state.partTwoList.map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <li className='item' onClick={item.isFlag == 1 ? () => { this.pageNavigator(item.url) } : item.isFlag == 2 ? () => { this.pageVR('VR导购') } : () => this.setState({ visible: true })}>
                                                    <img src={item.icon} className={'two-icon' + index} />
                                                    <span>{item.desc}</span>
                                                </li>
                                            </Fragment>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </HasTabBarBackGround>
                <Modal
                    popup
                    visible={this.state.visible}
                    onClose={() => this.setState({ visible: false })}
                    animationType="slide-up"
                    className='service-model'
                    wrapClassName="wrapper-modal"
                >
                    <div className='model-content'>
                        <div className='nickname'>联系客服</div>
                        <div className='desc'>确定拨打电话：021-59834449吗？</div>
                        <a className='submit' href='tel:021-59834449'>确定</a>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default UserSelf;