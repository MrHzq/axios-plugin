'use strict'
const expect = require('chai').expect
const service = require('../dist/service.js')

describe('service', () => {
    it('结果：为对象', () => {
        const r = service.default({ baseURL: 'www.baidu.con' })
        expect(r).to.be.a('function')
    })
})
