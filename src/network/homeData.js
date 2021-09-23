import {request} from './request'
import axios from 'axios'
import Qs from 'qs'

const homeUrl = [
    '/spot_info/',
    '/spot_location/'
]

export function getDataById(id) {
    let requestList = []
    let data = {
        secretId: 'WUT',
        secretKey: 'wbyTUak7LiSsw77iXyLj8O18e5gcRrDo',
        spot_id: id
    }
    data = Qs.stringify(data)
    for (let item of homeUrl) {
        requestList.push(request({
            url: '/api/v1' + item,
            method: 'post',
            data
        }))
    }
    return axios.all(requestList)
}