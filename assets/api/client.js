import { create } from 'apisauce'
import authStorage from '../auth/storage'
import { API_URL } from '../config/settings'

const apiClient = create({
    baseURL: API_URL,
})

apiClient.addAsyncRequestTransform( async(request) => {
    const authToken = authStorage.getToken()
    if (!authToken) return

    request.headers["Authorization"] = "Bearer " + authToken
})

export default apiClient