import client from './client'
import { LOGIN, REGISTER } from '../config/settings'

const login = credentials => client.post(LOGIN, credentials)

const register = user => client.post(REGISTER, user)

export default { 
    login,
    register
}