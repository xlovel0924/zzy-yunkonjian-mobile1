import React from 'react';
import Icon from '@/assets/img/no-found/foundicon.png';
import './noFound.css';
import Nav from "@/components/nav/nav";

export default function Index() {
  return (
    <div className='no-found'>
      <div className="found-part">
        <Nav ellipsisIsShow={false}/>
        <div className="found-content">
          <img src={Icon} alt="" />
          <span>该功能正在开发中，敬请期待</span>
        </div>
      </div>

    </div>
  )
}
