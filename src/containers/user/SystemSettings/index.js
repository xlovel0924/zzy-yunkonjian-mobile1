import React, { Component } from 'react';
import Nav from '../../../components/nav/nav';
import './index.css';
import right from '@/assets/img/user-self/right.png';
import { ApiLogout } from '@/server/login';
import { withRouter } from 'react-router-dom';
import { Toast, Modal } from 'antd-mobile';
import GeneralBackGround from '../../../components/GeneralBackGround';

@withRouter
class SystemSettings extends Component {
    state = {
        visible: false,
        userId: null
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.setState({
                userId: JSON.parse(localStorage.getItem('user')).data.id
            })
        }
    }

    LogOut = () => {
        ApiLogout({
            id: this.state.userId
        }).then(res => {
            if (res.status === 200) {
                Toast.success('退出成功！')
                this.pageNavigtor('/index')
            }
        })
    }

    pageNavigtor = (url) => {
        this.props.history.push(url)
    }

    render() {
        return (
            <div className='system-settings'>
                <GeneralBackGround>
                    <Nav title={'设置'} ellipsisIsShow={false} />
                    {/* 内容 */}
                    <div className='system-settings-content'>
                        {/* 账号管理 */}
                        {/* <div className='item account' onClick={() => this.pageNavigtor('/no-found')}>
                        <div className='left'>账号管理</div>
                        <div className='right'>
                            <img className='icon' src={right} />
                        </div>
                    </div> */}
                        {/* 意见反馈 */}
                        {/* <div className='item feedback' onClick={() => this.pageNavigtor('/no-found')}>
                        <div className='left'>意见反馈</div>
                        <div className='right'>
                            <img className='icon' src={right} />
                        </div>
                    </div> */}
                        {/* 清理缓存 */}
                        {/* <div className='item clean-cache' onClick={() => this.pageNavigtor('/no-found')}>
                        <div className='left'>清理缓存</div>
                        <div className='right'>
                            <div className='desc'>0.00MB</div>
                            <img className='icon' src={right} />
                        </div>
                    </div> */}
                        {/* 关于我们 */}
                        <div className='item about-me'>
                            <div className='left'>关于我们</div>
                            <div className='right'>
                                <div className='desc'>V1.0</div>
                                {/* <img className='icon' src={right} /> */}
                            </div>
                        </div>
                        {/* 退出登录 */}
                        <div className='item logout' onClick={() => this.setState({ visible: true })}>
                            <div className='left'>退出登录</div>
                            <div className='right'>
                                <img className='icon' src={right} />
                            </div>
                        </div>
                    </div>

                    <Modal
                        visible={this.state.visible}
                        transparent
                        title="温馨提示"
                        className="logout-model"
                        wrapClassName='wrapper-modal'
                        maskClosable={true}
                        onClose={() => this.setState({ visible: false })}
                    >
                        <div className='model-content'>
                            <span>您确定要退出当前账号嘛？</span>
                            <div className='model-options'>
                                {/* <button className='cancel' onClick={() => this.setState({ visible: false })}>取消</button> */}
                                <button className='submit' onClick={() => this.LogOut()}>确认</button>
                            </div>
                        </div>
                    </Modal>
                </GeneralBackGround>
            </div>
        )
    }
}

export default SystemSettings;