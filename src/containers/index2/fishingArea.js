import L from 'leaflet';
import _ from 'lodash';
import 'leaflet-rotatedmarker';
import AIS_A from '@/assets/img/AIS_A.svg';
import AIS_B from '@/assets/img/AIS_B.svg';
import ARPA_A from '@/assets/img/ARPA_A.svg';
import ARPA_B from '@/assets/img/ARPA_B.svg';
import ALARM_AIS_A from '@/assets/img/ALARM_AIS_A.svg';
import ALARM_AIS_B from '@/assets/img/ALARM_AIS_B.svg';
import ALARM_ARPA_A from '@/assets/img/ALARM_ARPA_A.svg';
import ALARM_ARPA_B from '@/assets/img/ALARM_ARPA_B.svg';
import select from '@/assets/img/select.png';
// import ALARM_A from '@/assets/img/ALARM_A.png';
// import ALARM_B from '@/assets/img/ALARM_B.png';

/**
 * 地图渔区显示
 * @param {*} v 
 */



 
// 显示选中的渔区
export function showSelectedFishingAreaPolygon(v){
  if(!_.isEmpty(v.coordinateGroup)){
    let points = [];
    let lats = [];
    let lngs = [];
    // 拼接坐标信息
    let allLatlng = v.coordinateGroup.split(",")
    for (let i = 0; i < allLatlng.length; i+=1) {
      const element = allLatlng[i];
      const du = element.split('°')
      const fen = du[1].split("'")[0]
      const miao = du[1].split("'")[1].split('"')[0]
      const zuobiao = (parseFloat(du)+parseFloat(fen)/60+parseFloat(miao)/3600).toFixed(6);
      if(i%2===0){
          lats.push(zuobiao)
      }else{
          lngs.push(zuobiao)
      }
    };
    if( lats.length>2 && lats.length===lngs.length){
      for (let i = 0; i < lats.length; i++) {
        points.push( {lat:lats[i],lon:lngs[i]} )
      }
    };
    if(points.length>2){
      let latlng = [];
      // eslint-disable-next-line array-callback-return
      points.map(e=>{
        if(e.lat!==undefined&&e.lon!==undefined){
            let list = [];
            list.push(e.lon);
            list.push(e.lat);
            latlng.push(list);
        }else{
            return null;
        }
      });
      let dashArray = [4, 4];
      const features = [{"type":"Feature","properties":{},"geometry":{"type":"Polygon",
        "coordinates": [latlng]}}]
      const drawTheCollection = L.geoJson(features, {

        color: `#f33`,
        fillColor: `#2FB7DE`,
        weight: 1,
        dashArray,
        opacity: 1,
        fillOpacity: 0,
        },
      });
      return drawTheCollection;
    }else{
      return null
    }
  }else{
    return null;
  }
}
// 显示渔区
export function showfishingAreaPolygon(v){
    if(!_.isEmpty(v.coordinateGroup)){
      let points = [];
      let lats = [];
      let lngs = [];
      // 拼接坐标信息
      let allLatlng = v.coordinateGroup.split(",")
      for (let i = 0; i < allLatlng.length; i+=1) {
        const element = allLatlng[i];
        const du = element.split('°')
        const fen = du[1].split("'")[0]
        const miao = du[1].split("'")[1].split('"')[0]
        const zuobiao = (parseFloat(du)+parseFloat(fen)/60+parseFloat(miao)/3600).toFixed(6);
        if(i%2===0){
            lats.push(zuobiao)
        }else{
            lngs.push(zuobiao)
        }
      };
      if( lats.length>2 && lats.length===lngs.length){
        for (let i = 0; i < lats.length; i++) {
          points.push( {lat:lats[i],lon:lngs[i]} )
        }
      };
      if(points.length>2){
        let latlng = [];
        // eslint-disable-next-line array-callback-return
        points.map(e=>{
          if(e.lat!==undefined&&e.lon!==undefined){
              let list = [];
              list.push(e.lon);
              list.push(e.lat);
              latlng.push(list);
          }else{
              return null;
          }
        });
        let dashArray = [4, 4];
        const features = [{"type":"Feature","properties":{},"geometry":{"type":"Polygon",
          "coordinates": [latlng]}}]
        const drawTheCollection = L.geoJson(features, {
          style: {
          color: `#2FB7DE`,
          fillColor: `#0e68ff`,
          weight: 1,
          dashArray,
          opacity: 0.5,
          fillOpacity: 0.3,
          },
        });
        return drawTheCollection;
      }else{
        return null
      }
    }else{
      return null;
    }
}

export function showAis(latLng,cog,sog,type){
  let iconMarker;
  iconMarker = L.icon({
    iconUrl: `${type==='aisShip'?sog===0?AIS_A:AIS_B:sog===0?ALARM_AIS_A:ALARM_AIS_B}`,
    iconSize: [27, 27],
    iconAnchor: [14, 14],
    popupAnchor: [0, 0],
  });
  return new L.Marker(latLng, {icon: iconMarker, rotationAngle:cog, zIndexOffset: 600, className:'test', position:latLng });
}

export function showArpa(latLng,cog,sog,type){
  let iconMarker;
  iconMarker = L.icon({
    iconUrl: `${type==='arpaShip'?sog===0?ARPA_A:ARPA_B:sog===0?ALARM_ARPA_A:ALARM_ARPA_B}`,
    iconSize: [27, 21],
    iconAnchor: [14, 11],
    popupAnchor: [0, 0],
  });
  return new L.Marker(latLng, {icon: iconMarker, rotationAngle:cog, zIndexOffset: 500 });
}

export function showRedSelect(latLng){
  let iconMarker;
  iconMarker = L.icon({
    iconUrl: select,
    iconSize: [27, 27],
    iconAnchor: [14, 14],
    popupAnchor: [0, 0],
  });
  return new L.Marker(latLng, {icon: iconMarker, rotationAngle:0, zIndexOffset: 300 });
}