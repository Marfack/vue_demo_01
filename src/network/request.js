import axios from 'axios'


const INSTANCE = axios.create({
  baseURL: 'https://api.lookvt.com',
  timeout: 20000
})

export function request(config) {
  INSTANCE.interceptors.request.use(config => {
    // TODO
    return config
  })

  INSTANCE.interceptors.response.use(res => {
    // TODO
    return res
  })
  return INSTANCE(config)
}