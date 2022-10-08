import React, { Component, Fragment } from 'react';
import Nav from '@/components/nav/nav';
import Icon from '@/assets/img/no-found/foundicon.png';
import './index.css';
import { Modal, DatePicker, List, Toast } from 'antd-mobile';
import { ApiMySubscribe, ApiAddSubscribe } from '@/server/user'
import moment from 'moment';
import GeneralBackGround from '../../../components/GeneralBackGround';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

export class MySubscribe extends Component {
    state = {
        currentState: 1,
        AppliedList: [],
        CompletedList: [],
        visible: false,
        personnelName: '',
        personnelPhone: null,
        startTime: now,
        travelPartner: null,
        userDate: null
    }

    componentDidMount() {
        if (localStorage.getItem('user')) {
            this.setState({
                userDate: JSON.parse(localStorage.getItem('user')).data.id,
                personnelPhone: JSON.parse(localStorage.getItem('user')).data.account
            }, () => {
                this.getAppliedSubscribe();
                this.getCompletedSubscribe();
            })
        }
    }

    // 获取已申请预约信息
    getAppliedSubscribe = () => {
        ApiMySubscribe({
            bookedState: 0,
            id: this.state.userDate
        }).then(res => {
            console.log(res)
            if (res.status === 200) {
                this.setState({
                    AppliedList: res.data.data
                })
            }
            console.log(this.state.AppliedList, '我是已申请数据')
        })
    }

    // 获取已完成预约信息
    getCompletedSubscribe = () => {
        ApiMySubscribe({
            bookedState: 2,
            id: this.state.userDate
        }).then(res => {
            console.log(res)
            if (res.status === 200) {
                this.setState({
                    CompletedList: res.data.data
                })
            }
            console.log(this.state.CompletedList, '我是已完成数据')
        })
    }

    // 添加预约
    addSubscribe = () => {
        const time = moment(this.state.startTime).format('YYYY-MM-DD HH:mm:ss');
        ApiAddSubscribe({
            personnelName: this.state.personnelName,
            personnelPhone: this.state.personnelPhone,
            startTime: time,
            travelPartner: this.state.travelPartner,
            personnelId: this.state.userDate
        }).then(res => {
            if (res.status === 200) {
                this.setState({
                    visible: false,
                    personnelName: null,
                    personnelPhone: null,
                    startTime: now,
                    travelPartner: null
                })
                this.getAppliedSubscribe();
                Toast.success('添加成功')
            }
        })
    }
    render() {
        return (
            <div className='my-subscribe'>
                <GeneralBackGround>
                    {/* 头部 */}
                    <Nav title={'我的预约'} ellipsisIsShow={false} />
                    {/* 内容 */}
                    {this.state.AppliedList.length > 0 || this.state.CompletedList.length > 0 ?
                        <div className='my-subscribe-content'>
                            {/* 导航栏 */}
                            <ul className='navigation-bar'>
                                <li className='item' onClick={() => this.setState({ currentState: 1 })}>
                                    <span className={this.state.currentState === 1 ? 'active Semibold' : 'desc Regular'}>已申请</span>
                                    <span className='hr' style={{ visibility: (this.state.currentState === 1) ? 'visible' : 'hidden' }}></span>
                                </li>
                                <li className='item' onClick={() => this.setState({ currentState: 2 })}>
                                    <span className={this.state.currentState === 2 ? 'active Semibold' : 'desc Regular'}>已完成</span>
                                    <span className='hr' style={{ visibility: (this.state.currentState === 2) ? 'visible' : 'hidden' }}></span>
                                </li>
                            </ul>

                            {/* 已申请 */}
                            <ul className='infos-list' style={{ display: (this.state.currentState === 1 ? 'block' : 'none') }}>
                                {this.state.AppliedList.length > 0
                                    ? <>
                                        {this.state.AppliedList.map((item, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <li className='item'>
                                                        <div className='part-one'>
                                                            <span className='point'></span>
                                                            <span className='big-title'>预约看墓</span>
                                                            <span className='sub-time'>预约时间：{item.startTime}</span>
                                                        </div>
                                                        <div className='part-two'>
                                                            <div className='subitem'>
                                                                <span className='small-title'>用户名</span>
                                                                <span className='desc'>{item.personnelName}</span>
                                                            </div>
                                                            <div className='subitem'>
                                                                <span className='small-title'>同行人数</span>
                                                                <span className='desc'>{item.travelPartner}人</span>
                                                            </div>
                                                        </div>
                                                        <div className='part-three'>
                                                            用户手机号：{item.personnelPhone}
                                                        </div>
                                                    </li>
                                                </Fragment>
                                            )
                                        })}
                                    </>
                                    : <li className='no-infos Bold'>暂无预约信息</li>
                                }
                            </ul>
                            {/* 已完成 */}
                            <ul className='infos-list' style={{ display: (this.state.currentState === 2 ? 'block' : 'none') }}>
                                {this.state.CompletedList.length > 0
                                    ? <>
                                        {this.state.CompletedList.map((item, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <li className='item'>
                                                        <div className='part-one'>
                                                            <span className='point'></span>
                                                            <span className='big-title'>预约看墓</span>
                                                            <span className='sub-time'>预约时间：{item.startTime}</span>
                                                        </div>
                                                        <div className='part-two'>
                                                            <div className='subitem'>
                                                                <span className='small-title'>用户名</span>
                                                                <span className='desc'>{item.personnelName}</span>
                                                            </div>
                                                            <div className='subitem'>
                                                                <span className='small-title'>同行人数</span>
                                                                <span className='desc'>{item.travelPartner}人</span>
                                                            </div>
                                                        </div>
                                                        <div className='part-three'>
                                                            用户手机号：{item.personnelPhone}
                                                        </div>
                                                    </li>
                                                </Fragment>
                                            )
                                        })}
                                    </>
                                    : <li className='no-infos Bold'>暂无预约信息</li>
                                }
                            </ul>

                        </div>
                        : <Fragment>
                            <div className='no-subscribe'>
                                <img src={Icon} />
                                <div className='desc'>您现在还没有预约哦~</div>
                                <div className='go-subcribe' onClick={() => this.setState({ visible: true })}>点击预约看墓</div>
                            </div>
                        </Fragment>
                    }

                    {/* 预约看墓 */}
                    <Modal
                        visible={this.state.visible}
                        transparent
                        onClose={() => this.setState({ visible: false })}
                        title="预约看墓"
                        className='subscribe-model'
                        wrapClassName="wrapper-modal"
                    >
                        <div className='subscribe-model-content'>
                            <ul>
                                {/* 姓名 */}
                                <li className='item'>
                                    <div className='nickname'><span>*</span>姓名</div>
                                    <input type='text' value={this.state.personnelName} placeholder='请输入您的姓名' onChange={(e) => this.setState({ personnelName: e.target.value })} />
                                </li>
                                {/* 联系方式 */}
                                <li className='item'>
                                    <div className='nickname'><span>*</span>联系方式</div>
                                    <input type='text' value={this.state.personnelPhone} placeholder='请输入电话号码' onChange={(e) => this.setState({ personnelPhone: e.target.value })} />
                                </li>
                                {/* 预约时间 */}
                                <li className='item date'>
                                    <DatePicker
                                        value={this.state.startTime}
                                        onChange={startTime => this.setState({ startTime })}
                                    >
                                        <List.Item arrow="horizontal" style={{ overflow: "none" }}><span>*</span>预约时间</List.Item>
                                    </DatePicker>
                                </li>
                                {/* 同行人数 */}
                                <li className='item'>
                                    <div className='nickname'><span>*</span>同行人数</div>
                                    <input type='text' value={this.state.travelPartner} placeholder='请输入同行人数' onChange={(e) => this.setState({ travelPartner: e.target.value })} />
                                </li>
                            </ul>
                            {/* 操作 */}
                            <div className='footer-options'>
                                <button className='cancel' onClick={() => this.setState({ visible: false })}>取消</button>
                                <button className='sure' onClick={() => this.addSubscribe()}>确定</button>
                            </div>
                        </div>
                    </Modal>
                </GeneralBackGround>
            </div>
        )
    }
}

export default MySubscribe;