import React, { Component } from 'react';
import { Modal, List, Radio,Button, WhiteSpace, WingBlank, Icon,Card, } from 'antd-mobile';
// import b230 from '@/assets/img/b230.png';
// import ffa from '@/assets/img/ffa.png';
import './diy.css';
import indexTopBG from '@/assets/img/BG_login.png';
import diybj from '@/assets/img/diybj.png';


function DiyList2({ data }) {
  
  return (
    <div>
    {data.map((val, i) => (
     
              <Card key={`${i}_${val}`}>
                <Card.Body>
                  <div>{val.fa}</div>
                  <div className='time'>于{val.time}创建</div>
                  <div className='content'>
                        <div>
                          <div className='dd'>墓型</div>
                          <div className='xx'>{val.mx}</div>
                        </div>
                        <div>
                          <div className='dd'>刻字</div>
                          <div  className='xx'>{val.kz}</div>
                        </div>
                        <div>
                          <div className='dd'>样式</div>
                          <div  className='xx'>{val.ys}</div>
                        </div>
                  </div>
                  <div>
                    <span className='wz2'>XXXXXXXXXXXXXX编辑已完成</span>
                    <Button className='qdan2'>去编辑</Button>
                  </div>
                </Card.Body>
           
              </Card>
    ))}
    </div>
  );
}

class mydiy extends Component {
    constructor(props) {
        super(props);
        this.state = {
          bs:"1",
          data:[{fa:"DIY方案一",time:"2022-6-12 15:00",mx:"艺术定制墓",kz:"XXX清明节安康",ys:"加老虎石雕和绿化"},{fa:"DIY方案二",time:"2022-6-12 15:00",mx:"艺术定制墓",kz:"XXX清明节安康",ys:"加老虎石雕和绿化"},{fa:"DIY方案三",time:"2022-6-12 15:00",mx:"艺术定制墓",kz:"XXX清明节安康",ys:"加老虎石雕和绿化"}],
        };
      }
      dj1 = (a) => {
        this.setState({
          bs: a,
        });
      }

      handlePush (v) {
        if(v==="/login"){
          window.history.back(-1)
        }
        else{
          this.props.history.push(`${v}`)
        }
     
      }
    
      render() {
        const {bs,data} = this.state;
        return (
         <div >
            <img className='mydiydbj' src={diybj}></img>
            <div className='makemudibackground' >
          {/* <img src={indexTopBG} alt='bg' width='100%' height="100px" /> */}
          <div style={{color:'#fff', position:'absolute', top:'80px', width:'100%', fontSize:'29px', textAlign:'center', fontWeight:600, letterSpacing:'1px'}}>
          </div>
          <div 
            style={{color:'#fff', position:'absolute', top:'36px', left:'12px',float:"left",verticalAlign:"middle"}}
          >
            <Icon type='left' style={{color:'#fff'}} size='lg'  onClick={()=>this.handlePush('/login')} />
           <span style={{fontSize:"20px",marginLeft:"90px",marginTop:"0px",paddingTop:"-20px",color:"black"}}>我的DIY方案</span>
          </div>
        </div>
           <div style={{height:"55px",width:"90%",marginLeft:"5%",display:"flex",justifyContent:"space-around",marginTop:"80px",position:"relative"}} >
                    <span style={{color:"black",fontSize: "16px",fontFamily: "Source Han Serif CN",fontWeight: "400",lineHeight:"75px",marginLeft:"10px"}} onClick={this.dj1.bind(this,"1")} className={bs=="1"?"qb2":""}>全部</span>
                    <span style={{color:"black ",fontSize: "16px",fontFamily: "Source Han Serif CN",fontWeight: "400",lineHeight:"75px",marginLeft:"0px"}} onClick={this.dj1.bind(this,"2")} className={bs=="2"?"qb2":""}>编辑中</span>
                    <span style={{color:"black ",fontSize: "16px",fontFamily: "Source Han Serif CN",fontWeight: "400",lineHeight:"75px",marginRight:"10px"}} onClick={this.dj1.bind(this,"3")} className={bs=="3"?"qb2":""}>已完成</span>
           </div>
           <WingBlank size="lg">
              <WhiteSpace size="lg" />
              {/* <Card>
              
                <Card.Body>
                  <div>DIY方案一</div>
                  <div className='time'>于2022-6-12 15:00创建</div>
                  <div className='content'>
                        <div>
                          <div className='dd'>墓型</div>
                          <div className='xx'>艺术定制墓</div>
                        </div>
                        <div>
                          <div className='dd'>刻字</div>
                          <div  className='xx'>XXX清明节安康</div>
                        </div>
                        <div>
                          <div className='dd'>样式</div>
                          <div  className='xx'>加老虎石雕和绿化</div>
                        </div>
                  </div>
                  <div>
                    <span className='wz2'>XXXXXXXXXXXXXX编辑已完成</span>
                    <Button className='qdan2'>去编辑</Button>
                  </div>
                </Card.Body>
           
              </Card> */}

              <DiyList2 data={data}></DiyList2>
              <WhiteSpace size="lg" />
            </WingBlank>

         </div>
        );
      }
}


export default mydiy;
