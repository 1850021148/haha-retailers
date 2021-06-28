import React, { Component } from 'react'
import Head from './components/Head/Head'
import Footer from './components/Footer/Footer'
import style from './Layout.scss'

export default class layout extends Component {
  render() {
    const {showAdmin} = this.props
    return (
      <div style={style}>
        <Head showAdmin={showAdmin} />
        <div className="body">
          {this.props.children}
        </div>
        { showAdmin ? null : <Footer/> }
      </div>
    )
  }
}
