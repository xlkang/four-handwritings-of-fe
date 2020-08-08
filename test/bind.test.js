import { expect } from 'chai'
import '../bind'

describe('test bind.js', () => {
    describeBind('myBindES5')
    describeBind('myBindES6')
})

function describeBind (fnName) {
    // 测试数据
    const ASSIGN_CONTEXT_NAME = '我是obj的name'

    let context = {
        name: ASSIGN_CONTEXT_NAME
    }
    function testContext() {
        return this
    }

    function testArgs() {
        return Array.prototype.slice.call(arguments, 0)
    }
    
    const bindedNone = testContext[fnName]()
    const bindedNull = testContext[fnName](null)
    const bindedUndefied = testContext[fnName](undefined)
    const bindedContext = testContext[fnName](context)
    const bindedTestArgs = testArgs[fnName](null, 1111, 2222)
    const checkToBindArgs = [1111, 2222]

    describe(`test ${fnName}函数`, ()=> {
        it(`Function响应${fnName}`, ()=> {
            expect(Function).to.respondTo(fnName)
        })
        it('非正常调用抛出ReferenceError', ()=> {
            expect(Function.prototype[fnName]).to.throw(ReferenceError)
        })
        it('返回函数', ()=> {
            expect(bindedNone).to.be.an.instanceof(Function)
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
}