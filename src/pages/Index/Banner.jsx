import React from 'react'
import { Carousel } from 'antd';

const contentStyle = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  // width: '1130px',
  // height: '286px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
};

export default function Banner() {
  return (
    <div className="banner-box">
      <Carousel autoplay effect="fade">
        <div>
          <h3 style={contentStyle}>
            <img src="https://img.zcool.cn/community/016c4060cc051711013eaf703a6e18.jpg@1380w" alt="" />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img src="https://img.zcool.cn/community/01290860cfecbf11013f4720eb1baf.jpg@1380w" alt="" />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img src="https://img.zcool.cn/community/01ea4860cfea9d11013f47201917c2.jpg@1380w" alt="" />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img src="https://img.zcool.cn/community/01605860cfecd111013eaf707992b5.png@1380w" alt="" />
          </h3>
        </div>
      </Carousel>
    </div>
  )
}