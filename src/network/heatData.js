import {request} from './request'
import axios from 'axios'
import Qs from 'qs'

const heatUrl = [
    '/spot_search_index/',
    '/spot_monthly_index/',
    '/spot_baidu_tag_sentiment/',
    '/spot_baidu_tag_wordcloud/'
]

export function getDataById(id) {
    let requestList = []
    let data = {
        secretId: 'WUT',
        secretKey: 'wbyTUak7LiSsw77iXyLj8O18e5gcRrDo',
        spot_id: id
    }
    data = Qs.stringify(data)
    for (let item of heatUrl) {
        requestList.push(request({
            url: '/api/v1' + item,
            method: 'post',
            data
        }))
    }
    return axios.all(requestList)
}