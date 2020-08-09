import { expect } from 'chai'
import '../bind'

describe('test bind.js', () => {
    testBind('myBindES5')
    testBind('myBindES6')
    testBind('myBindES6SupprotNew', true)
})

function testBind (fnName, supportNew) {
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

        if(supportNew) {
            function testNewContext() {
                this.a = 1
                return this
            }
            const bindedNewContext = testNewContext[fnName](context)
            const o = new bindedNewContext()
            
            it('bind后的函数经过new调用时, this指向新的实例', ()=> {
                expect(o).to.have.ownProperty('a')
            })

            it('bind后的函数经过new调用后创建的实例, 原型指向bind前的函数的原型对象', ()=> {
                expect(o).to.be.an.instanceof(testNewContext);
            })
        }
    })
}