import {request} from './request'
import axios from 'axios'
import Qs from 'qs'

const userEvaUrl = [
    '/spot_topic/',
    '/spot_cmt/'
]

export function getDataById(id) {
    let requestList = []
    let data = {
        secretId: 'WUT',
        secretKey: 'wbyTUak7LiSsw77iXyLj8O18e5gcRrDo',
        spot_id: id
    }
    data = Qs.stringify(data)
    for (let item of userEvaUrl) {
        requestList.push(request({
            url: '/api/v1' + item,
            method: 'post',
            data
        }))
    }
    return axios.all(requestList)
}