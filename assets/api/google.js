import { create } from 'apisauce'

const GOOGLE_URL = 'https://www.googleapis.com/books/v1/volumes'
const ISBN_URL = '?q='
const ID_URL = '/'

//&langRestrict=fr
//&maxResults=40  //faire pagination
//&key=yourAPIKey


const apiClient = create({
    baseURL: GOOGLE_URL,
})

const findByIsbn = isbn => apiClient.get(ISBN_URL + isbn) 
const findById = id => apiClient.get(ID_URL + id)

export default { 
    findByIsbn,
    findById
}