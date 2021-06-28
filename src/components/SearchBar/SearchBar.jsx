import React, { Component } from 'react'
import style from './SearchBar.scss'
import searchIcon from '@assets/svg/search-icon.svg'

export default class SearchBar extends Component {
  state = {
    keyword: ''
  }
  handleInputChange = (event) => {
    const keyword = event.target.value
    this.setState({
      keyword
    })
  }
  handleKeyDown = (event) => {
    const {keyCode, code} = event
    const {keyword} = this.state
    if(keyCode === 13 || code === 'Enter') {
      this.handleClickBtn(keyword)
    }
  }
  handleClickBtn = () => {
    const {onSearch: handleSearch} = this.props
    const {keyword} = this.state
    handleSearch.call(this, keyword)
  }
  render() {
    const {handleClickBtn, handleInputChange, handleKeyDown} = this
    const {style: outStyle, inputStyle, buttonStyle} = this.props
    const {keyword} = this.state
    return (
      <div className={style['search-bar']} style={outStyle} className="search-bar">
        <input type="text" autoFocus placeholder="哈哈薯片" style={inputStyle}
          value={keyword} onChange={handleInputChange} onKeyDown={handleKeyDown} />
        <button style={buttonStyle}>
          <img alt="搜索" title="搜索" 
            src={searchIcon}
            onClick={handleClickBtn} />
        </button>
      </div>
    )
  }
}
