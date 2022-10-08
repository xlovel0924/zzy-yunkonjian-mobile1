import React, { Component, Fragment } from 'react';
import './index.css';
import Nav from '@/components/nav/nav';
import template from '@/assets/img/yun-photo/template.png';
import { withRouter } from 'react-router-dom';
import { APIMicroMovies } from '@/server/photoStudio';
import { BASE_URL_STATIC } from '@/server/service';
import HasTabBarBackGround from '../../../components/HasTabBarBackGround';

@withRouter
class LifeMicroFilm extends Component {
    state = {
        isActive: 1,
        TemplateList: [],
        EditList: [],
        MakeList: [],
        CompleteList: []
    }

    componentDidMount() {
        this.getMicroMovies();
    }

    // 获取模板信息
    getMicroMovies = () => {
        APIMicroMovies({
            pages: 6,
            size: 6,
            total: 1
        }).then(res => {
            console.log(res, '我是人生模板')
            if (res.status === 200) {
                this.setState({
                    TemplateList: res.data.records
                })
            }
        })
    }
    render() {
        return (
            <div className='life-micro'>
                <HasTabBarBackGround>
                    <div className='life-micro-film'>
                        <Nav title="人生微电影" ellipsisIsShow={false} />
                        <div className='micro-film-content'>
                            {/* 头部 */}
                            <ul className='nav-bar'>
                                <li className='item' onClick={() => this.setState({ isActive: 1 })}>
                                    <div className={this.state.isActive == 1 ? 'active Semibold' : 'desc Regular'} style={{fontSize:"13px"}}>选择模板</div>
                                    <div className={this.state.isActive == 1 ? 'hr' : 'no'}></div>
                                </li>
                                <li className='item' onClick={this.state.EditList.length > 0 ? () => this.setState({ isActive: 2 }) : () => this.props.history.push('/no-found')}>
                                    <div className={this.state.isActive == 2 ? 'active Semibold' : 'desc Regular'} style={{fontSize:"13px"}}>编辑中</div>
                                    <div className={this.state.isActive == 2 ? 'hr' : 'no'}></div>
                                </li>
                                <li className="item" onClick={this.state.MakeList.length > 0 ? () => this.setState({ isActive: 3 }) : () => this.props.history.push('/no-found')}>
                                    <div className={this.state.isActive == 3 ? 'active Semibold' : 'desc Regular'} style={{fontSize:"13px"}}>制作中</div>
                                    <div className={this.state.isActive == 3 ? 'hr' : 'no'}></div>
                                </li>
                                <li className="item" onClick={this.state.CompleteList.length > 0 ? () => this.setState({ isActive: 4 }) : () => this.props.history.push('/no-found')}>
                                    <div className={this.state.isActive == 4 ? 'active Semibold' : 'desc Regular'} style={{fontSize:"13px"}}>已完成</div>
                                    <div className={this.state.isActive == 4 ? 'hr' : 'no'}></div>
                                </li>
                            </ul>
                            {/* 内容 */}
                            <div className='content-infos' style={{ display: (this.state.isActive == 1 ? 'block' : 'none') }}>
                                <ul className='part-one'>
                                    {this.state.TemplateList.map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <li className='item SemiBold' onClick={() => this.props.history.push(`/microfilm-production/${item.id}`)}>
                                                    <video id='video' x5-video-player-type="h5"
                                                        src={BASE_URL_STATIC + item.filmUrl}
                                                        muted="muted"
                                                        ref="loopVideo"
                                                        loop
                                                        webkit-playsinline=""
                                                        playsinline=""
                                                        preload="metadata"
                                                        poster={BASE_URL_STATIC + item.coverPhoto}
                                                    >
                                                        <source src={BASE_URL_STATIC + item.filmUrl} type='video/mp4'></source>
                                                    </video>
                                                    {/* <video src={BASE_URL_STATIC + item.filmUrl} /> */}
                                                    <div className='desc'>{item.name}</div>
                                                </li>
                                            </Fragment>
                                        )
                                    })}

                                </ul>
                            </div>
                            <div className='content-infos' style={{ display: (this.state.isActive == 2 ? 'block' : 'none') }}>
                                <ul className='part-two'>
                                    {this.state.EditList.map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <li className='item'>
                                                    <img src={template} />
                                                    <div className='infos'>
                                                        <div className='desc'>家庭温馨照</div>
                                                        <div className='date'>2022-6-10</div>
                                                    </div>
                                                    <div className='del'><span>删除</span></div>
                                                </li>
                                            </Fragment>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='content-infos' style={{ display: (this.state.isActive == 3 ? 'block' : 'none') }}>
                                <ul className='part-two'>
                                    {this.state.MakeList.map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <li className='item'>
                                                    <img src={template} />
                                                    <div className='infos'>
                                                        <div className='desc'>家庭温馨照</div>
                                                        <div className='date'>2022-6-10</div>
                                                    </div>
                                                    <div className='del'><span>删除</span></div>
                                                </li>
                                            </Fragment>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='content-infos' style={{ display: (this.state.isActive == 4 ? 'block' : 'none') }}>
                                <ul className='part-two'>
                                    {this.state.CompleteList.map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <li className='item'>
                                                    <img src={template} />
                                                    <div className='infos'>
                                                        <div className='desc'>家庭温馨照</div>
                                                        <div className='date'>2022-6-10</div>
                                                    </div>
                                                    <div className='del'><span>删除</span></div>
                                                </li>
                                            </Fragment>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>

                        {/* 底部 */}
                        <div className='footer' style={{ display: (this.state.isActive == 1 ? 'block' : 'none') }}>
                            <div className='infos'>
                                如需定制化追思影集或者办理追思会请联系 “售后热线电话” 59834448
                            </div>
                        </div>
                    </div>
                </HasTabBarBackGround>
            </div >
        )
    }
}

export default LifeMicroFilm
