
// 根据用户信息， 返回跳转地址
export function getRedirectPath(){
  let url = '/index'
  return url;
}

// 需要显示底部首页,工具箱等按钮的页面
export const showTabbar = ['/index', '/user-self'];

export const tabbarList = [
  {
    img: 'icon-home',
    text: '首页',
    link: '/index',
  },
  {
    img: 'icon-ditu',
    text: '地图',
    link: '/SeaCode',
  },
  {
    img: 'icon-gongzuoxiang',
    text: '工具箱',
    link: null,
  },
  {
    img: 'icon-ziliaoku',
    text: '资料库',
    link: '/material',
  },
  {
    img: 'icon-my',
    text: '我的',
    link: '/my',
  }
];

// 类型数据
export const goods= [
  {name: '三相电表',type: -1,devices: [{id:'10000',name: '空调',type:'1',price: 10,oldPrice: 15,description: '','mode':'制冷'},
  {id:'10001',name: '大灯',type:'2',price: 10,oldPrice: '',description: ''},
  {id:'10001',name: '冰箱',type:'2',price: 10,oldPrice: '',description: ''},
  {id:'10001',name: '洗衣机',type:'2',price: 10,oldPrice: '',description: ''},
  {id:'10001',name: '电视',type:'2',price: 10,oldPrice: '',description: ''}]},
  {name: '水表',type: -1,devices: [{id:'10002',name: '葱花饼',type:'3',price: 10,oldPrice: '',description: ''},
  {id:'10001',name: '洗衣机',type:'2',price: 10,oldPrice: '',description: ''},
  {id:'10001',name: '电视',type:'2',price: 10,oldPrice: '',description: ''}]},
  {name: '单项水表',type: -1,devices: [{id:'10003',name: '空调',type:'4',price: 10,oldPrice: 30,description: ''},
  {id:'10001',name: '洗衣机',type:'2',price: 10,oldPrice: '',description: ''},
  {id:'10001',name: '电视',type:'2',price: 10,oldPrice: '',description: ''}]},
  {name: '区级平台',type: -1,devices: [{id:'10004',name: '空调',type:'5',price: 10,oldPrice: '',description: ''},
  {id:'10001',name: '洗衣机',type:'2',price: 10,oldPrice: '',description: ''},
  {id:'10001',name: '电视',type:'2',price: 10,oldPrice: '',description: ''}]},
  {name: '冠捷大楼一层101计费',type: -1,devices: [{id:'10005',name: '空调',type:'6',price: 10,oldPrice: '',description: ''},
  {id:'10001',name: '洗衣机',type:'2',price: 10,oldPrice: '',description: ''},
  {id:'10001',name: '电视',type:'2',price: 10,oldPrice: '',description: ''}]},
  {name: '测试',type: -1,devices: [{id:'10006',name: '空调',type:'7',price: 10,oldPrice: '',description: ''},
  {id:'10001',name: '洗衣机',type:'2',price: 10,oldPrice: '',description: ''},
  {id:'10001',name: '电视',type:'2',price: 10,oldPrice: '',description: ''}]},
  {name: '测试',type: -1,devices: [{id:'10007',name: '空调',type:'8',price: 10,oldPrice: '',description: ''},
  {id:'10001',name: '洗衣机',type:'2',price: 10,oldPrice: '',description: ''},
  {id:'10001',name: '电视',type:'2',price: 10,oldPrice: '',description: ''}]}
  ];