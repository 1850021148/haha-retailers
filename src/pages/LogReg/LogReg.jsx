import React, { Component } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox } from 'antd';
import * as userAction from '../../store/user/user_action'
import style from './LogReg.scss';
import bg from '../../assets/image/login-geng.jpg';

const pageStyle = {
  backgroundImage: `url(${bg})`,
  width: '100vw',
  height: '100vh',
  backgroundSize: 'cover'
}

class LogReg extends Component {
  onFinish = (values) => {
    console.log('Success:', values);
    const {page} = this.props.match.params
    const {username, password} = values
    if(page === 'login') {
      this.props.login(username, password, this.props.history.push)
    } else if(page === 'register') {
      this.props.register(username, password, this.props.history.push)
    }
  }
  checkRepassword = (rules, value, callback) => {
    const password = this.form.getFieldValue('password')
    console.log(password, value)
    if(value === '' || !value) {
      callback(new Error('请输入确认密码'))
    }
    if(password === value) {
      callback()
      return
    } else {

      callback(new Error('两次密码不正确'))
      return
    }
  }
  render() {
    const {page} = this.props.match.params
    let formComp
    if(page === 'login') {
      formComp = (
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
            validateTrigger='onBlur'
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
            validateTrigger='onBlur'
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      )
    } else if(page === 'register') {
      formComp = (
        <Form
          ref={form => this.form = form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
            validateTrigger='onBlur'  
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
            validateTrigger='onBlur'  
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="repassword"
            rules={[
              { validator: this.checkRepassword },
            ]}
            validateTrigger='onBlur'          
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
      )
    }
    return (
      <div className={style.page} style={pageStyle}>
        <Link to="/">
          <div className="logo123">
            <img src="/big-logo.png" alt="" />
          </div>
        </Link>
        <div className="inner">
          <div className="nav-list">
            <nav><NavLink to="/log-reg/login">登录</NavLink></nav>
            <nav><NavLink to="/log-reg/register">注册</NavLink></nav>
          </div>
          {formComp}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    userInfo: state
  }),
  {
    login: userAction.login,
    register: userAction.register
  }
)(withRouter(LogReg))