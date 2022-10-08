import React, { Component, Fragment } from 'react';
import './index.css';
import Nav from '@/components/nav/nav';
import Icon from '@/assets/img/no-found/foundicon.png';
import { useHistory } from 'react-router-dom';
import { ApiLookMyPhoto, ApiLookThreeD } from '@/server/user';
import { BASE_URL_STATIC } from '@/server/service';
import RViewerJS from "viewerjs-react";
import GeneralBackGround from '../../../components/GeneralBackGround';

// 无照片
function NotPhoto() {
    const history = useHistory();
    const pageNavgitor = (url) => {
        history.push(url)
    }
    return (
        <Fragment>
            <div className='not-photo-infos'>
                <img src={Icon} />
                <div className='desc'>您现在还没有照片哦~</div>
                <div className='go-photograph' onClick={() => pageNavgitor('/photo-studio-homepage')}>去永恒照相馆</div>
            </div>
        </Fragment>
    )
}

// 有照片
function HavePhoto(props) {
    return (
        <Fragment>
            <div className='have-photo-infos'>
                {props.ColorList.length > 0
                    ? <div className='photo-details'>
                        <div className='big-title'>黑白照片修复</div>
                        <ul className='menu-list scroll'>
                            {props.ColorList.map((item, index) => {
                                return (
                                    <Fragment key={item.id}>
                                        <li>
                                            <RViewerJS>
                                                <img src={BASE_URL_STATIC + item.photoUrl.replace(/\\/, '/')} />
                                            </RViewerJS>
                                        </li>
                                    </Fragment>
                                )
                            })}
                        </ul>
                    </div> : ''
                }
                {/* 模糊 */}
                {props.VagueList.length > 0
                    ? <div div className='photo-details'>
                        <div className='big-title'>模糊照片修复</div>
                        <ul className='menu-list scroll'>
                            {props.VagueList.map((item, index) => {
                                return (
                                    <Fragment key={item.id}>
                                        <li>
                                            <RViewerJS>
                                                <img src={BASE_URL_STATIC + item.photoUrl.replace(/\\/, '/')} />
                                            </RViewerJS>
                                        </li>
                                    </Fragment>
                                )
                            })}
                        </ul>
                    </div> : ''
                }
                {/* 3D */}
                {props.ThreeDList.length > 0
                    ? <div className='photo-details'>
                        <div className='big-title'>3D照片制作</div>
                        <ul className='menu-list scroll'>
                            {props.ThreeDList.map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        <li>
                                            <RViewerJS>
                                                <video src={BASE_URL_STATIC + item.photographUrl.replace(/\\/, '/')} controls />
                                            </RViewerJS>
                                        </li>
                                    </Fragment>
                                )
                            })}
                        </ul>
                    </div> : ''
                }
                {/* 人生微电影 */}
                {props.LifeMoviesList.length > 0
                    ? <div className='photo-details'>
                        <div className='big-title'>人生微电影</div>
                        <ul className='menu-list scroll'>
                            {props.LifeMoviesList.map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        <li>
                                            <RViewerJS>
                                                <img src={BASE_URL_STATIC + item.photoUrl.replace(/\\/, '/')} />
                                            </RViewerJS>
                                        </li>
                                    </Fragment>
                                )
                            })}
                        </ul>
                    </div> : ''
                }
            </div>
        </Fragment >
    )
}

class MyPhoto extends Component {
    state = {
        userDate: null,
        // 黑白
        ColorList: [],
        // 模糊
        VagueList: [],
        // 3D
        ThreeDList: [],
        // 人生微电影
        LifeMoviesList: []
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.setState({
                userDate: JSON.parse(localStorage.getItem('user')).data.id
            }, () => {
                this.getMyPhoto(1)
                this.getMyPhoto(2)
                this.getThreeD()
            })
        }
    }

    // 获取照片修复
    getMyPhoto = (type) => {
        ApiLookMyPhoto({
            memberId: this.state.userDate,
            repairType: type
        }).then(res => {
            if (res.status === 200) {
                if (type === 1) {
                    this.setState({
                        ColorList: res.data.data.records
                    })
                    console.log(this.state.ColorList, '我在这里上色')
                } else {
                    this.setState({
                        VagueList: res.data.data.records
                    })
                    console.log(this.state.VagueList, '我在这里模糊')
                }
            }
        })
    }

    //获取3D
    getThreeD = () => {
        ApiLookThreeD({
            memberinfoId: this.state.userDate
        }).then(res => {
            console.log(res, '我是3D')
            if (res.status === 200) {
                this.setState({
                    ThreeDList: res.data.data.records
                })
            }
        })
    }
    render() {
        return (
            <div className='my-photo'>
                <GeneralBackGround>
                    {/* 头部 */}
                    <Nav title={'我的相册'} ellipsisIsShow={false} />
                    <div className='my-photo-content'>
                        {
                            this.state.ColorList.length > 0 || this.state.VagueList.length > 0 || this.state.ThreeDList.length > 0 || this.state.LifeMoviesList.length > 0
                                ? <HavePhoto ColorList={this.state.ColorList} VagueList={this.state.VagueList} ThreeDList={this.state.ThreeDList} LifeMoviesList={this.state.LifeMoviesList} />
                                : <NotPhoto />
                        }
                    </div>
                </GeneralBackGround>
            </div>
        )
    }
}

export default MyPhoto;