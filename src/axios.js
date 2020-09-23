// axios
import axios from 'axios'

const baseURL = 'https://dmc9l6wlyb.execute-api.us-east-1.amazonaws.com'
const publishableKey = 'pk_test_OQyIWNfHPcauzJrpOaSXq3D1'
const instance = axios.create({
  baseURL
  // You can add your headers here
})

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('IdToken')
  const access_token = localStorage.getItem('AccessToken')
  if (token) {
    config.headers.Authorization = token
    config.headers.access_token = access_token
    config.headers['Content-Type'] = 'application/json'
  }
  return config
})

instance.interceptors.response.use(response=>response,
  error=>{
    console.log('interceptor!!!!!!!!', error)
    if(error.message.lastIndexOf('status_code_401')!==-1){
      localStorage.removeItem('userInfo')
      localStorage.removeItem('IdToken')
      localStorage.removeItem('AccessToken')
      localStorage.removeItem('RefreshToken')
      location.href='/'
    } else if (error.response.status === 401) {
      console.log(error.response)
      localStorage.removeItem('userInfo')
      localStorage.removeItem('IdToken')
      localStorage.removeItem('AccessToken')
      localStorage.removeItem('RefreshToken')
      location.href='/'
    } else {
      return Promise.reject(error)
    }
  }
)

export {instance, baseURL, publishableKey}
