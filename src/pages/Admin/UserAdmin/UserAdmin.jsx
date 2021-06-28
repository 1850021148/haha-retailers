import React, { Component } from 'react'
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
  Form
} from 'antd';
import './UserAdmin.scss'

export default class UserAdmin extends Component {
  state = {
    isEditModalVisible: false,
    isDelModalVisible: false,
    willDelUserId: null,
    willEditUser: {},
    total: 0,
    pageSize: 6,
    loading: true,
    current: 1,
    data: [],
    columns: [
      {
        title: 'ID',
        dataIndex: 'userId',
        key: 'userId',
        render: text => <span>{text}</span>,
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        render: text => <span>{text}</span>,
      },
      {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
      },
      {
        title: '身份',
        dataIndex: 'isAdmin',
        key: 'isAdmin',
        render: (isAdmin) => (
          isAdmin ? <Tag color="#f50">管理员</Tag> : <Tag color="#87d068">普通用户</Tag>
        )
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
    const {data: {data}, status} = await axios.post('/api/user/search', {page: 1, size: this.state.pageSize})
    this.setState({
      loading: false,
      total: data.count,
      data: data.user.map(item => ({...item, isAdmin: !!item.isAdmin}))
    })
    // let data = []
    // for (let index = 0; index < 6; index++) {
    //   data.push({
    //     key: index,
    //     userId: index,
    //     username: 'juln',
    //     password: 'juln123',
    //     isAdmin: false
    //   })
    // }
    // this.setState({data})
  }
  handlePaginationChange = async (current) => {
    this.setState({loading: true})
    const {data: {data}, status} = await axios.post('/api/user/search', {page: current, size: this.state.pageSize})
    this.setState({
      current,
      loading: false,
      total: data.count,
      data: data.user.map(item => ({...item, isAdmin: !!item.isAdmin}))
    })
  }
  handleSearch = () => {

  }
  handleDelCol = (colNum) => {
    this.setState({
      isDelModalVisible: true,
      willDelUserId: this.state.data[colNum].userId
    })
  }
  handleDelUser = async() => {
    const {willDelUserId: userId} = this.state
    // 网络请求删除
    const {data: {code}, status} = await axios.get(`/api/user/del?userId=${userId}`)
    if(code !== 0) {
      message.error(`id为${userId}的用户删除失败`)
      return
    }
    // 页面上删除
    message.success(`id为${userId}的用户已删除`)
    this.setState({
      isDelModalVisible: false,
      data: this.state.data.filter(item => item.userId !== this.state.willDelUserId)
    })
  }
  handleEditCol(colNum) {
    this.setState({
      isEditModalVisible: true,
      willEditUser: this.state.data[colNum]
    })
  }
  handleEditUser = async() => {
    const {willEditUser: userInfo} = this.state
    // 网络请求修改
    const {data: {code}, status} = await axios.post(`/api/user/update`, userInfo)
    if(code !== 0) {
      message.error(`id为${userInfo.userId}的用户修改失败`)
      return
    }
    // 页面上修改
    let newData = this.state.data.map(item => {
      if(item.userId === userInfo.userId) {
        return userInfo
      }
      return item
    })
    this.setState({
      data: newData,
      isEditModalVisible: false
    })
  }
  render() {
    const {loading, current, pageSize, total, data, columns, 
      isDelModalVisible, isEditModalVisible,
      willEditUser } = this.state
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="用户管理"
          subTitle="对用户的增删改查"
        />

        {/* <Search placeholder="input search text" addonBefore="搜索用户" enterButton
          onSearch={this.handleSearch} /> */}

        <Table columns={columns} dataSource={data} loading={loading} pagination={false} />
        <Pagination total={total} pageSize={pageSize}
          current={current} onChange={this.handlePaginationChange} />

        <Modal title="删除警告" visible={isDelModalVisible}
          cancelText="取消删除" okText="确认删除"
          onOk={this.handleDelUser}
          onCancel={() => this.setState({isDelModalVisible: false})}>
          <p>是否删除该用户</p>
        </Modal>

        <Modal title="修改用户信息" visible={isEditModalVisible}
          cancelText="取消修改" okText="确认修改"
          onOk={this.handleEditUser}
          onCancel={() => this.setState({isEditModalVisible: false})}>
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            <Form.Item label="ID">
              {willEditUser.userId}
            </Form.Item>
            <Form.Item label="isAdmin">
              {willEditUser.isAdmin ? 'True' : 'False'}
            </Form.Item>
            <Form.Item label="用户名">
              <Input placeholder="请输入用户名" defaultValue={willEditUser.username}
                onInput={(event) => this.setState({willEditUser: {...this.state.willEditUser, username: event.target.value}})} />
            </Form.Item>
            <Form.Item label="密码">
              <Input placeholder="请输入密码" defaultValue={willEditUser.password}
                onInput={(event) => this.setState({willEditUser: {...this.state.willEditUser, password: event.target.value}})} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}