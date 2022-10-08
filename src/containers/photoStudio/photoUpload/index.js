import React, { Component } from 'react';
import Nav from '@/components/nav/nav';
import './index.css';
import { BASE_URL_STATIC } from "../../../server/service";
import { APIColor, APIClear, APIAddColor, APIBaseTypePhotot } from '../../../server/photoStudio'
import { Toast } from 'antd-mobile';
import GeneralBackGround from '../../../components/GeneralBackGround'

export class PhotoUpload extends Component {
    state = {
        currentState: null,
        colorImg: null,
        repairImg: null,
        showImg: null,
        userDate: null
    }
    componentDidMount() {
        this.updateState();
        if (localStorage.getItem('user')) {
            this.setState({
                userDate: JSON.parse(localStorage.getItem('user')).data.id
            })
        }
    }

    updateState = () => {
        this.setState({
            currentState: this.props.match.params.status,
            colorImg: this.props.match.params.imgUrl.replace(/\\/, "/")
        })
    }

    // 图片修复
    RepairImg = (data) => {
        Toast.loading('处理中...')
        if (this.state.currentState == 1) {
            // 照片上色
            APIColor(data).then(res => {
                console.log(res, '我在这里')
                if (res.status === 200) {
                    this.setState({
                        showImg: res.data.data.image
                    });
                    Toast.hide();
                }
            })
        } else {
            // 照片变清晰   
            APIClear(data).then(res => {
                if (res.status === 200) {
                    this.setState({
                        showImg: res.data.data.image
                    })
                    Toast.hide();
                }
            })
        }
    }

    // base64文件上传
    SaveRepair = (type) => {
        Toast.loading('保存中...')
        APIBaseTypePhotot({
            base64Text: this.state.showImg,
            customPath: "colour" + "\\" + this.state.userDate
        }).then(res => {
            console.log(res, 'base64上传')
            if (res.status === 200) {
                this.SavePhoto(res.data.data.data, type)
                Toast.hide();
            }
        })

    }
    SavePhoto = (data, type) => {
        APIAddColor({
            memberId: this.state.userDate,
            photoUrl: data,
            repairType: type
        }).then(res => {
            if (res.status === 200) {
                Toast.info('保存成功！请在我的相册中查看哦~')
            }
        })
    }

    render() {
        const currentImg = 'C:/tmpUploadPath/lingangImages/static/' + this.state.colorImg
        return (
            <div className='photo-upload'>
                <GeneralBackGround>
                    <div>
                        <Nav title={this.state.currentState == 1 ? '照片上色' : '照片修复'} ellipsisIsShow={false} />
                        <div className='photo-upload-content'>
                            <img src={this.state.showImg ? ('data:image/png;base64,' + this.state.showImg) : BASE_URL_STATIC + this.state.colorImg} className={this.state.colorImg ? 'img-infos' : 'no-infos'} />
                            {!this.state.showImg
                                ? <button className='btn' onClick={() => this.RepairImg(currentImg)}>立即修复</button>
                                : <button className='btn' onClick={() => this.SaveRepair(this.state.currentState)}>立即保存</button>}
                        </div>
                    </div>
                </GeneralBackGround>
            </div>
        )
    }
}

export default PhotoUpload;