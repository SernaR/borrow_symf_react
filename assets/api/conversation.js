import client from './client'
import { CONVERSATIONS } from '../config/settings'

const findByOwner = () => client.get(CONVERSATIONS)
const findByBorrower = id => client.get(CONVERSATIONS + '/product/' + id)

export default { 
    findByOwner,
    findByBorrower
}