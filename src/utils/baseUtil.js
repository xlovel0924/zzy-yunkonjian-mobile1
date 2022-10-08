const reg = /^1\d{10}$/;

export function getRedirectPath(a){
    // console.log("a",a)
  // 根据用户信息， 返回跳转地址
  let url = '/index'
  if(a){
    url = a
  }
  return url;
}

export function getChatId(toUserId, userId){
  return [toUserId, userId].sort().join('-')
}

/** 验证手机号 */
export function verifyMobilephone(mobilephone){
  return reg.test(mobilephone);
}

export const RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
 export let ip;
if (RTCPeerConnection) (function () {
        var rtc = new RTCPeerConnection({iceServers:[]});
        if (1 || window.mozRTCPeerConnection) {     
            rtc.createDataChannel('', {reliable:false});
        };
        
        rtc.onicecandidate = function (evt) {
            if (evt.candidate) grepSDP("a="+evt.candidate.candidate);
        };
        rtc.createOffer(function (offerDesc) {
            grepSDP(offerDesc.sdp);
            rtc.setLocalDescription(offerDesc);
        }, function (e) { console.warn("offer failed", e); });
        
        
        var addrs = Object.create(null);
        addrs["0.0.0.0"] = false;
        function updateDisplay(newAddr) {
            if (newAddr in addrs) return;
            else addrs[newAddr] = true;
            var displayAddrs = Object.keys(addrs).filter(function (k) { return addrs[k]; });
            for(var i = 0; i < displayAddrs.length; i++){
                if(displayAddrs[i].length > 16){
                    displayAddrs.splice(i, 1);
                    i--;
                }
            }
            // console.log(displayAddrs[0]);
            ip =displayAddrs[0]
        }
        
        function grepSDP(sdp) {
            //const hosts = [];
            sdp.split('\r\n').forEach(function (line, index, arr) { 
               if (~line.indexOf("a=candidate")) {    
                    var parts = line.split(' '),       
                        addr = parts[4],
                        type = parts[7];
                    if (type === 'host') updateDisplay(addr);
                } else if (~line.indexOf("c=")) {       
                  const parts = line.split(' '),
                        addr = parts[2];
                    updateDisplay(addr);
                }
            });
        }
    })();
    else{
        // console.log("请使用主流浏览器：chrome,firefox,opera,safari");
    }


export function getNowFormatDate(minute) {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    //前十分钟时间
     let minutes=parseInt(minute);

  let   interTimes=minutes*60*1000;

   interTimes=parseInt(interTimes);  
     date=new   Date(Date.parse(date)-interTimes);
    
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hour = date.getHours();
     minutes = date.getMinutes();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + hour + seperator2 + minutes
            + seperator2 + date.getSeconds();
    return currentdate;
}


export function returnSquarePoint(lng, lat){
    let latitude = lat;// 传值给经度
    let longitude = lng;// 传值给纬度
    let degree = (24901 * 1609) / 360.0; // 获取每度
    let radiusMile = 2778;
    let mpdLng = (degree * Math.cos(latitude * (Math.PI / 180))+"").replace("-", "");
    let dpmLng = 1 / mpdLng;
    let radiusLng = dpmLng * radiusMile;
        //获取最小经度
    let minLat = longitude - radiusLng;
        // 获取最大经度
    let maxLat = longitude + radiusLng;

    let dpmLat = 1 / degree;
    let radiusLat = dpmLat * radiusMile;
        // 获取最小纬度
    let minLng = latitude - radiusLat;
        // 获取最大纬度
    let maxLng = latitude + radiusLat;
    let array = [];
    let listLefTop = [];
    listLefTop.push(maxLng);listLefTop.push(minLat);
    array.push(listLefTop);
    
    let listRightTop = [];
    listRightTop.push(maxLng);listRightTop.push(maxLat);
    array.push(listRightTop);

    let listLeftBottom = [];
    listLeftBottom.push(minLng);listLeftBottom.push(minLat);
    array.push(listLeftBottom);

    let listRightBottom = [];
    listRightBottom.push(minLng);listRightBottom.push(maxLat);
    array.push(listRightBottom);
    return array;
}

/**
 * 判断点在不在区域内
 * @param {*} polygon 
 * @param {*} lng 
 * @param {*} lat 
 */
export function isPointInPolygon(polygon, lng, lat) {

    var numberOfPoints = polygon.length;
    var polygonLats = [];
    var polygonLngs = [];
    for (var i = 0; i < numberOfPoints; i++) {
        polygonLats.push(polygon[i]['lat']);
        polygonLngs.push(polygon[i]['lng']);
    }

    var polygonContainsPoint = false;
    for (var node = 0, altNode = (numberOfPoints - 1); node < numberOfPoints; altNode = node++) {
        // eslint-disable-next-line no-mixed-operators
        if ((polygonLngs[node] > lng !== (polygonLngs[altNode] > lng))
            && (lat < (polygonLats[altNode] - polygonLats[node])
                * (lng - polygonLngs[node])
                / (polygonLngs[altNode] - polygonLngs[node])
                + polygonLats[node]
            )
        ) {
            polygonContainsPoint = !polygonContainsPoint;
        }
    }
    // console.log(polygonContainsPoint);
    return polygonContainsPoint;
}

/*
* 阿拉伯数字转大写
* */
export const numberToChinese = (num) => {
    var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
    var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
    var a = ("" + num).replace(/(^0*)/g, "").split("."),
        k = 0,
        re = "";
    for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
                    .test(a[0]))
                    re = BB[4] + re;
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
            re = AA[0] + re;
        if (a[0].charAt(i) != 0)
            re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    }

    if (a.length > 1) // 加上小数部分(如果有小数部分)
    {
        re += BB[6];
        for (var i = 0; i < a[1].length; i++)
            re += AA[a[1].charAt(i)];
    }
    if (re == '一十')
        re = "十";
    if (re.match(/^一/) && re.length == 3)
        re = re.replace("一", "");
    return re;
}

