import React, { Component } from 'react'
import CommodityItem from '../CommodityItem/CommodityItem'
import style from './CommodityWrapper.scss'

export default class CommodityWrapper extends Component {
  render() {
    console.log(this.props.data)
    const {count, commodities} = this.props.data
    return (
      <div style={style} className="wrapper">
        {commodities.map(item => <CommodityItem key={item.comId} data={item} />)}
      </div>
    )
  }
}
