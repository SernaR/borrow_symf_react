import client from './client'
import { LOGIN } from '../config/settings'

const login = credentials => client.post(LOGIN, credentials)

export default { 
    login
}