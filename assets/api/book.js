import { create } from 'apisauce'
//import authStorage from '../auth/storage'
//import { API_URL } from '../config/settings'

//URL = 'https://www.googleapis.com/books/v1/volumes?q=isbn:'

//const URL = "https://www.googleapis.com/books/v1/volumes?q=9782330064532&maxResults=40" //9782212674088" //&key=yourAPIKey
const URL = "https://www.googleapis.com/books/v1/volumes?q=9782330051006"
//&langRestrict=fr
//&maxResults=40  //faire pagination
//const URL = "https://www.googleapis.com/books/v1/volumes/JoM6DwAAQBAJ" //par ID

const apiClient = create({
    baseURL: URL,
})

// apiClient.addAsyncRequestTransform( async(request) => {
//     const authToken = authStorage.getToken()
//     if (!authToken) return

//     request.headers["Authorization"] = "Bearer " + authToken
// })


const find = isbn => apiClient.get(URL) //+ '/' + isbn)

export default { 
    find
}