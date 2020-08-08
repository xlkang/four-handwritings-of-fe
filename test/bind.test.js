import { expect, assert } from 'chai'
import '../bind'

// 测试数据
const GLOBAL_NAME = '我是全局的name'
const ASSIGN_CONTEXT_NAME = '我是obj的name'
let name = GLOBAL_NAME

let context = {
    name: ASSIGN_CONTEXT_NAME
}
function testContext() {
    return this
}

function testArgs() {
    let args = Array.prototype.slice.call(arguments, 0)
    return args
}

const bindedNone = testContext.myBindES5()
const bindedNull = testContext.myBindES5(null)
const bindedUndefied = testContext.myBindES5(undefined)
const bindedContext = testContext.myBindES5(context)
const bindedTestArgs = testArgs.myBindES5(context, 1111, 2222)
const checkToBindArgs = [1111, 2222]

describe('test bind.js',()=> {
  describe('test mybindES5函数', ()=> {
    it('Function响应myBindES5', ()=> {
        expect(Function).to.respondTo('myBindES5')
    })
    it('非正常调用抛出ReferenceError', ()=> {
        expect(Function.prototype.myBindES5).to.throw(ReferenceError)
    })
    it('返回函数', ()=> {
        let fn = function () {}
        expect(fn.myBindES5()).to.be.an.instanceof(Function)
    })
    it('无参数 this指向undefined', ()=> {
        expect(bindedNone()).to.be.undefined
    })
    it('参数undefined this指向undefined', ()=> {
        expect(bindedUndefied()).to.be.undefined
    })
    it('参数null this指向null', ()=> {
        expect(bindedNull()).to.be.null
    })
    it('参数指定context this指向context', ()=> {
        expect(bindedContext()).to.equal(context)
    })
    it('返回函数参数为binded函数参数加上bind预置参数', ()=> {
        const expectArgs = [111].concat(checkToBindArgs)
        expect(bindedTestArgs(111)).to.deep.equal(expectArgs)
    })
  })
})