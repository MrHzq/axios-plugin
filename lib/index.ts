/*
 * @Author: hzq
 * @Date: 2018-08-28 15:55:55
 * @Last Modified by: hzq
 * @Last Modified time: 2019-08-02 14:16:30
 * @文件说明: 全局$api插件
 */
import Service from './service.js'

export default {
    install(Vue: any, RC: any, config = { baseURL: '' }) {
        if (config.baseURL) {
            let api: any = {}
            const service: any = Service(config)
            RC.keys().forEach((fileName: any) => {
                const split = fileName.split(/\//g)
                // 如果长度大于1，则表明访问接口是需要前缀的，则自动获取到前缀并地址中加上
                let prefix = split.length > 2 ? '/' + split[1] : ''
                RC(fileName).default.forEach((u: any) => {
                    let methods = u.methods || 'post'
                    api[u.name] = (data: any, headers: any = {}) => {
                        let params = data || {}
                        if (methods === 'get') params = { params }
                        return service[methods](prefix + u.url, params, {
                            headers
                        })
                    }
                })
            })
            Vue.$api = api
            Vue.prototype.$api = api
        } else console.error('baseURL为必传参数')
    }
}
