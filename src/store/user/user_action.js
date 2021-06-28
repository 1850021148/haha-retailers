import * as actionTypes from './action-types'
import axios from 'axios'
import store from './store'

function setUserInfo(username, password, isAdmin=false) {
  return {
    type: actionTypes.SETUSERINFO,
    data: { username, password, isAdmin }
  }
}

function clearUserInfo() {
  return {
    type: actionTypes.CLEARUSERINFO,
    data: null
  }
}

export function login(username, password, push) {
  // 若已登录，则忽略
  if(store.getState()) return
  return (dispatch) => {
    axios.post('/api/login', {username, password})
      .then(data => data.data)
      .then(data => {
        console.log(data)
        if(data.code === 0) {
          // 如果登录的是admin
          if(username === 'ming' && password === '121388') {
            dispatch(setUserInfo(username, password, true))
          } else { // 登录的是普通用户
            dispatch(setUserInfo(username, password))
          }
          push('/')
        } else {
          alert('登录失败')
        }
      })
      .catch(error => {
        console.log('error from login: ', error)
      })
  }
}

export function logout() {
  // 若未登录，则忽略
  if(!store.getState()) return
  return (dispatch) => {
    dispatch(clearUserInfo())
    // axios.post('/api/logout')
    //   .then(data => data.data)
    //   .then(data => {
    //     if(data.code === 0) {
    //       dispatch(clearUserInfo())
    //     } else {
    //       alert('登出失败')
    //     }
    //   })
    //   .catch(error => {
    //     console.log('error from logout: ', error.massage)
    //   })
  }
}

export function register(username, password, push) {
  let hasLogin = !!store.getState()
  return async (dispatch) => {
    axios.post('/api/register', {username, password})
      .then(data => data.data)
      .then(data => {
        if(data.code === 0) {
          dispatch(setUserInfo(username, password))
          push('/')
        } else {
          alert('注册失败')
        }
      })
      .catch(error => {
        console.log('error from register: ', error)
      })
  }
}