import React, { Component } from 'react';
import Nav from '../../../components/nav/nav';
import logo from '@/assets/img/user-self/logo.png';
import headerImg from '@/assets/img/life-biography/headportrait.png';
import './index.css';
import callus from '@/assets/img/user-self/callus.png';
import expression from '@/assets/img/user-self/expression.png';
import add from '@/assets/img/user-self/add.png';

export class ContactCustomerService extends Component {
    state = {
        currentState: 1
    }
    render() {
        return (
            <div className='contact-customer-service'>
                {/* 头部 */}
                <Nav title={'联系客服'} ellipsisIsShow={false} />
                {/* 内容 */}
                <div className='customer-service-content'>
                    <div className='part-one'>
                        <img src={logo} />
                        <div className='desc'>
                            <div className='big-title'>至尊园·静园</div>
                            <div className='small-title'>智能客服欢迎您~</div>
                        </div>
                    </div>
                    <div className='part-two'>
                        <div className='two-top'>
                            <div className='item left'>
                                <img src={logo} />
                                <div className='desc'>
                                    您好？您想咨询什么问题呢？请点击下方
                                    电话按钮，至尊园·静园来帮您解决疑惑。
                                </div>
                            </div>
                            <div className='item right'>
                                <div className='desc'>预约看墓</div>
                                <img src={headerImg} />
                            </div>
                            <div className='item left'>
                                <img src={logo} />
                                <div className='desc'>
                                    点击<span>“预约看墓”</span>进行预约吧！
                                </div>
                            </div>
                        </div>
                        <div className='two-bottom'>
                            <img className='callus' src={callus} />
                            <div className='contact'>
                                <input type='text' />
                                <img src={expression} />
                                <img src={add} />
                            </div>
                        </div>
                    </div>
                    <ul className='part-three'>
                        <li className={this.state.currentState === 1 ? 'active' : ''} onClick={() => this.setState({ currentState: 1 })}>联系客服</li>
                        <li className={this.state.currentState === 2 ? 'active' : ''} onClick={() => this.setState({ currentState: 2 })}>预约看墓</li>
                        <li className={this.state.currentState === 3 ? 'active' : ''} onClick={() => this.setState({ currentState: 3 })}>自选方案</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default ContactCustomerService