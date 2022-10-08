import React, { Component } from 'react';
import Nav from '@/components/nav/nav';
import './index.css';
import { withRouter } from 'react-router-dom';
import { BASE_URL_STATIC, YZFILE, smallOwnersUrl, YZPAGE } from "../../../server/service";
import sendGif from "@/assets/img/yun-space-time-mail/sendGif.gif";
import axios from "axios";

import history from '@/history';
import { Toast, InputItem } from 'antd-mobile';
import moment from 'moment';

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import quillEmoji from 'quill-emoji';
import "quill-emoji/dist/quill-emoji.css";
import { ImageDrop } from 'quill-image-drop-module';
import _ from 'lodash';

const dateFormat = 'YYYY-MM-DD HH:mm:ss'

// 富文本编辑器
const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;
Quill.register({
    'formats/emoji': EmojiBlot,
    'modules/emoji-shortname': ShortNameEmoji,
    'modules/emoji-toolbar': ToolbarEmoji,
    'modules/emoji-textarea': TextAreaEmoji,
    // 'modules/ImageExtend': ImageExtend, 
    'modules/ImageDrop': ImageDrop,
}, true);



// 设置文件夹名称
const PhotoColor = 'default';
@withRouter
class CreateMail extends Component {
    constructor() { 
        super(); 
        this.reactQuillRef = null; 
    }
    state = {
        // 编辑器工具栏
        modules: {
            toolbar: {
                container: [
                    [{ 'size': ['small', false, 'large', 'huge'] }], //字体设置
                    // [{ 'header': [1, 2, 3, 4, 5, 6, false] }], //标题字号，不能设置单个字大小
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                    ['image'], // a链接和图片的显示
                    [{ 'align': [] }],
                    [{
                        'background': ['rgb(  0,   0,   0)', 'rgb(230,   0,   0)', 'rgb(255, 153,   0)',
                            'rgb(255, 255,   0)', 'rgb(  0, 138,   0)', 'rgb(  0, 102, 204)',
                            'rgb(153,  51, 255)', 'rgb(255, 255, 255)', 'rgb(250, 204, 204)',
                            'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)',
                            'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)',
                            'rgb(240, 102, 102)', 'rgb(255, 194, 102)', 'rgb(255, 255, 102)',
                            'rgb(102, 185, 102)', 'rgb(102, 163, 224)', 'rgb(194, 133, 255)',
                            'rgb(136, 136, 136)', 'rgb(161,   0,   0)', 'rgb(178, 107,   0)',
                            'rgb(178, 178,   0)', 'rgb(  0,  97,   0)', 'rgb(  0,  71, 178)',
                            'rgb(107,  36, 178)', 'rgb( 68,  68,  68)', 'rgb( 92,   0,   0)',
                            'rgb(102,  61,   0)', 'rgb(102, 102,   0)', 'rgb(  0,  55,   0)',
                            'rgb(  0,  41, 102)', 'rgb( 61,  20,  10)']
                    }],
                    [{
                        'color': ['rgb(  0,   0,   0)', 'rgb(230,   0,   0)', 'rgb(255, 153,   0)',
                            'rgb(255, 255,   0)', 'rgb(  0, 138,   0)', 'rgb(  0, 102, 204)',
                            'rgb(153,  51, 255)', 'rgb(255, 255, 255)', 'rgb(250, 204, 204)',
                            'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)',
                            'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)',
                            'rgb(240, 102, 102)', 'rgb(255, 194, 102)', 'rgb(255, 255, 102)',
                            'rgb(102, 185, 102)', 'rgb(102, 163, 224)', 'rgb(194, 133, 255)',
                            'rgb(136, 136, 136)', 'rgb(161,   0,   0)', 'rgb(178, 107,   0)',
                            'rgb(178, 178,   0)', 'rgb(  0,  97,   0)', 'rgb(  0,  71, 178)',
                            'rgb(107,  36, 178)', 'rgb( 68,  68,  68)', 'rgb( 92,   0,   0)',
                            'rgb(102,  61,   0)', 'rgb(102, 102,   0)', 'rgb(  0,  55,   0)',
                            'rgb(  0,  41, 102)', 'rgb( 61,  20,  10)']
                    }],
                    // ['clean'], //清空
                    ['emoji'], //emoji表情，设置了才能显示
                    // ['video2'], //我自定义的视频图标，和插件提供的不一样，所以设置为video2
                ],
                handlers: {
                    'image': ()=>this.imageHandler(), //点击图片标志会调用的方法
                    // 'video2': this.showVideoModal.bind(this),
                },
            },
            // ImageExtend: {
            //   loading: true,
            //   name: 'img',
            //   action: RES_URL + "connector?isRelativePath=true",
            //   response: res => FILE_URL + res.info.url
            // },
            ImageDrop: true,
            'emoji-toolbar': true,  //是否展示出来
            "emoji-textarea": false, //我不需要emoji展示在文本框所以设置为false
            "emoji-shortname": true,
        },
        mailValue: '',   // 富文本html字符
        mailTitle: '',     // 信件标题
        isPublic: 1,    // 是否公开 0公开  1不公开
        userInfo: {},
        timingSendVisible: false,   // 懂事发送弹窗
        showAnimate: false,     // 显示动画
        year: '',
        month: '',
        day: '',
        hour: '',
        minute: '',
        second: '',
    }

    componentDidMount() {
        this.setState({
            userInfo: JSON.parse(window.localStorage.getItem("user")).data,
            year: moment().format('YYYY'),
            month: moment().format('MM'),
            day: moment().format('DD'),
            hour: moment().format('HH'),
            minute: moment().format('mm'),
            second: moment().format('ss'),
        })
    }

    // 获取当前富文本内容保存到state
    handleProcedureContentChange = (content, delta, source, editor) => {        
        this.changeState('mailValue',content);
    };

    //这是点击图片图标触发的事件
    imageHandler=()=> {
        var self = this;
        const { mailValue } = self.state;
        var longRangeURL = null;
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.setAttribute('multiple', 'multiple')
        input.click();
        input.onchange = function (e) {
            Toast.loading('上传中...')
            if (e.target.files && e.target.files[0]) {
                // 校验文件格式
                const reg = /\.(jpg|jpeg|png|JPG|PNG)$/;
                if (!reg.test(e.target.value)) {
                    return Toast.info("请上传.png/.jpg/.jpeg格式的图片",1.2);
                }
                const imgUrl = e.target.files[0]
                const formData = new FormData();
                formData.append("file", imgUrl);
                formData.append("customPath", PhotoColor);
                // console.log(formData, 'FormData')
                axios.post(BASE_URL_STATIC + "commodity/StaticFile/imageUpload", formData).then(res => {
                    if (res.status === 200) {
                        longRangeURL = res.data.data.data;
                        var tempStr = mailValue;
                        var tempSaveStr = tempStr.slice(0,tempStr.length-4);
                        tempSaveStr = tempSaveStr + `<img src='${BASE_URL_STATIC + longRangeURL}' /></p>`
                        Toast.hide();
                        self.changeState('mailValue', tempSaveStr);
                    }
                })
            }
        }       
    }

    // 改变state
    changeState=(key,value)=>{
        this.setState({
            [key]:value
        })
    }

    // 立即发送
    onSendNow=()=>{
        const { userInfo, isPublic, mailTitle, mailValue } = this.state;
        
        if(mailTitle==='' || mailValue===''){
            Toast.fail('请输入标题及内容', 1.2)
        }else{
            this.setState({
                showAnimate: true
            });
            const sendUrl = smallOwnersUrl(YZPAGE + 'spacetimeMailbox/tSpacetimeMailbox/add')
            const payload = {
                createId: userInfo.id,
                isPublic: isPublic,
                letterContent: mailValue,
                letterTitle: mailTitle,
                mailDate: moment().format(dateFormat),
            }
            // 添加
            fetch(sendUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': userInfo.token },
                body: JSON.stringify(payload),
            }).then(function(response) {
                return response.json();
            }).then((res)=>{
                if(res.status===200){
                    Toast.success('发送成功', 1.5)
                    setTimeout(() => {
                        this.setState({
                            showAnimate: false
                        });
                        this.handleBack()
                    }, 2000);
                }else{
                    Toast.success('发送失败', 1.5)
                    setTimeout(() => {
                        this.setState({
                            showAnimate: false
                        });
                    }, 2000);
                }
                
            })
        }
    }

    // 定时发送
    onTimingSend=()=>{
        const { userInfo, isPublic, mailTitle, mailValue, year, month, day, hour, minute, second } = this.state;
        const dateStr = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        const isDate = moment(dateStr,dateFormat).isValid();
        console.log(dateStr,'时间--------')
        if(mailTitle==='' || mailValue===''){
            Toast.fail('请输入标题及内容', 1.2)
        }else{
            if(!isDate){
                Toast.fail('请输入正确的日期',1.3)
            }else{
                this.setState({
                    showAnimate: true
                });
                const sendUrl = smallOwnersUrl(YZPAGE + 'spacetimeMailbox/tSpacetimeMailbox/add')
                const payload = {
                    createId: userInfo.id,
                    isPublic: isPublic,
                    letterContent: mailValue,
                    letterTitle: mailTitle,
                    mailDate: dateStr,
                }
                // 添加
                fetch(sendUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': userInfo.token },
                    body: JSON.stringify(payload),
                }).then(function(response) {
                    return response.json();
                }).then((res)=>{
                    if(res.status===200){
                        Toast.success('发送成功', 1.5)
                        setTimeout(() => {
                            this.setState({
                                showAnimate: false
                            });
                            this.handleBack()
                        }, 2000);
                    }else{
                        Toast.success('发送失败', 1.5)
                        setTimeout(() => {
                            this.setState({
                                showAnimate: false
                            });
                        }, 2000);
                    }
                    
                })
            }
        }
    }

    handleBack = () => {
        history.goBack();
    }

   

    render() {
        const { 
            mailValue, modules, mailTitle, timingSendVisible, showAnimate,
            year, month, day, hour, minute, second
        } = this.state;

        var ddd = moment('2022-02-88 11:11:11','YYYY-MM-DD HH:mm:ss');
        console.log(ddd.isValid())

       


        return (
            // 写信
            <div className='space-time-mail-create'>
                {/* 头部 */}
                <Nav title={'写信'} ellipsisIsShow={false} />
                {showAnimate?
                    <div className='animateContainer'>
                        <img src={sendGif} alt='gif' width='100%' height='100%' />
                    </div>:null
                }
                <div className='space-time-mail-create-title'>
                    <InputItem
                        style={{ marginTop: -8 }}
                        maxLength={20}
                        value={mailTitle}
                        onInput={(e)=>{this.changeState('mailTitle',e.target.value)}}
                        placeholder="请输入信件标题"
                    />
                </div>
                {timingSendVisible?
                    <div className='timingSendBox'>
                        <div className='timingSendTitle'>选择发送时间</div>
                        <div className='timingSendInputContainer'>
                            <div className='timingSendInputItem'>
                                <InputItem
                                    type='digit'
                                    maxLength={4}
                                    value={year}
                                    onInput={(e)=>{this.changeState('year',e.target.value)}}
                                    placeholder="输入年"
                                />
                            </div>
                            <div className='timingSendInputUnit'>年</div>

                            <div className='timingSendInputItem' style={{width:30}}>
                                <InputItem
                                    type='digit'
                                    maxLength={2}
                                    value={month}
                                    onInput={(e)=>{this.changeState('month',e.target.value)}}
                                    placeholder="输入月"
                                />
                            </div>
                            <div className='timingSendInputUnit'>月</div>
                            <div className='timingSendInputItem' style={{width:30}}>
                                <InputItem
                                    type='digit'
                                    maxLength={2}
                                    value={day}
                                    onInput={(e)=>{this.changeState('day',e.target.value)}}
                                    placeholder="输入日"
                                />
                            </div>
                            <div className='timingSendInputUnit'>日</div>

                            <div className='timingSendInputItem' style={{width:30}}>
                                <InputItem
                                    type='digit'
                                    maxLength={2}
                                    value={hour}
                                    onInput={(e)=>{this.changeState('hour',e.target.value)}}
                                    placeholder="输入时"
                                />
                            </div>
                            <div className='timingSendInputUnit'>时</div>

                            <div className='timingSendInputItem' style={{width:30}}>
                                <InputItem
                                    type='digit'
                                    maxLength={2}
                                    value={minute}
                                    onInput={(e)=>{this.changeState('minute',e.target.value)}}
                                    placeholder="输入分"
                                />
                            </div>
                            <div className='timingSendInputUnit'>分</div>

                            <div className='timingSendInputItem' style={{width:30}}>
                                <InputItem
                                    type='digit'
                                    maxLength={2}
                                    value={second}
                                    onInput={(e)=>{this.changeState('second',e.target.value)}}
                                    placeholder="输入秒"
                                />
                            </div>
                            <div className='timingSendInputUnit'>秒</div>
                        </div>
                        <div className='timingSendInfo'>
                            本信件将于 <span className='timingSendInfoTime'>{year}年{month}月{day}日 {hour}时{minute}分{second}秒</span> 发送给自己
                        </div>
                        <div className='timingSendSubmitBox'>
                            <div className='timingSendSubmitBtn' onClick={this.onTimingSend}>发送</div>
                            <div className='timingSendSubmitBtn' onClick={()=>this.changeState('timingSendVisible', false)}>取消</div>
                        </div>
                    </div>:null
                }
                {/* 富文本编辑器 */}
                <div className='mail-create-mailContainer'>
                    
                    <ReactQuill
                        ref={(el) => { this.reactQuillRef = el }}
                        key="htmlEditor"
                        id="textDiv1"
                        theme="snow"
                        value={mailValue}
                        modules={modules}
                        placeholder='请输入信件内容'
                        onChange={this.handleProcedureContentChange}
                    />
                </div>
                <div className='mail-create-bottomBtns'>
                    <div className='mail-create-radios'>
                        <div className='isPublicTitle'>&nbsp;是否公开信箱</div>
                        <div className='redioBtn'></div>是
                        <div className='redioBtnSelected'></div>否
                    </div>
                    
                    <div className='mail-create-submitBox'>
                        <div className='mail-create-submit' onClick={this.onSendNow}>立即发送</div>
                        <div className='mail-create-submit' onClick={()=>this.changeState('timingSendVisible', true)}>定时发送</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateMail;