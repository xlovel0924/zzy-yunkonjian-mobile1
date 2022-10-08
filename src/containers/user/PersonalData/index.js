import React, { Component, Fragment, useEffect, useState } from 'react';
import Nav from '../../../components/nav/nav';
import './index.css';
import headerImg from '@/assets/img/life-biography/headportrait.png';
import right from '@/assets/img/user-self/right.png';
import { ApiGetUserInfos, ApiUpdateUserInfos, DelHeadImg } from '@/server/user';
import { APIPhotoReview } from '@/server/photoStudio'
import { Modal } from 'antd-mobile';
import { BASE_URL_STATIC, YZFILE } from "../../../server/service";
import axios from "axios";
import { Toast } from 'antd-mobile';
import GeneralBackGround from '../../../components/GeneralBackGround';

// 设置文件夹名称
const PhotoHeaderImg = 'member';

// 省市二级联动组件
const provinceData = ['安徽', '澳门', '北京', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北', '河南', '黑龙江', '湖北', '湖南', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山东', '山西', '陕西', '上海', '四川', '台湾', '天津', '西藏', '香港', '新疆', '云南', '浙江', '重庆', '其他']
const cityData = {
    '安徽': ['合肥', '安庆', '蚌埠', '亳州', '巢湖', '池州', '滁州', '阜阳', '淮北', '淮南', '黄山', '六安', '马鞍山', '宿州', '铜陵', '芜湖', '宣城'],
    '澳门': ['澳门'],
    '北京': ['昌平', '朝阳区', '崇文', '大兴', '东城', '房山', '丰台', '海淀', '怀柔', '门头沟', '密云', '平谷', '石景山', '顺义', '通州区', '西城', '宣武', '延庆'],
    '福建': ['福州', '龙岩', '南平', '宁德', '莆田', '泉州', '三明', '厦门', '漳州'],
    '甘肃': ['兰州', '白银', '定西', '甘南', '嘉峪关', '金昌', '酒泉', '临夏', '陇南', '平凉', '庆阳', '天水', '武威', '张掖'],
    '广东': ['广州', '潮州', '东莞', '佛山', '河源', '惠州', '江门', '揭阳', '茂名', '梅州', '清远', '汕头', '汕尾', '韶关', '深圳', '阳江', '云浮', '湛江', '肇庆', '中山', '珠海'],
    '广西': ['桂林', '百色', '北海', '崇左', '防城港', '贵港', '河池', '贺州', '来宾', '柳州', '南宁', '钦州', '梧州', '玉林'],
    '贵州': ['贵阳', '安顺', '毕节', '六盘水', '黔东南', '黔南', '黔西南', '铜仁', '遵义'],
    '海南': ['海口', '白沙', '保亭', '昌江', '澄迈', '儋州', '定安', '东方', '乐东', '临高', '陵水', '南沙群岛', '琼海', '琼中', '三亚', '屯昌', '万宁', '文昌', '五指山', '西沙群岛', '中沙群岛'],
    '河北': ['石家庄', '保定', '沧州', '承德', '邯郸', '衡水', '廊坊', '秦皇岛', '唐山', '邢台', '张家口'],
    '河南': ['郑州', '安阳', '鹤壁', '焦作', '济源', '开封', '洛阳', '漯河', '南阳', '平顶山', '濮阳', '三门峡', '商丘', '新乡', '信阳', '许昌', '周口', '驻马店'],
    '黑龙江': ['哈尔滨', '大庆', '大兴安岭', '鹤岗', '黑河', '鸡西', '佳木斯', '牡丹江', '七台河', '齐齐哈尔', '双鸭山', '绥化', '伊春'],
    '湖北': ['武汉', '鄂州', '恩施', '黄冈', '黄石', '荆门', '荆州', '潜江', '神农架', '十堰', '随州', '天门', '仙桃', '咸宁', '襄樊', '孝感', '宜昌'],
    '湖南': ['长沙', '常德', '郴州', '衡阳', '怀化', '娄底', '邵阳', '湘潭', '湘西', '益阳', '永州', '岳阳', '张家界', '株洲'],
    '吉林': ['长春', '白城', '白山', '吉林', '辽源', '四平', '松原', '通化', '延边'],
    '江苏': ['南京', '常州', '淮安', '连云港', '南通', '苏州', '宿迁', '泰州', '无锡', '徐州', '盐城', '扬州', '镇江'],
    '江西': ['南昌', '抚州', '赣州', '吉安', '景德镇', '九江', '萍乡', '上饶', '新余', '宜春', '鹰潭'],
    '辽宁': ['沈阳', '鞍山', '本溪', '朝阳市', '大连', '丹东', '抚顺', '阜新', '葫芦岛', '锦州', '辽阳', '盘锦', '铁岭', '营口'],
    '内蒙古': ['呼和浩特', '阿拉善', '巴彦淖尔', '包头', '赤峰', '鄂尔多斯', '呼伦贝尔', '通辽', '乌海', '乌兰察布', '锡林郭勒', '兴安'],
    '宁夏': ['银川', '固原', '石嘴山', '吴忠', '中卫'],
    '青海': ['西宁', '果洛', '海北', '海东', '海南', '海西', '黄南', '玉树'],
    '山东': ['济南', '滨州', '德州', '东营', '菏泽', '济宁', '莱芜', '聊城', '临沂', '青岛', '日照', '泰安', '威海', '潍坊', '烟台', '枣庄', '淄博'],
    '山西': ['太原', '长治', '大同', '晋城', '晋中', '临汾', '吕梁', '朔州', '忻州', '阳泉', '运城'],
    '陕西': ['西安', '安康', '宝鸡', '汉中', '商洛', '铜川', '渭南', '咸阳', '延安', '榆林'],
    '上海': ['宝山', '长宁', '崇明', '奉贤', '虹口', '黄浦', '嘉定', '金山', '静安', '闵行', '浦东', '普陀', '青浦', '松江', '徐汇', '杨浦'],
    '四川': ['成都', '阿坝', '巴中', '达州', '德阳', '甘孜', '广安', '广元', '乐山', '凉山', '泸州', '眉山', '绵阳', '内江', '南充', '攀枝花', '遂宁', '雅安', '宜宾', '资阳', '自贡'],
    '台湾': ['台北', '阿莲', '安定', '安平', '八德', '八里', '白河', '白沙市', '板桥', '褒忠', '宝山市', '卑南', '北斗', '北港', '北门', '北埔', '北投', '补子', '布袋', '草屯', '长宾', '长治市', '潮州市', '车城', '成功', '城中区', '池上', '春日', '刺桐', '高雄', '花莲', '基隆', '嘉义', '苗栗', '南投', '屏东', '台东', '台南', '台中', '桃园', '新竹', '宜兰', '彰化'],
    '天津': ['宝坻', '北辰', '大港', '东丽', '汉沽', '和平', '河北', '河东', '河西', '红桥', '蓟县', '津南', '静海', '南开', '宁河', '塘沽', '武清', '西青'],
    '西藏': ['拉萨', '阿里', '昌都', '林芝', '那曲', '日喀则', '山南'],
    '香港': ['北区', '大埔区', '东区', '观塘区', '黄大仙区', '九龙', '葵青区', '离岛区', '南区', '荃湾区', '沙田区', '深水?肚?', '屯门区', '湾仔区', '西贡区', '香港', '新界', '油尖旺区', '元朗区', '中西区'],
    '新疆': ['乌鲁木齐', '阿克苏', '阿拉尔', '阿勒泰', '巴音郭楞', '博尔塔拉', '昌吉', '哈密', '和田', '喀什', '克拉玛依', '克孜勒苏柯尔克孜', '石河子', '塔城', '图木舒克', '吐鲁番', '五家渠', '伊犁'],
    '云南': ['昆明', '保山', '楚雄', '大理', '德宏', '迪庆', '红河', '丽江', '临沧', '怒江', '曲靖', '思茅', '文山', '西双版纳', '玉溪', '昭通'],
    '浙江': ['杭州', '湖州', '嘉兴', '金华', '丽水', '宁波', '衢州', '绍兴', '台州', '温州', '舟山'],
    '重庆': ['巴南', '北碚', '璧山', '长寿', '城口', '大渡口', '大足', '垫江', '丰都', '奉节', '涪陵', '合川', '江北', '江津', '九龙坡', '开县', '梁平', '南岸', '南川', '彭水', '綦江', '黔江', '荣昌', '沙坪坝', '石柱', '双桥', '铜梁', '潼南', '万盛', '万州', '巫山', '巫溪', '武隆', '秀山', '永川', '酉阳', '渝北', '渝中', '云阳', '忠县'],
    '其他': ['阿根廷', '埃及', '爱尔兰', '奥地利', '奥克兰', '澳大利亚', '巴基斯坦', '巴西', '保加利亚', '比利时', '冰岛', '朝鲜', '丹麦', '德国', '俄罗斯', '法国', '菲律宾', '芬兰', '哥伦比亚', '韩国', '荷兰', '加拿大', '柬埔寨', '喀麦隆', '老挝', '卢森堡', '罗马尼亚', '马达加斯加', '马来西亚', '毛里求斯', '美国', '秘鲁', '缅甸', '墨西哥', '南非', '尼泊尔', '挪威', '葡萄牙', '其它地区', '日本', '瑞典', '瑞士', '斯里兰卡', '泰国', '土耳其', '委内瑞拉', '文莱', '乌克兰', '西班牙', '希腊', '新加坡', '新西兰', '匈牙利', '以色列', '意大利', '印度', '印度尼西亚', '英国', '越南', '智利']
};

class PesonalData extends Component {
    state = {
        userInfos: [],
        visible: false,
        currendIndex: 1, // 1_昵称 2_性别
        sexData: [
            { value: 1, label: '男' },
            { value: 2, label: '女' },
        ],
        nickName: '',
        sex: '',
        cities: [],
        province: '',
        secondCity: '',
        PrimaryVisible: false, // 一级联动
        SecondaryVisible: false, // 二级联动
    }

    componentDidMount() {
        this.getUserInfos();
        console.log(this.state.userInfos, '我是用户信息吖')
    }

    // 获取用户信息
    getUserInfos = () => {
        const ids = this.props.match.params.id;
        ApiGetUserInfos(ids).then(res => {
            console.log(res)
            if (res.status === 200) {
                this.setState({
                    userInfos: res.data.data
                })
            }
        })
    }

    // 修改属性状态
    changeState = (params) => {
        this.setState({
            visible: true,
            currendIndex: params,
            nickName: this.state.userInfos.nickName,
            sex: this.state.userInfos.sex
        })
    }

    // 修改头像
    updateHeaderImg = () => {
        // 头像上传
        var input = document.querySelector('.input');
        var self = this;
        input.click();
        input.onchange = function (e) {
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
                formData.append("customPath", PhotoHeaderImg);
                console.log(formData, 'FormData')
                axios.post(BASE_URL_STATIC + "commodity/StaticFile/imageUpload", formData).then(res => {
                    console.log(res, "res,then");
                    if (res.status === 200) {
                        Toast.loading('照片审核中...')
                        // 图片审核
                        APIPhotoReview('C:/tmpUploadPath/lingangImages/static/' + res.data.data.data.replace(/\\/, '/')).then(resolve => {
                            console.log(res, '我在审核图片')
                            if (resolve.status === 200) {
                                if (resolve.data.data.conclusionType == 1) {
                                    // 删除原有头像
                                    // if (self.state.userInfos.profilePhoto.replace(/\\/, '/') !== 'default/personalPhoto.png') {
                                    //     DelHeadImg({
                                    //         filePath: self.state.userInfos.profilePhoto,
                                    //         fileType: 1
                                    //     }).then(del => {
                                    //         if (del.status === 200) {
                                    //             self.updateUserInfos(self.state.userInfos.nickName, res.data.data.data, self.state.userInfos.sex, self.state.userInfos.address, `${resolve.data.data.conclusion}! 修改成功`);
                                    //         }
                                    //     })
                                    // } else {
                                        self.updateUserInfos(self.state.userInfos.nickName, res.data.data.data, self.state.userInfos.sex, self.state.userInfos.address, `${resolve.data.data.conclusion}! 修改成功`);
                                    // }
                                }
                                if (resolve.data.data.conclusionType == 2) {
                                    self.updateUserInfos(self.state.userInfos.nickName, null, self.state.userInfos.sex, self.state.userInfos.address);
                                    return Toast.info(resolve.data.data.data[0].msg + '!')
                                }
                            }
                        })
                    }
                })
            }
        }
    }

    // 修改用户信息
    updateUserInfos = (nickName, profilePhoto, sex, address, msg) => {
        ApiUpdateUserInfos({
            id: this.state.userInfos.id,
            nickName,
            profilePhoto,
            sex,
            address,
        }).then(res => {
            if (res.status === 200) {
                this.setState({
                    userInfos: res.data.data
                })
                this.getUserInfos();
                Toast.success(msg)
            }
            console.log(res, '我是更新api');
        })
    }

    // 提交信息
    submintStatus = () => {
        if (this.state.currendIndex == 1) {
            // 修改用户昵称
            this.updateUserInfos(this.state.nickName, this.state.userInfos.profilePhoto, this.state.userInfos.sex, this.state.userInfos.address, '昵称修改成功')
            this.setState({
                visible: false
            })
        } else {
            // 修改用户性别
            this.updateUserInfos(this.state.userInfos.nickName, this.state.userInfos.profilePhoto, this.state.sex, this.state.userInfos.address, '性别修改成功')
            // 关闭底部弹框
            this.setState({
                visible: false
            })
        }
    }

    // 打开省市级联动
    openAreaModel = () => {
        this.setState({
            PrimaryVisible: true
        })
    }

    // 一级联动
    PrimaryLinkage = (data) => {
        this.setState({
            province: data,
            cities: cityData[data],
            PrimaryVisible: false,
            SecondaryVisible: true
        })
    }

    // 二级联动
    SecondaryLinkage = (data) => {
        this.setState({
            secondCity: data,
        })
        console.log(this.state.province + data, 'HEIHEI')
        console.log(this.state.address, 'HEIHEI11111')
        this.updateUserInfos(this.state.userInfos.nickName, this.state.userInfos.profilePhoto, this.state.userInfos.sex, this.state.province + '' + data, '地址修改成功')
        this.setState({
            SecondaryVisible: false,
            PrimaryVisible: false,
        })
    }

    render() {
        return (
            <div className='personal-data'>
                <GeneralBackGround>
                    {/* 头部 */}
                    <Nav title={'个人资料'} ellipsisIsShow={false} />
                    <div className='personal-data-content'>
                        {/* 头像 */}
                        <div className='head-portrait' onClick={() => this.updateHeaderImg()} >
                            <div className='left'>头像</div>
                            <div className='right'>
                                <img className='desc' src={this.state.userInfos.profilePhoto ? BASE_URL_STATIC + this.state.userInfos.profilePhoto.replace(/\\/, '/') : headerImg} />
                                <input type="file" hidden className='input' />
                                <img className='icon' src={right} />
                            </div>
                        </div>

                        {/* 手机号 */}
                        <div className='item phone'>
                            <div className='left'>手机号</div>
                            <div className='right'>
                                <div className='desc'>{this.state.userInfos.phone}</div>
                                {/* <img className='icon' src={right} /> */}
                            </div>
                        </div>

                        {/* 昵称 */}
                        <div className='item nickname' onClick={() => this.changeState(1)} >
                            <div className='left'>昵称</div>
                            <div className='right'>
                                <div className='desc'>{this.state.userInfos.nickName}</div>
                                <img className='icon' src={right} />
                            </div>
                        </div>

                        {/* 性别 */}
                        <div className='item sex' onClick={() => this.changeState(2)} >
                            <div className='left'>性别</div>
                            <div className='right'>
                                <div className='desc'>{this.state.userInfos.sex === null || this.state.userInfos.sex === undefined || this.state.userInfos.sex === "" ? '男' : (this.state.userInfos.sex == 1 ? '男' : '女')}</div>
                                <img className='icon' src={right} />
                            </div>
                        </div>

                        {/* 地区 */}
                        <div className='item area' onClick={() => this.openAreaModel()} >
                            <div className='left'>地区</div>
                            <div className='right'>
                                <div className='desc'>{this.state.userInfos.address}</div>
                                <img className='icon' src={right} />
                            </div>
                        </div>

                        {/* 地址 */}
                        {/* <div className='item address'>
                        <div className='left'>我的地址</div>
                        <div className='right'>
                            <img className='icon' src={right} />
                        </div>
                    </div> */}
                        {/* 发票 */}
                        {/* <div className='item invoice'>
                        <div className='left'>我的发票</div>
                        <div className='right'>
                            <img className='icon' src={right} />
                        </div>
                    </div> */}

                        {/* 性别 or 昵称 */}
                        <Modal
                            popup
                            visible={this.state.visible}
                            onClose={() => this.setState({ visible: false })}
                            animationType="slide-up"
                            className='personal-model-data'
                            wrapClassName="wrapper-modal"
                        >
                            <div className='model-content'>
                                <div className='nickname'>{this.state.currendIndex == 1 ? '昵称' : '性别'}</div>

                                {this.state.currendIndex == 1
                                    ? <>
                                        <input type="text" value={this.state.nickName} onChange={(e) => this.setState({ nickName: e.target.value })} />
                                    </>
                                    : <>
                                        <div className='radio'>
                                            {this.state.sexData.map((item, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <div className='item'>
                                                            <input type="radio"
                                                                className='sex'
                                                                value={item.value}
                                                                checked={this.state.sex == item.value ? true : false}
                                                                onChange={() => { this.setState({ sex: item.value }) }}
                                                            /> {item.label}
                                                        </div>
                                                    </Fragment>
                                                )
                                            })}

                                            {/* <div className='item'>
                                            <input type="radio" className='sex' name="sex" value={this.state.sex == 0 && this.state.sex ? '2' : this.state.sex} checked={this.state.sex == 2 ? true : false} /> 女
                                        </div> */}
                                        </div>
                                    </>
                                }

                                <button onClick={() => this.submintStatus()}>确定</button>
                            </div>
                        </Modal>

                        {/* 省市级联动 */}
                        <Fragment>
                            {/* 一级联动 */}
                            <Modal
                                popup
                                visible={this.state.PrimaryVisible}
                                onClose={() => this.setState({ PrimaryVisible: false })}
                                animationType="slide-up"
                                className='area-model-data'
                                wrapClassName="wrapper-modal"
                            >
                                <div className="area-model-content">
                                    <ul className="province-list">
                                        {provinceData.map((province, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <li className={this.state.province === province ? 'active' : 'province-item'} onClick={() => this.PrimaryLinkage(province)}>
                                                        <div className="desc">{province}</div>
                                                        {/* <img src={this.state.province === province ? Activeright : right} /> */}
                                                    </li>
                                                </Fragment>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </Modal>

                            {/* 二级联动 */}
                            <Modal
                                popup
                                visible={this.state.SecondaryVisible}
                                onClose={() => this.setState({ SecondaryVisible: false })}
                                animationType="slide-up"
                                className='area-model-data'
                                wrapClassName="wrapper-modal"
                            >
                                <div className="area-model-content">
                                    <ul className="province-list">
                                        {this.state.cities && this.state.cities.map((secondCity, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <li className={this.state.secondCity === secondCity ? 'active' : 'province-item'} onClick={() => this.SecondaryLinkage(secondCity)}>
                                                        <div className="desc">{secondCity}</div>
                                                        {/* <img src={this.state.province === province ? Activeright : right} /> */}
                                                    </li>
                                                </Fragment>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </Modal>
                        </Fragment>
                    </div>
                </GeneralBackGround>
            </div>
        )
    }
}

export default PesonalData;