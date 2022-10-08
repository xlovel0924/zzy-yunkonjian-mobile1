import React, { Component, Fragment } from 'react';
import Nav from '@/components/nav/nav';
import './index.css'

export class SystemAnnouncement extends Component {
    state = {
        arrList: ['', '', '']
    }
    render() {
        return (
            <div className='system-announcement'>
                <Nav title={'系统公告'} ellipsisIsShow={false} />
                <div className='system-announcement-content'>
                    {this.state.arrList.length > 0
                        ? <ul className='content-infos'>
                            {this.state.arrList.map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        <li className='item'>
                                            <div className='part-one'>2022年10月9日：10：20：25</div>
                                            <div className='part-two'>
                                                <div className='big-title'>系统消息</div>
                                                <div className='desc'>10月10日9:00~18:00系统内侧，届时会有网络不稳定的情况，造成不便，敬请谅解！</div>
                                            </div>
                                        </li>
                                    </Fragment>
                                )
                            })}

                        </ul>
                        : <div className='no-content'>暂无系统公告</div>}
                </div>
            </div>
        )
    }
}

export default SystemAnnouncement
