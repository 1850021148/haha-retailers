import * as actionTypes from './store/user/action-types'

const initState = null

export default function(preState = initState, action) {
  const {type, data} = action
  switch (type) {
    case actionTypes.SETUSERINFO:
      return data
    case actionTypes.CLEARUSERINFO:
      return null
    default:
      return preState
  }
}