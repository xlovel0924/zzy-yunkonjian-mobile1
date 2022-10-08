import React, { Component } from 'react';
import Nav from '@/components/nav/nav';
import './index.css';
import { withRouter } from 'react-router-dom';
import color from '@/assets/img/yun-photo/color.png';
import vague from '@/assets/img/yun-photo/vague.png';
import { BASE_URL_STATIC, YZFILE } from "../../../server/service";
import axios from "axios";
import { Toast } from 'antd-mobile';
import GeneralBackGround from '../../../components/GeneralBackGround';
import { Modal } from 'antd';

// 设置文件夹名称
const PhotoColor = 'colour'
@withRouter
class PhotoColorRepair extends Component {
    state = {
        currentStatus: null,
        currentHeight: '',
        visible: false
    }

    componentDidMount() {
        this.getStatus();
        var height = document.getElementsByTagName('img').clientHeight;
        console.log(height, '我是图片高度')
        this.setState({
            currentHeight: height + 'px'
        })
    }

    getStatus = () => {
        this.setState({
            currentStatus: this.props.match.params.status
        })
    }

    upload = () => {
        var input = document.querySelector('input');
        var self = this;
        var myState = this.state.currentStatus;
        var longRangeURL = null;
        input.click();
        // Toast.info('请上传正面照片！')
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
                formData.append("customPath", PhotoColor);
                console.log(formData, 'FormData')
                axios.post(BASE_URL_STATIC + "commodity/StaticFile/imageUpload", formData).then(res => {
                    console.log(res, "res,then");
                    if (res.status === 200) {
                        longRangeURL = res.data.data.data;
                        self.props.history.push(`/photo-upload/${myState}/${longRangeURL}`)
                    }
                })
            }
        }
    }

    render() {
        return (
            // 照片上色 或 模糊修复
            <div className='photo-color-repair'>
                <GeneralBackGround>
                    {/* 头部 */}
                    <Nav title={this.state.currentStatus == 1 ? '黑白照片上色' : '模糊照片修复'} ellipsisIsShow={false} />

                    {/* 内容 */}
                    <div className='color-repair-content'>
                        <div className='desc'>
                            <div className='big-title'>{this.state.currentStatus == 1 ? '照片上色' : '照片修复'}</div>
                            <div className='small-title'>{this.state.currentStatus == 1 ? '黑白照片变鲜活' : '模糊照片变清晰'}</div>
                            <img src={this.state.currentStatus == 1 ? color : vague} />
                            <hr className='hr' style={{ height: this.state.currentHeight }} />
                            <input type="file" hidden />
                            <div className='experience-now' onClick={() => this.setState({ visible: true })}>立即体验</div>
                        </div>
                    </div>

                    <Modal
                        visible={this.state.visible}
                        transparent
                        title="温馨提示"
                        className="color-repair-model"
                        wrapClassName='wrapper-modal'
                        maskClosable={true}
                        onClose={() => this.setState({ visible: false })}
                    >
                        <div className='model-content'>
                            <span className='Semibold'>请上传正面照<span className='Regular'>(照片请尽量小于15MB)</span></span>
                            <div className='model-options'>
                                {/* <button className='cancel' onClick={() => this.setState({ visible: false })}>取消</button> */}
                                <button className='submit' onClick={() => this.upload()}>确认</button>
                            </div>
                        </div>
                    </Modal>
                </GeneralBackGround>
            </div>
        )
    }
}

export default PhotoColorRepair;