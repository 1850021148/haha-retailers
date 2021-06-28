import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import style from './NoFound.scss'

class NoFound extends Component {
  state = {
    timeout: 3
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      const newTimeout = this.state.timeout - 1
      this.setState({
        timeout: newTimeout
      })
      if(this.state.timeout <= 0) {
        this.props.history.replace('/')
      }
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  render() {
    const {timeout} = this.state
    return (
      <div className="no-found-page" style={style}>
        <h2>糟糕, 页面走丢了</h2>
        <p>{timeout}秒后返回自动 <Link to="/">首页</Link></p>
      </div>
    )
  }
}

export default NoFound