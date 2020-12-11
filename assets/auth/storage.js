
import jwtDecode from 'jwt-decode';


function storeToken(token) {
    window.localStorage.setItem("authToken", token)
}

function getToken(user = false) {
    const authToken = window.localStorage.getItem("authToken")
    if (!authToken) return null

    const tokenData = jwtDecode(authToken);
    return  tokenData.exp * 1000 > new Date().getTime() ? 
        user ? tokenData : authToken 
        : null
}

function removeToken() {
    window.localStorage.removeItem("authToken");
}

function getUser() {
    return getToken(user)
}


            
export default {
    storeToken,
    getToken,
    removeToken,
    getUser
}