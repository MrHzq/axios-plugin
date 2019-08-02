"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: hzq
 * @Date: 2018-08-28 16:05:27
 * @Last Modified by: hzq
 * @Last Modified time: 2019-08-02 14:43:53
 * @文件说明: 请求配置
 */
var axios_1 = require("axios");
exports.default = (function (axiosConfig) {
    // 接口地址
    var baseURL = axiosConfig.baseURL;
    // 创建实例时设置配置的默认值
    var _createConfig = {
        baseURL: baseURL,
        timeout: 15000,
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    };
    if (typeof axiosConfig.createConfig === 'object') {
        var createConfig = axiosConfig.createConfig;
        if (typeof createConfig.headers === 'object') {
            _createConfig.headers = Object.assign({}, _createConfig.headers, createConfig.headers);
        }
        _createConfig = Object.assign({}, _createConfig, createConfig);
    }
    var Service = axios_1.default.create(_createConfig);
    // 添加请求拦截器
    Service.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        if (typeof axiosConfig.beforeRequest === 'function') {
            return axiosConfig.beforeRequest(config);
        }
        else
            return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
    // 添加响应拦截器
    Service.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        if (typeof axiosConfig.respSuccess === 'function') {
            axiosConfig.respSuccess(response);
        }
        return response.data;
    }, function (error) {
        // 对响应错误做点什么
        if (error) {
            if (typeof axiosConfig.respError === 'function') {
                axiosConfig.respError(error);
            }
            return Promise.reject(error.response);
        }
    });
    return Service;
});
