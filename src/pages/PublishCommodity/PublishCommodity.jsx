import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Upload, Button, Input, message } from 'antd'
import axios from 'axios'
import { UploadOutlined } from '@ant-design/icons'
import './PublishCommodity.scss'

class PublishCommodity extends Component {
  state = {
    comName: '',
    comImg: null,
    comQuantity: 1,
    comPrice: 1,
    imgSrc: null
  }
  handleSelectImg = (file) => {
    this.setState({
      comImg: file.originFileObj
    })
    const fr = new FileReader()
    // fr.onload = () => {
    //   const isLt2M = file.size / 1024 / 1024 < 2
    //   if (!isLt2M) {
    //     message.error('图片大小不能超过 2MB!')
    //     return
    //   }
    //   this.setState({
    //     comImg: file.originFileObj,
    //     imgSrc: fr.result
    //   })
    // }
    // fr.readAsDataURL(file)
  }
  handlePublish = () => {
    const userId = this.props.userInfo.userId
    const {comName, comImg, comQuantity, comPrice} = this.state
    console.log(this.state)
    // 判断是否有商品图片
    if(!comImg) {
      message.error('请上传商品图片')
      return
    }
    const formdata = new FormData()
    for (const [key,value] in Object.entries({userId, comName, comImg, comQuantity, comPrice})) {
      formdata.append(key, value)
    }
    axios.post('/api/commodity/publish', formdata)
      .then(data => data.data)
      .then(data => {
        if(data.code !== 0) {
          message.error('商品发布失败')
        } else {
          message.success('商品发布成功')
        }
      })
      .catch(error => {
        message.error('网络连接失败: '+error.message)
      })
  }
  render() {
    const {userInfo} = this.props
    // 若未登录
    if(!userInfo) {
      return (
        <h1 className="please-login">
          <Link to="/log-reg/login">您尚未登录，点我前往登录</Link>
        </h1>
      )
    }
    // 若已登录
    const {comQuantity, comPrice, imgSrc} = this.state
    return (
      <div className="publish-page">
        <Form labelCol={{ span: 10 }} wrapperCol={{ span: 6 }}>
          <Form.Item label="商品名" name="username" 
            rules={[{ required: true, message: '请输入商品名' }]}>
            <Input placeholder="请输入商品名"
              onInput={(event) => this.setState({comName: event.target.value})} />
          </Form.Item>
          <Form.Item label="商品图片">
            {
              imgSrc ? 
                <img key={imgSrc} src={imgSrc} alt="" />
                : null
            }
            <Upload onChange={({file, _}) => {
              if (file.status !== 'uploading')
                this.handleSelectImg(file)
            }}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="库存">
            <Input value={comQuantity} min={1} style={{width: '80px'}} type="number"
              onInput={(event) => this.setState({comQuantity: event.target.value})} />
          </Form.Item>
          <Form.Item label="价格 (元)">
            <Input value={comPrice} min={1} style={{width: '80px'}} type="number"
              onInput={(event) => this.setState({comPrice: event.target.value})} />
          </Form.Item>
          <Button onClick={this.handlePublish}>发布</Button>
        </Form>
      </div>
    )
  }
}
export default connect(
  state => ({
    userInfo: state
  })
)(PublishCommodity)
