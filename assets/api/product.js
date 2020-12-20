import client from './client'
import { PRODUCTS } from '../config/settings'

const findAll = () => client.get(PRODUCTS)
const find = id => client.get(PRODUCTS + '/' + id)
const store = product => client.post(PRODUCTS, product, {'Content-Type': 'multipart/form-data'})

export default { 
    findAll,
    find,
    store
}