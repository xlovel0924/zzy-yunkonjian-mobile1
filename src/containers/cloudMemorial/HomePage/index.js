import React, { Component, Fragment } from 'react';
import Nav from '../../../components/nav/nav';
import publicity from '@/assets/img/cloud-memorial/home-publicity.png';
import right from '@/assets/img/cloud-martyrs/martyrs-right.png';
import './index.css';
import { withRouter } from 'react-router-dom'

@withRouter
class MemorialHome extends Component {
    state = {
        navList: ['我创建的馆', '我关注的馆', '家庭纪念馆'],
        myCreateMuseum: [
            { img: require("@/assets/img/cloud-memorial/home-icon1.png"), title: '上海王代铭纪念馆' },
            { img: require("@/assets/img/cloud-memorial/home-icon2.png"), title: '上海王代铭纪念馆' },
            { img: require("@/assets/img/cloud-memorial/home-icon3.png"), title: '上海王代铭纪念馆' },
            { img: require("@/assets/img/cloud-memorial/home-icon4.png"), title: '上海王代铭纪念馆' },
        ],
        currentIndex: 0, // 当前活动的状态
        typeList: ['1', '2', '3']
    }
    render() {
        return (
            <div className='memorial-home'>
                {/* 头部 */}
                <Nav title={'云纪念馆'} ellipsisIsShow={false}/>
                {/* 内容 */}
                <div className='memorial-home-content'>
                    {/* 宣传 */}
                    <div className='content-publicity'>
                        <img src={publicity} />
                    </div>
                    {/* 导航 */}
                    <ul className='content-nav'>
                        {this.state.navList.map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    <li className='item' onClick={() => this.setState({ currentIndex: index })}>
                                        <span className={this.state.currentIndex === index ? 'active' : 'Regular'}>{item}</span>
                                        <hr style={{ visibility: (this.state.currentIndex === index ? 'visible' : 'hidden') }} />
                                    </li>
                                </Fragment>
                            )
                        })}

                    </ul>
                    {/* 信息展示 */}
                    {/* {this.typeList.map} */}
                    <ul className='content-infos'>
                        {this.state.myCreateMuseum.map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    <li className='item'>
                                        <div className='left'>
                                            {/* 图片 */}
                                            <div className='part-one'>
                                                <img src={item.img} />
                                            </div>
                                            {/* 信息 */}
                                            <div className='part-two'>
                                                <div className='big-title'>{item.title}</div>
                                                <div className='address'>上海青浦区顺昌路2222弄55号</div>
                                                <div className='distance'>距离您1.24km</div>
                                            </div>
                                        </div>
                                        <div className='right'>
                                            <div onClick={()=>this.props.history.push('/no-found')}>
                                                <img src={right} />
                                            </div>
                                        </div>
                                    </li>
                                </Fragment>
                            )
                        })}

                    </ul>
                </div>
            </div>
        )
    }
}

export default MemorialHome;