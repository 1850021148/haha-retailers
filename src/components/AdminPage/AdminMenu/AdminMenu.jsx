import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UsergroupAddOutlined,
  DesktopOutlined,
  ContainerOutlined
} from '@ant-design/icons';
import style from './AdminMenu.scss';

class AdminMenu extends Component {
  state = {
    collapsed: false,
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  render() {
    const {pathname} = this.props.location
    return (
      <div style={{ width: 180 }} className={style.adminMenu}>
        <Menu
          defaultSelectedKeys={['1']}
          selectedKeys={[pathname]}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="/admin/user" icon={<UsergroupAddOutlined />}>
            <Link to="/admin/user">用户管理</Link>
          </Menu.Item>
          <Menu.Item key="/admin/commodity" icon={<DesktopOutlined />}>
            <Link to="/admin/commodity">商品管理</Link>
          </Menu.Item>
          <Menu.Item key="/admin/order" icon={<ContainerOutlined />}>
            <Link to="/admin/order">订单管理</Link>
          </Menu.Item>
          <Button type="primary" onClick={this.toggleCollapsed}>
            { this.state.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }
          </Button>
        </Menu>
      </div>
    )
  }
}

export default withRouter(AdminMenu)