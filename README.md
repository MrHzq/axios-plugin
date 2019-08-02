# axios-plugin(https://github.com/MrHzq/axios-plugin)

[![Build Status](https://travis-ci.org/MrHzq/axios-plugin.svg?branch=master)](https://travis-ci.org/MrHzq/axios-plugin) [![Coverage Status](https://coveralls.io/repos/github/MrHzq/axios-plugin/badge.svg?branch=master)](https://coveralls.io/github/MrHzq/axios-plugin?branch=master)

## 对 axios 请求的二次封装，封装成 Vue 插件 this.\$api

[GitHub 源码](https://github.com/MrHzq/axios-plugin)

[npm 包](https://www.npmjs.com/package/axios-plugin)

### 在 Vue 中使用

1. 请确保已安装`axios`，否则安装

```sh
npm i axios -S
```

2. 安装 `axios-plugin`

```sh
npm i axios-plugin -S
```

3. `main.js`引入和使用

```javascript
import AxiosPlugin from 'axios-plugin'

Vue.use(AxiosPlugin, Url, config)
```

### 参数说明

#### 关于 Url 文件的目录说明

1. 请先在`src`根目录下创建一个文件夹，用于放置所有接口地址数据。以我为例：在`src`下创建一个`axiosUrl`文件夹，创建完为 `src/axiosUrl`
1. 再根据个人习惯分为：`接口文件分类放置`和`接口文件不分类放置`<br>
   a、接口文件分类放置时：即以每一个功能新建 js 文件<br>
   （1）【有前缀】：当你的接口形式为：**域名+前缀+具体地址** 如：**http://api.myapi.com/web/user/login**，其中域名为 **http://api.myapi.com**、前缀为 **/web**、具体地址为：**/user/login**。
   则在 axiosUrl 文件夹下以【前缀】来新建文件夹，上例中就新建【web】文件夹，建完为 /axiosUrl/web；然后在 /axiosUrl/web 内依据【具体地址】的第一个名称新建.js 文件，上例就新建 user.js，建完为 /axiosUrl/web/user.js，然后在 user.js 写接口数据<br>
   （2）【无前缀】：当你的接口形式为：域名+具体地址 如：**http://api.myapi.com/user/login**，其中域名为**http://api.myapi.com**、具体地址为：**/user/login**。就直接以【具体地址】的第一个名称新建.js 文件，上例就新建 user.js，建完为/axiosUrl/user.js，然后在 user.js 写接口数据<br>
   b、接口文件不分类<br>
   （1）和上述(1)相似，区别为：在/axiosUrl/web 内直接新建 index.js 就行了，建完为/axiosUrl/web/index.js，然后在 index.js 写接口数据<br>
   （2）和上述(2)相似，区别为：在/axiosUrl 内直接新建 index.js 就行了，建完为/axiosUrl/index.js，然后在 index.js 写接口数据

#### Url：接口地址 [JSON 格式]

```javascript
export default [
    {
        name: 'login',
        url: '/analyst/login',
        methods: 'get'
    },
    ...
]
```

name：方法名称（`请保持唯一性`），这样写，就在`.vue`里面这样使用：`this.$api.login()`<br>
url：请求地址，请根据 swagger 上面的来，不再需要加前缀了，如'/sib/'，因为自动处理了<br>
methods：请求方式，没有该属性时，默认为 post

#### config：axios 自定义配置 Object

```javascript
{
    baseURL: '',// 服务器接口地址：必传
    createConfig: {},// axios.create()方法参数：可选、默认({
        baseURL,
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    })
    beforeRequest(config) {
        // 请求拦截器：可选、无默认；使用了话，必须要在末尾加上：return config
        return config
    },
    respSuccess(resp) {},// 响应成功拦截器：可选、无默认
    respError(error) {},// 响应失败拦截器：可选、无默认
}
```

### 实例

`src/axiosUrl/index.js`

```javascript
export default [
    {
        name: 'login',
        url: '/analyst/login',
        methods: 'get'
    }
]
```

`main.js`

```javascript
Vue.use(hzqAxios, require.context('src/axiosUrl', true, /\.js$/), {
    baseURL: 'https://www.xxx.com'
})
```

然后就可以在`.vue`中

```javascript
this.$api.login().then(
    res => {
        if (res.code === 1) {
        }
    },
    err => {
        console.log(err)
    }
)
```
