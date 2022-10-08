import React, { Component } from 'react';
import Nav from '../../../components/nav/nav';
import './index.css';
import { withRouter } from 'react-router-dom';
import ThreePhoto from '../../../assets/img/yun-photo/ThreePhoto.mp4';
import { Toast } from 'antd-mobile';
import { BASE_URL_STATIC, YZFILE } from "../../../server/service";
import axios from "axios";
import GeneralBackGround from '../../../components/GeneralBackGround';

const ThreeDPhoto = "colour"

@withRouter
class photoThreeProduction extends Component {
  componentDidMount() {
    if (!navigator.userAgent.includes('iPhone')) {
      let btn = document.getElementById("btnbtn");
      btn.click();
    }
  }


  upload = () => {
    var input = document.querySelector('input');
    var self = this;
    var longRangeURL = null;
    input.click();
    input.onchange = function (e) {
      Toast.loading('上传中...')
      if (e.target.files && e.target.files[0]) {
        // 校验文件格式
        const reg = /\.(jpg|jpeg|png|JPG|PNG)$/;
        if (!reg.test(e.target.value)) {
          return Toast.info("请上传.png/.jpg/.jpeg格式的图片");
        }

        const imgUrl = e.target.files[0]
        console.log(imgUrl, 'ImgURL')
        const formData = new FormData();
        formData.append("file", imgUrl);
        formData.append("customPath", ThreeDPhoto);
        console.log(formData, 'FormData')
        axios.post(BASE_URL_STATIC + "commodity/StaticFile/imageUpload", formData).then(res => {
          console.log(res, "res,then");
          if (res.status === 200) {
            longRangeURL = res.data.data.data;
            self.props.history.push(`/three-productioning/${longRangeURL}`)
            Toast.hide()
          }
        })
      }
    }
  }

  render() {
    return (
      <div className='photo-three-production'>
        <GeneralBackGround>
          <div>
            {/* 头部 */}
            <Nav title={'3D照片制作'} ellipsisIsShow={false} />
            {/* 内容 */}
            <div className='three-production-content'>
              <div className='part-one'>
                <span className='big-title'>3D照片</span>
                <span className='desc'>让照片动起来</span>
              </div>
              {navigator.userAgent.includes('iPhone')
                ? <>
                  <button id='btnbtn' onClick={() => {
                    let video = document.getElementById("video");
                    video.play();
                  }} style={{ visibility: "hidden", height: '0px' }}>点击</button>
                  <video id='video' x5-video-player-type="h5"
                    src={ThreePhoto}
                    muted="muted"
                    ref="loopVideo"
                    loop
                    webkit-playsinline=""
                    playsinline=""
                    preload="metadata"
                    className='part-two'
                  >
                    <source src={ThreePhoto} type='video/mp4'></source>
                  </video>
                </>
                : <video src={ThreePhoto} autoPlay loop />
              }
              <input type="file" hidden />
              <div className='part-three' onClick={() => this.upload()}>立即体验</div>
            </div>
          </div>
        </GeneralBackGround >
      </div >
    )
  }
}

export default photoThreeProduction;