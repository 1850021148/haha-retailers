import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import style from './CommodityItem.scss'

class CommodityItem extends Component {
  state = {
    user: {}
  }
  componentDidMount = async function() {
    //#region 下面是测试代码
    // this.setState({
    //   user: {
    //     userId: 0,
    //     username: 'juln'
    //   }
    // })
    //#endregion
    //#region 正式代码
    try {
      const {userId} = this.props.data
      const {data, status} = await axios.get(`/api/user/searchById?userId=${userId}`)
      this.setState({
        user: data.data
      })
    } catch (error) {
      
    }
    //#endregion
  }
  render() {
    const {
      comId, 
      comName, 
      comPrice,
      comImg,
      userId,
      comType, 
      comQuantity, 
      comStatus,
      comAddedDate
    } = this.props.data
    console.log(this.props.data)
    return (
      <Link to={`/commodity/${comId}`} target="_blank">
        <div className="commodity-item" style={style}>
          <div className="cover">
            <img src={comImg} alt={comName+"封面"} title={comName+"封面"} />
          </div>
          <div className="detail-box">
            <p className="com-price">{comPrice}元</p>
            <p className="com-name">{comName}</p>
            <span className="com-quantity">库存：{comQuantity}</span>
            <span className="com-addedDate">发布时间：{new Date(comAddedDate).toLocaleDateString()}</span>
          </div>
          <div className="bottom">
            <div className="username">
              卖家：{this.state.user.username || '......'}
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

export default withRouter(CommodityItem)