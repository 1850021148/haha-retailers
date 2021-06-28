import React, { Component } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as userAction from '../../../store/user/user_action'
import SearchBar from '../../../components/SearchBar/SearchBar'
import style from './Head.scss'
import searchIcon from '@assets/svg/search-icon.svg'
import searchHoverIcon from '@assets/svg/search-icon-yellow.svg'
import delIcon from '@assets/svg/del-icon.svg'

class Head extends Component {
  state = {
    searchHover: false,
    showSearchBar: false,
    keyword: ''
  }
  setSearchHover = (bool) => {
    this.setState({
      searchHover: bool
    })
  }
  handleClickSearch = () => {
    this.setState({
      showSearchBar: true
    })
  }
  hideSearchBar = () => {
    this.setState({
      keyword: '',
      showSearchBar: false
    })
  }
  handleSearch = (keyword) => {
    this.props.history.push(`/search?keyword=${keyword}`)
  }
  handleLogout = () => {
    this.props.logout()
  }
  render() {
    // Head组件最中央显示的是搜索框或是导航栏
    const { searchHover, showSearchBar } = this.state
    const { setSearchHover, hideSearchBar, handleSearch } = this
    const searchSrc = searchHover ? searchHoverIcon : searchIcon
    let middleComp
    if(showSearchBar) {
      middleComp = (
        <div className="middle-search-bar">
          <div className="cancel-search-bar" onClick={hideSearchBar}>
            <img src={delIcon} alt="隐藏输入框" title="隐藏输入框" />
          </div>
          <SearchBar inputStyle={{width: '360px'}} onSearch={handleSearch} />
        </div>
      )
    } else {
      middleComp = (
        <nav className="middle-nav">
          <NavLink to="/" exact className="nav-item">首页</NavLink>
          <NavLink to="/about" className="nav-item">关于我们</NavLink>
          {
            this.props.showAdmin ? 
              <NavLink to="/admin" className="nav-item">后台管理</NavLink>
              : null
          }
        </nav>
      )
    }
    // Head最右边显示的是登录后的，或是未登录的
    //#region 正式代码
    const { userInfo } = this.props
    //#endregion
    //#region 测试代码
    // const userInfo = { username: 'juln' }
    //#endregion
    let rightComp
    if(userInfo) {
      rightComp = (
        <div className="user-comp logined-box">
          <p>用户名: <span className="username">{userInfo.username}</span></p>
          |
          <button className="logout-btn" onClick={this.handleLogout}>登出</button>
        </div>
      )
    } else {
      rightComp = (
        <nav className="user-comp login-register-nav">
          <NavLink to="/log-reg/login" className="nav-item">登录</NavLink>
          |
          <NavLink to="/log-reg/register" className="nav-item">注册</NavLink>
        </nav>
      )
    }
    return (
      <header className={style.header}>
        <div className="logo">
          <Link to="/"><img src="/big-logo.png" alt="哈哈商城logo" title="哈哈商城logo" /></Link>
        </div>
        <div className="middel">
          {middleComp}
        </div>
        <div className="right">
          <div to="/search" className={"nav-item search" + (showSearchBar ? " hide" : "")}
            onMouseOver={setSearchHover.bind(this, true)}
            onMouseOut={setSearchHover.bind(this, false)}
            onClick={this.handleClickSearch}>
            <img src={searchSrc} alt="搜索" title="搜索" />
          </div>
          {rightComp}
        </div>
      </header>
    )
  }
}

export default connect(
  state => ({
    userInfo: state
  }),
  {
    logout: userAction.logout
  }
)(withRouter(Head))