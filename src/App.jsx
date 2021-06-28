import { Switch, Route, Redirect } from 'react-router-dom'
import Layout from './layout/Layout';
import Index from './pages/Index/Index'
import About from './pages/About/About'
import NoFound from './pages/NoFound/NoFound'
import Search from './pages/Search/Search';
import Commodity from './pages/Commodity/Commodity';
import LogReg from './pages/LogReg/LogReg';
import { connect } from 'react-redux';
import Admin from './pages/Admin/Admin';

function App(props) {
  let adminRoute = null
  // 如果管理员登录了
  //#region 正式代码
  const showAdmin = props.userInfo && props.userInfo.isAdmin
  //#endregion
  //#region 测试代码
  // const showAdmin = true
  //#endregion
  if(showAdmin) {
    adminRoute = (
      <Route path="/admin" component={Admin} />
    )
  }
  return (
    <div className="App">
      <Switch>
        <Route path="/log-reg/:page" component={LogReg} />
        <Layout showAdmin={showAdmin}>
          <Switch>
            {adminRoute}
            <Route path="/" exact component={Index} />
            <Route path="/about" component={About} />
            <Route path="/search" component={Search} />
            <Route path="/commodity/:id" component={Commodity} />
            <Route path="/404" component={NoFound} />
            <Redirect to="/404" />
          </Switch>
        </Layout>
      </Switch>
    </div>
  );
}

export default connect(
  state => ({
    userInfo: state
  })
)(App);
