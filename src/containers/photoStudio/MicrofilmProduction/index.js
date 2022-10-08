import React, { Component } from 'react';
import './index.css';
import Nav from '@/components/nav/nav';
import template from '@/assets/img/yun-photo/template.png';
import { BASE_URL_STATIC } from '@/server/service';
import { APILookMicroMovied } from '@/server/photoStudio';
import GeneralBackGround from '../../../components/GeneralBackGround';

export class MicrofilmProduction extends Component {
    state = {
        microId: null,
        moviesUrl: null,
        isAutoPlay: false,
        coverPhoto: null
    }
    componentDidMount() {
        this.setState({
            microId: this.props.match.params.id
        }, () => {
            this.getMoviesDetail();
        })
    }

    // 获取模板详情
    getMoviesDetail = () => {
        APILookMicroMovied(this.state.microId).then(res => {
            console.log(res, '我是模板详细信息')
            this.setState({
                moviesUrl: res.data.data.filmUrl,
                coverPhoto: res.data.data.coverPhoto
            })
        })
    }
    render() {
        return (
            <div className='microfilm-production'>
                <GeneralBackGround>
                    <div>
                        <Nav title="人生微电影" ellipsisIsShow={false} />
                        <div className='microfilm-production-content'>
                            <div className='infos'>
                                <video id='video' x5-video-player-type="h5"
                                    src={BASE_URL_STATIC + this.state.moviesUrl}
                                    muted="muted"
                                    ref="loopVideo"
                                    loop
                                    webkit-playsinline=""
                                    playsinline=""
                                    preload="metadata"
                                    className='part-two'
                                    controls
                                    poster={BASE_URL_STATIC + this.state.coverPhoto}
                                >
                                    <source src={BASE_URL_STATIC + this.state.moviesUrl} type='video/mp4'></source>
                                </video>
                                {/* <video src={BASE_URL_STATIC + this.state.moviesUrl} controls /> */}
                                {/* <div class="video-img"></div> */}
                            </div>
                            {/* <div className='infons'>
                                <div className='left'>
                                    <span className='big-title'>怀念回忆录</span>
                                    <span className='micor-time'>时长：22s｜720P</span>
                                </div>
                                <div className='right'>立即制作</div>
                            </div> */}
                        </div>
                    </div>
                </GeneralBackGround>
            </div>
        )
    }
}

export default MicrofilmProduction
