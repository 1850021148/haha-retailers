import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Result, Button, InputNumber } from 'antd';
import axios from 'axios'
import style from './Commodity.scss'
import banner3 from '@assets/image/commodity-page-banner3.jpg'
import banner4 from '@assets/image/commodity-page-banner4.jpg'

export default class Commodity extends Component {
  state = {
    buySuccess: false,
    comId: -1,
    //#region 测试代码
    // data: {
    //   comName: '大明牌狗肉',
    //   comImg: 'https://img.zcool.cn/community/01b1d958fbd4faa8012160f7b72ca9.jpg@1280w_1l_0o_100sh.jpg',
    //   comQuantity: 10,
    //   comStatus: 0,
    //   comPrice: 20
    // },
    //#endregion
    //#region 正式代码
    data: null,
    //#endregion
    user: {}
  }
  static getDerivedStateFromProps(props, state) {
    return {
      comId: props.match.params.id
    }
  }
  componentDidMount = async function() {
    const {data, status} = await axios.get(`/api/commodity/searchById?comId=${this.state.comId}`) 
    this.setState({
      data: data.data
    })
    const {userId} = data.data
    const {data: data2, status2} = await axios.get(`/api/user/searchById?userId=${userId}`)
    this.setState({
      user: data2.data
    })
  }
  handleBuy = () => {
    this.setState({buySuccess: true})
  }
  handleBuyAgain = () => {
    this.setState({buySuccess: false})
  }
  render() {
    if(this.state.buySuccess) {
      return (
        <Result
          status="success"
          title="购买商品成功"
          extra={[
            <Button type="primary" key="console">
              <Link to="/search">点击前往搜索</Link>
            </Button>,
            <Button key="buy" onClick={this.handleBuyAgain}>再次购买</Button>,
          ]}
        />
      )
    }
    // loading
    else if(!this.state.data) {
      return (
        <div className="commodity-page" style={style}>
          <div className="top-banner">
            <img src={banner3} alt="" />
            <img src={banner4} alt="" />
          </div>
          <h1 className="loading">loading...</h1>
        </div>
      )
    }
    // ok
    const {comName, comImg, comQuantity, comStatus, comPrice} = this.state.data
    const isUnSale = comStatus === 1 // 该商品是否已下架
    const {username} = this.state.user
    return (
      <div className="commodity-page" style={style}>
        <div className="top-banner">
          <img src={banner3} alt="" />
          <img src={banner4} alt="" />
        </div>

        <div className="detail">
          <div className="cover">
            <img src={comImg} alt="" />
          </div>
          <div className="right-detail">
            <div className="com">
              <p className="com-name">{comName} <span>{isUnSale ? '(该商品已下架)' : ''}</span></p>
              <p className="com-quantity">库存：{comQuantity} 件</p>
              <p className="com-price">价格：{comPrice} 元</p>
            </div>
            <div className="user">
              <p className="username">卖家：{username || '......'}</p>
            </div>
            <div className="select-num">
              数量：<InputNumber min={1} max={comQuantity} disabled={isUnSale} defaultValue={1} />
            </div>
            <Button onClick={this.handleBuy}>购买</Button>
          </div>
        </div>

      </div>
    )
  }
}
