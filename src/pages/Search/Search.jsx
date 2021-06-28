import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { message } from 'antd'
import SearchBar from '../../components/SearchBar/SearchBar'
import CommodityWrapper from './CommodityWrapper/CommodityWrapper'
import axios from 'axios'
import queryString from 'querystring'
import style from './Search.scss'
import banner1 from '@assets/image/search-page-banner1.jpg'
import banner2 from '@assets/image/search-page-banner2.jpg'

const searchBarStyle = {
  style: {
    justifyContent: 'center'
  },
  inputStyle: {
    backgroundColor: '#F8F8F8',
    width: 'calc( 100vw - 400px )',
    height: '50px',
    borderTop: '1px solid lightgray',
    borderBottom: '1px solid lightgray',
    textIndent: '20px'
  },
  buttonStyle: {
    backgroundColor: '#FFE300',
    width: '100px',
    height: '50px',
    borderTopRightRadius: '5px',
    borderBottomRightRadius: '5px',
  }
}

const $pageState = {
  INIT: 0,
  LOADING: 1,
  OK: 2,
  NOTHING: 3,
  ERROR: 4
}

class Search extends Component {
  state = {
    pageState: $pageState.INIT,
    page: 1,
    size: 6,
    keyword: '',
    data: {}
  }
  static getDerivedStateFromProps(props,state) {
    const query = queryString.parse(props.location.search.slice(1))
    return {
      ...state,
      keyword: query.keyword
    }
  }
  componentDidMount = async function() {
    this.setState({pageState: $pageState.LOADING})
    //#region  下面是测试代码
    // this.setState({pageState: $pageState.OK})
    // this.setState({
    //   data: {
    //     count: 6,
    //     commodities: [
    //       { comId: 1, comName: "旺旺", comType: "1", comQuantity: 200, comStatus: 0, comAddedDate: 1624103911000, comImg: "https://img.zcool.cn/community/031316958fbd47fa8012160f73b739f.jpg@520w_390h_1c_1e_2o_100sh.jpg", comPrice: 20, userId: 1 },
    //       { comId: 2, comName: "唐生肉", comType: "1", comQuantity: 200, comStatus: 0, comAddedDate: 1624103911000, comImg: "https://img.zcool.cn/community/031316958fbd47fa8012160f73b739f.jpg@520w_390h_1c_1e_2o_100sh.jpg", comPrice: 20, userId: 2 },
    //       { comId: 3, comName: "大明牌狗肉", comType: "1", comQuantity: 200, comStatus: 0, comAddedDate: 1624103911000, comImg: "https://img.zcool.cn/community/031316958fbd47fa8012160f73b739f.jpg@520w_390h_1c_1e_2o_100sh.jpg", comPrice: 20, userId: 3 },
    //     ]
    //   }
    // })
    //#endregion
    //#region 正式代码
    try {
      const {page,size,keyword} = this.state
      const {data, status} = await axios.post('/api/commodity/search', {
        page, size, keyword
      })
      if(status !== 200) {
        new Error('网络连接失败')
      } else if(data.code !== 0) {
        new Error('搜索失败, 服务端裂开')
      } else { // ok
        console.log(data.data)
        if(data.data.count === 0) {
          this.setState({pageState: $pageState.NOTHING})
        } else {
          this.setState({
            pageState: $pageState.OK,
            data: data.data
          })
        }
      }
    } catch (error) {
      this.setState({pageState: $pageState.Error})
      message.warning(error.message)
    }
    //#endregion 正式代码
  }
  handleSearch = (keyword) => {
    this.props.history.push('/search?keyword='+keyword)
    window.location.reload()
  }
  renderBody = () => {
    const {pageState} = this.state
    switch (pageState) {
      case $pageState.INIT:
      case $pageState.LOADING:
        return (
          <h1>数据加载中...</h1>
        )
      case $pageState.OK:
        return <CommodityWrapper data={this.state.data} />
      case $pageState.NOTHING:
        return (
          <h1>搜索不到东西呦...</h1>
        )
      case $pageState.ERROR:
        return (
          <h1>网络连接失败...</h1>
        )
    }
  }
  render() {
    return (
      <div className={style['search-wrapper']}>
        <div className="top-banner">
          <img src={banner1} alt="" />
          <img src={banner2} alt="" />
        </div>
        <div className="search-wrapper">
          <div className="result-total">
            共 <span style={{fontWeight: 'bold'}}>{this.state.data.count || 0}</span> 条搜索结果
          </div>
          <SearchBar {...searchBarStyle} onSearch={this.handleSearch} />
        </div>
        <div className="core-body">
          {this.renderBody()}
        </div>
      </div>
    )
  }
}

export default withRouter(Search)