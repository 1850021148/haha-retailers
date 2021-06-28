import React, { Component } from 'react'
import Banner from './Banner'
import style from './Index.scss'

export default class Index extends Component {
  render() {
    return (
      <div style={style}>
        <div className="banner-wrapper">
          <Banner/>
        </div>
        <h1 style={{textAlign: 'center', marginTop: '20px'}}>欢迎来到哈哈商城</h1>
      </div>
    )
  }
}
