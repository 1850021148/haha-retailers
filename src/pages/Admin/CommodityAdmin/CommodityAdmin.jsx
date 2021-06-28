import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  PageHeader,
  Modal,
  Input,
  Table,
  Tag,
  Space,
  Button,
  Pagination,
  message,
  Form,
  Upload,
  Switch
} from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import './CommodityAdmin.scss'

const {Search} = Input

export default class CommodityAdmin extends Component {
  state = {
    editModalKey: 0,
    isEditModalVisible: false,
    isDelModalVisible: false,
    willDelComId: null,
    willEditCom: {},
    total: 50,
    pageSize: 5,
    loading: false,
    current: 1,
    data: [],
    columns: [
      {
        title: 'ID',
        dataIndex: 'comId',
        key: 'comId',
        render: text => <span>{text}</span>,
      },
      {
        title: '商品封面',
        dataIndex: 'comImg',
        key: 'comImg',
        render: src => <img style={{width: '60px', height: '60px'}} src={src} alt="" />,
      },
      {
        title: '商品名',
        dataIndex: 'comName',
        key: 'comName',
        render: text => <span>{text}</span>,
      },
      {
        title: '网址',
        dataIndex: 'url',
        key: 'url',
        render: url => <Link to={url} target="_blank" style={{textDecoration: 'underline', fontSize: '12px'}}>{window.location.origin + url}</Link>
      },
      {
        title: '库存',
        dataIndex: 'comQuantity',
        key: 'comQuantity',
        render: text => <span>{text}</span>,
      },
      {
        title: '价格',
        dataIndex: 'comPrice',
        key: 'comPrice',
        render: text => <span>{text}元</span>,
      },
      {
        title: '状态',
        dataIndex: 'comStatus',
        key: 'comStatus',
        render: (comStatus) => (
          comStatus === 0 ? <Tag color="#87d068">正常</Tag> : <Tag color="#f50">已下架</Tag>
        )
      },
      {
        title: '卖家信息',
        dataIndex: 'user',
        key: 'user',
        render: user => <span>{user.username} (id={user.userId})</span>,
      },
      {
        title: '修改 / 删除',
        key: 'action',
        render: (_ , __, colNum) => (
          <Space size="middle">
            <Button type="primary" onClick={() => this.handleEditCol(colNum)}>修改</Button>
            <Button danger onClick={() => this.handleDelCol(colNum)}>删除</Button>
          </Space>
        ),
      },
    ]
  }
  componentDidMount = async() => {
    this.setState({loading: true})
    const {data: {data}, status} = await axios.post('/api/commodity/search', {page: 1, size: this.state.pageSize})
    this.setState({
      loading: false,
      total: data.count,
      data: data.commodities.map(item => ({...item, user: {username: '', userId: item.userId}, url: `/commodity/${item.comId}`}))
    })
    // let data = []
    // for (let index = 0; index < 5; index++) {
    //   data.push({
    //     key: index,
    //     comId: index,
    //     comImg: '/big-logo.png',
    //     comName: '大明牌狗肉',
    //     comQuantity: 10,
    //     comStatus: 0,
    //     comPrice: 100,
    //     user: {userId: 0, username: 'juln'},
    //     url: `/commodity/${index}`
    //   })
    // }
    // this.setState({data})
  }
  handlePaginationChange = async(current) => {
    this.setState({loading: true})
    const {data: {data}, status} = await axios.post('/api/commodity/search', {page: current, size: this.state.pageSize})
    this.setState({
      current,
      loading: false,
      total: data.count,
      data: data.commodities.map(item => ({...item, user: {username: '', userId: item.userId}, url: `/commodity/${item.comId}`}))
    })
    // const data = []
    // this.setState({ current, data })
  }
  handleSearch = () => {

  }
  handleDelCol = (colNum) => {
    this.setState({
      isDelModalVisible: true,
      willDelComId: this.state.data[colNum].comId
    })
  }
  handleDelCom = async() => {
    const {willDelComId: comId} = this.state
    // 网络请求删除
    const {data: {code}, status} = await axios.get(`/api/commodity/del?comId=${comId}`)
    if(code !== 0) {
      message.error(`id为${comId}的商品删除失败`)
      return
    }
    // 页面上删除
    this.setState({
      isDelModalVisible: false,
      data: this.state.data.filter(item => item.comId !== this.state.willDelComId)
    })
    message.success(`id为${comId}的商品已删除`)
  }
  handleEditCol(colNum) {
    console.log(this.state.data[colNum])
    this.setState({
      isEditModalVisible: true,
      willEditCom: this.state.data[colNum]
    })
    this.reRenderEditModal()
  }
  handleEditCom = async() => {
    const {willEditCom} = this.state
    // 网络请求修改
    const formdata = new FormData()
    for (const [key,value] of Object.entries(willEditCom)) {
      if(['user', 'comAddedDate', 'comType', 'url'].includes(key)) continue
      if(key === 'comImg') {
        formdata.append('comImg', null)
        continue
      }
      formdata.append(key === 'comImgFile' ? 'comImg' : key, value)
    }
    const {data: {code}, status} = await axios.post(`/api/commodity/update`, formdata)
    if(code !== 0) {
      message.error(`id为${willEditCom.comId}的用户修改失败`)
      return
    }
    // 刷新页面，重新获取数据
    this.setState({
      isEditModalVisible: false
    })
    this.handlePaginationChange(this.state.current)
  }
  reRenderEditModal = () => {
    this.setState({
      editModalKey: Date.now()
    })
  }
  render() {
    const {loading, current, pageSize, total, data, columns, 
      isDelModalVisible, isEditModalVisible,
      willEditCom } = this.state
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="商品管理"
          subTitle="对商品的增删改查"
        />

        {/* <Search placeholder="input search text" addonBefore="搜索用户" enterButton
          onSearch={this.handleSearch} /> */}

        <Table columns={columns} dataSource={data} loading={loading} pagination={false} />
        <Pagination total={total} pageSize={pageSize}
          current={current} onChange={this.handlePaginationChange} />

        <Modal title="删除警告" visible={isDelModalVisible}
          cancelText="取消删除" okText="确认删除"
          onOk={this.handleDelCom}
          onCancel={() => this.setState({isDelModalVisible: false})}>
          <p>是否删除该商品</p>
        </Modal>

        <Modal title="修改用户信息" visible={isEditModalVisible}
          cancelText="取消修改" okText="确认修改"
          onOk={this.handleEditCom}
          onCancel={() => this.setState({isEditModalVisible: false})}
          key={this.state.editModalKey}>
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            <Form.Item label="ID">
              {willEditCom.comId}
            </Form.Item>
            <Form.Item label="商品名">
              <Input placeholder="请输入商品名" defaultValue={willEditCom.comName}
                onInput={(event) => this.setState({willEditCom: {...this.state.willEditCom, comName: event.target.value}})} />
            </Form.Item>
            <Form.Item label="商品图片">
              <img style={{display: 'block', width: '200px', height: '200px', border: '1px solid black', marginBottom: '20px'}} 
                src={willEditCom.comImg} alt="" />
              <Upload onChange={({file, _}) => {
                if (file.status !== 'uploading') {
                  this.setState({willEditCom: {...this.state.willEditCom, comImgFile: file.originFileObj}})
                }
              }}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item label="库存">
              <Input style={{width: '80px'}} type="number" placeholder="请输入库存" defaultValue={willEditCom.comQuantity}
                onInput={(event) => this.setState({willEditCom: {...this.state.willEditCom, comQuantity: event.target.value}})} />
            </Form.Item>
            <Form.Item label="价格">
              <Input style={{width: '80px'}} type="number" placeholder="请输入库存" defaultValue={willEditCom.comPrice}
                onInput={(event) => this.setState({willEditCom: {...this.state.willEditCom, comPrice: event.target.value}})} />
            </Form.Item>
            <Form.Item label="状态">
              {
                this.state.willEditCom ? 
                  <Switch defaultChecked={!this.state.willEditCom.checked} checkedChildren="正常" unCheckedChildren="下架" onChange={checked => this.setState({willEditCom: {...this.state.willEditCom, comStatus: +!checked}})} />
                  : null
              }
            </Form.Item>
            <Form.Item label="卖家信息">
              {
                willEditCom.user ? 
                  <span>{willEditCom.user.username} (id={willEditCom.user.userId})</span>
                  : null
              }
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}