import client from './client'
import { PRODUCTS } from '../config/settings'

const findAll = () => client.get(PRODUCTS)
const find = id => client.get(PRODUCTS + '/' + id)

export default { 
    findAll,
    find
}