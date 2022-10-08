import React, { Component } from 'react';
import Nav from '@/components/nav/nav';
import './index.css';
import system from '@/assets/img/user-self/system.png'
import pay from '@/assets/img/user-self/pay.png'
import hot from '@/assets/img/user-self/hot.png'
import active from '@/assets/img/user-self/active.png'
import { withRouter } from 'react-router-dom'

@withRouter
class SystemNotification extends Component {
    render() {
        return (
            <div className='system-notification'>
                <Nav title={'系统通知'} ellipsisIsShow={false} />
                <ul className='system-notification-content'>
                    <li className='item' onClick={() => this.props.history.push('/system-announcement')}>
                        <div className='left'>
                            <img src={system} />
                            <div className='part-one'>
                                <div className='big-title'>系统公告</div>
                                <div className='desc'>暂无系统公告</div>
                            </div>
                        </div>
                        <div className='right'>10:30</div>
                    </li>
                    <li className='item'>
                        <div className='left'>
                            <img src={pay} />
                            <div className='part-one'>
                                <div className='big-title'>交易提醒</div>
                                <div className='desc'>暂无交易提醒</div>
                            </div>
                        </div>
                        <div className='right'>10:30</div>
                    </li>
                    <li className='item'>
                        <div className='left'>
                            <img src={active} />
                            <div className='part-one'>
                                <div className='big-title'>活动奖励</div>
                                <div className='desc'>暂无活动奖励</div>
                            </div>
                        </div>
                        <div className='right'>10:30</div>
                    </li>
                    <li className='item'>
                        <div className='left'>
                            <img src={hot} />
                            <div className='part-one'>
                                <div className='big-title'>热门活动</div>
                                <div className='desc'>限时优惠，快去看看吧~</div>
                            </div>
                        </div>
                        <div className='right'>10:30</div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default SystemNotification
