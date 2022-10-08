import React, { Component } from 'react';
import Nav from '../../../components/nav/nav';
import './index.css';
import { APIThreeDimensional, APILookThreeD, APIAddThreeD, APIUrlDownload } from '@/server/photoStudio';
import { BASE_URL_STATIC } from '@/server/service'
import { Toast } from 'antd-mobile';
import GeneralBackGround from '../../../components/GeneralBackGround';

export class ThreeProductioning extends Component {
  constructor() {
    super();
    this.timer = null;
  }

  state = {
    threeDVideo: null,
    showVideo: null,
    taskId: null,
    currentStatus: null,
    userDate: null,
    urlPath: null,
    isShow: false
  }

  componentDidMount() {
    this.getVideo();
    if (localStorage.getItem('user')) {
      this.setState({
        userDate: JSON.parse(localStorage.getItem('user')).data.id
      })
    }

  }

  getVideo = () => {
    this.setState({
      threeDVideo: this.props.match.params.threePhoto.replace(/\\/, "/"),
    })
  }

  // 请求3D
  getThreeDVideo = () => {
    Toast.loading('加载中...')
    APIThreeDimensional({
      url: BASE_URL_STATIC + this.state.threeDVideo
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          taskId: res.data.data.data
        })
      }
      this.timer = setInterval(() => {
        this.ThirdSearch();
      }, 2000);

      // 请求三方查找视频资源
      Toast.hide()
    })
  }

  // 第三方查找
  ThirdSearch = () => {
    APILookThreeD(this.state.taskId).then(res => {
      Toast.loading('生成中...')
      console.log(res, '三方')
      if (res.data.status === 200) {
        clearInterval(this.timer)
        this.setState({
          urlPath: res.data.data.resultUrl
        }, () => {
          this.UrlDownLoad();

        })
        Toast.hide();
      }
    })
  }

  // 根据url下载
  UrlDownLoad = () => {
    APIUrlDownload({
      downloadDir: "\\colour" + "\\" + this.state.userDate,
      fileType: 'mp4',
      urlPath: this.state.urlPath
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          showVideo: res.data.data.data
        })
        if (!navigator.userAgent.includes('iPhone')) {
          setTimeout(() => {
            this.setState({
              isShow: true
            })
          }, 2000);
          var btn = document.getElementById("myvideo");
          console.log(btn, "btn")
          btn.click();
        }
      }
    })
  }

  // 立即保存
  SaveThreeDVideo = () => {
    APIAddThreeD({
      memberinfoId: this.state.userDate,
      photographUrl: this.state.showVideo,
    }).then(res => {
      if (res.status === 200) {
        Toast.info('保存成功，请在我的相册中查看哦~')
      }
    })
  }

  render() {
    return (
      <div className='three-productioning'>
        <GeneralBackGround>
          {/* 头部 */}
          <Nav title={'3D照片制作'} ellipsisIsShow={false} />
          {/* 内容 */}
          <div className='three-productioning-content'>
            <div className='big-title'>让照片动起来</div>
            <div className='generated'>
              {navigator.userAgent.includes('iPhone') && !navigator.userAgent.includes('iPhone X')
                ? <video
                  src={this.state.showVideo && BASE_URL_STATIC + this.state.showVideo.replace(/\\/, '/')}
                  loop
                  autoPlay
                  className='part-two'
                  style={{ display: (this.state.showVideo ? 'block' : 'none') }}
                />
                :
                <video id='video' x5-video-player-type="h5"
                  src={this.state.showVideo && BASE_URL_STATIC + this.state.showVideo.replace(/\\/, '/')}
                  muted="muted"
                  ref="loopVideo"
                  loop
                  webkit-playsinline=""
                  playsinline=""
                  preload="metadata"
                  className='part-two'
                  style={{ display: (this.state.isShow ? 'block' : 'none') }}
                >
                  <source src={this.state.showVideo && BASE_URL_STATIC + this.state.showVideo.replace(/\\/, '/')} type='video/mp4'></source>
                </video>
              }
              {
                navigator.userAgent.includes('iPhone')
                  ? <img src={BASE_URL_STATIC + this.state.threeDVideo} style={{ display: (this.state.showVideo ? 'none' : 'block') }} />
                  : <img src={BASE_URL_STATIC + this.state.threeDVideo} style={{ display: (this.state.isShow ? 'none' : 'block') }} />
              }
              {!this.state.showVideo
                ? <button onClick={() => this.getThreeDVideo()}>立即生成</button>
                : <>
                  <button id='myvideo' onClick={() => {
                    this.setState({
                      isShow: true
                    })
                    let video = document.getElementById("video");
                    video.play();
                  }} >
                    查看视频
                  </button>
                  <button onClick={() => this.SaveThreeDVideo()}>立即保存</button>
                </>
              }
            </div>
          </div>
        </GeneralBackGround >
      </div >
    )
  }
}

export default ThreeProductioning