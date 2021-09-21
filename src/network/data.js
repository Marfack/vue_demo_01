import {request} from './request'
import axios from 'axios'
import Qs from 'qs'

const url = [
    '/spot_info/',
    '/spot_location/',
    '/spot_score/',
    '/spot_word_frequency/',
    '/spot_topic/',
    '/spot_cmt/',
    '/spot_avg_score/',
    '/spot_avg_sentiment/',
    '/spot_baidu_tag_sentiment/',
    '/spot_baidu_tag_wordcloud/'
]

// const homeUrl = [
//     '/spot_info/',
//     '/spot_location/'
// ]

// const userEvaUrl = [
//     '/spot_score/',
//     '/spot_word_frequency/',
//     '/spot_topic/',
//     '/spot_cmt/'
// ]

// const compEvaUrl = [
//     '/spot_avg_score/',
//     '/spot_avg_sentiment/'
// ]

// const heatUrl = [
//     // '/spot_search_index/',
//     // '/spot_monthly_index/',
//     '/spot_baidu_tag_sentiment/',
//     '/spot_baidu_tag_wordcloud/'
// ]

export function getDataById(id/*, viewIndex*/) {
    let requestList = []
    // let list = []
    // switch (viewIndex) {
    //     case 0:
    //         list = homeUrl
    //         break
    //     case 1:
    //         list = userEvaUrl
    //         break
    //     case 2:
    //         list = compEvaUrl
    //         break
    //     case 3:
    //         list = heatUrl
    //         break
    //     default:
    //         break
    // }
    let data = {
        secretId: 'WUT',
        secretKey: 'wbyTUak7LiSsw77iXyLj8O18e5gcRrDo',
        spot_id: id
    }
    data = Qs.stringify(data)
    for (let item of url) {
        requestList.push(request({
            url: '/api/v1' + item,
            method: 'post',
            data
        }))
    }
    return axios.all(requestList)
}
