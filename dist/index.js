"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: hzq
 * @Date: 2018-08-28 15:55:55
 * @Last Modified by: hzq
 * @Last Modified time: 2019-08-02 14:16:30
 * @文件说明: 全局$api插件
 */
var service_js_1 = require("./service.js");
exports.default = {
    install: function (Vue, RC, config) {
        if (config === void 0) { config = { baseURL: '' }; }
        if (config.baseURL) {
            var api_1 = {};
            var service_1 = service_js_1.default(config);
            RC.keys().forEach(function (fileName) {
                var split = fileName.split(/\//g);
                // 如果长度大于1，则表明访问接口是需要前缀的，则自动获取到前缀并地址中加上
                var prefix = split.length > 2 ? '/' + split[1] : '';
                RC(fileName).default.forEach(function (u) {
                    var methods = u.methods || 'post';
                    api_1[u.name] = function (data, headers) {
                        if (headers === void 0) { headers = {}; }
                        var params = data || {};
                        if (methods === 'get')
                            params = { params: params };
                        return service_1[methods](prefix + u.url, params, {
                            headers: headers
                        });
                    };
                });
            });
            Vue.$api = api_1;
            Vue.prototype.$api = api_1;
        }
        else
            console.error('baseURL为必传参数');
    }
};
