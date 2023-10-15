import { combineReducers } from 'redux'
import errors from './errors'
import alerts from './alerts'
import auth from './auth'

export default combineReducers({
	errors, alerts, auth,
})
