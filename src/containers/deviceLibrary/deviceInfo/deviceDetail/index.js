import React from 'react';
import moment from "moment";
import { connect } from 'react-redux';
import { List} from 'antd-mobile';
import _, { isEmpty } from 'lodash';
// import { alarmPendingListMock } from '../../../redux/alarm/';
import form from '@/components/form';
import noalarm from '@/assets/img/noAlarm.svg';
import iconDeviceInfo from '@/assets/img/iconDeviceInfo.png';
import iconWorkCycle from '@/assets/img/iconWorkCycle.png';
import iconOtherInfo from '@/assets/img/iconOtherInfo.png';
// import chaosu from '@/assets/img/chaosu.png';
// import ruqu from '@/assets/img/ruqu.png';
// import kaojin from '@/assets/img/kaojin.png';
import './index.css';
const Item = List.Item;
const alarmType=['偷盗','入区','靠近','超速'];
                  //   红         紫        黄        绿
// const alarmColor = ['#fb6464','#a004c5','#ffaa43','#04c5b2'];

@connect(
  state=>({ task:state.task }),
  {  }
)
@form
class DeviceDetail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount(){
    
  }

  // 查看详情页面跳转功能
  handleGoDetailPage=(props,v)=>{
    const { updateGoDetailPage } = this.props;
    const url  = `${v}`
    // console.log(v)
    updateGoDetailPage(props,url);
  }
  
  render(){
    const { props, deviceInfo } = this.props;

    console.log('deviceInfo')
    console.log(deviceInfo)
    
    return (
      <div className='deviceDetail-body'>
        <div className='deviceDetail-content'>
            <div className='tabs-item'>
              <div>
                {_.isEmpty(deviceInfo)?
                <div className='message-tip'>
                  <div>
                    <div className='nomessage-round'>
                      <img src={noalarm} alt='nowork' />
                    </div>
                  </div>
                  <div className='nomessage-text'>暂无设备信息</div>
                </div>:
                  <span>
                    <div className='deviceInfoBox'>
                      <div className='deviceInfoTitle'>
                        <img src={iconDeviceInfo} alt='icon' width={16} height={16} style={{verticalAlign:'bottom', marginRight:10}} />设备详情
                      </div>
                      <div className="item">
                        <div className='itemTitle'>
                          设备名称 :
                        </div>
                        <div className='itemValue'>
                          {deviceInfo.name}
                        </div>
                      </div>
                      <div className="item">
                        <div className='itemTitle'>
                          设备地址 :
                        </div>
                        <div className='itemValue'>
                          {!_.isEmpty(deviceInfo.devicePosition)?deviceInfo.devicePosition.join('/'):'-'}
                        </div>
                      </div>
                      <div className="item">
                        <div className='itemTitle'>
                          设备型号 :
                        </div>
                        <div className='itemValue'>
                          {deviceInfo.model}
                        </div>
                      </div>
                      <div className="item">
                        <div className='itemTitle'>
                          设备厂商 :
                        </div>
                        <div className='itemValue'>
                          {deviceInfo.manufacturer}
                        </div>
                      </div>
                      <div className="item">
                        <div className='itemTitle'>
                          安装时间 :
                        </div>
                        <div className='itemValue'>
                          {deviceInfo.acceptDate.slice( 0,10 )}
                        </div>
                      </div>
                      <div className="item">
                        <div className='itemTitle'>
                          上次维保时间 :
                        </div>
                        <div className='itemValue'>
                          {deviceInfo.warrantyDate.slice( 0,10 )}
                        </div>
                      </div>
                    </div>

                    <div className='deviceInfoBox'>
                      <div className='deviceInfoTitle'>
                        <img src={iconWorkCycle} alt='icon' width={16} height={16} style={{verticalAlign:'bottom', marginRight:10}} />作业周期
                      </div>
                      <div className="item">
                        <div className='itemTitle'>
                          巡检周期 :
                        </div>
                        <div className='itemValue'>
                          {deviceInfo.routingInspectionPeriod}
                        </div>
                      </div>
                      <div className="item">
                        <div className='itemTitle'>
                          小保养周期 :
                        </div>
                        <div className='itemValue'>
                          {deviceInfo.maintenanceType1Period}
                        </div>
                      </div>
                      <div className="item">
                        <div className='itemTitle'>
                          中保养周期 :
                        </div>
                        <div className='itemValue'>
                          {deviceInfo.maintenanceType2Period}
                        </div>
                      </div>
                      <div className="item">
                        <div className='itemTitle'>
                          大保养周期 :
                        </div>
                        <div className='itemValue'>
                          {deviceInfo.maintenanceType3Period}
                        </div>
                      </div>
                    </div>

                    <div className='deviceInfoBox'>
                      <div className='deviceInfoTitle'>
                        <img src={iconOtherInfo} alt='icon' width={16} height={16} style={{verticalAlign:'bottom', marginRight:10}} />其他信息
                      </div>
                      <div className="item">
                        <div className='itemTitle'>
                          资产所有人 :
                        </div>
                        <div className='itemValue'>
                          {deviceInfo.owner}
                        </div>
                      </div>
                      <div className="item">
                        <div className='itemTitle'>
                          供货商 :
                        </div>
                        <div className='itemValue'>
                          {deviceInfo.supplier}
                        </div>
                      </div>
                      <div className="item">
                        <div className='itemTitle'>
                          施工单位 :
                        </div>
                        <div className='itemValue'>
                          {deviceInfo.constructionUnit}
                        </div>
                      </div>
                      <div className="item">
                        <div className='itemTitle'>
                          验收日期 :
                        </div>
                        <div className='itemValue'>
                          {deviceInfo.acceptDate.slice( 0,10 )}
                        </div>
                      </div>
                      <div className="item">
                        <div className='itemTitle'>
                          维保单位 :
                        </div>
                        <div className='itemValue'>
                          {deviceInfo.maintenanceUnit}
                        </div>
                      </div>
                      <div className="item">
                        <div className='itemTitle'>
                          运营单位 :
                        </div>
                        <div className='itemValue'>
                          {deviceInfo.manufacturer}
                        </div>
                      </div>
                      <div className="item">
                        <div className='itemTitle'>
                          供货商联系人 :
                        </div>
                        <div className='itemValue'>
                          {deviceInfo.supplierRelPerson}
                        </div>
                      </div>
                      <div className="item">
                        <div className='itemTitle'>
                          供货商联系电话 :
                        </div>
                        <div className='itemValue'>
                          {deviceInfo.supplierPhone}
                        </div>
                      </div>
                    </div>
                    
                  </span> 
                }
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default DeviceDetail;