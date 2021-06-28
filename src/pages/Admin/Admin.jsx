import React, { Component } from 'react'
import AdminMenu from '@/components/AdminPage/AdminMenu/AdminMenu'
import { Switch, Route, Redirect } from 'react-router-dom'
import UserAdmin from './UserAdmin/UserAdmin'
import CommodityAdmin from './CommodityAdmin/CommodityAdmin'
import OrderAdmin from './OrderAdmin/OrderAdmin'
import './Admin.scss'

export default class Admin extends Component {
  render() {
    return (
      <div className="admin">
        <AdminMenu />
        <div className="admin-right">
          <Switch>
            <Route path="/admin/user" component={UserAdmin} />
            <Route path="/admin/commodity" component={CommodityAdmin} />
            <Route path="/admin/order" component={OrderAdmin} />
            <Redirect to="/admin/user" />
          </Switch>
        </div>
      </div>
    )
  }
}
