import { createStore, applyMiddleware } from 'redux'
import userReducer from '../../user_reducer'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(userReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))